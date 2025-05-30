import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accesoPermitido, setAccesoPermitido] = useState(false);
  const navigate = useNavigate();

  // Verificar si el usuario es admin
  useEffect(() => {
    const verificarAcceso = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from("usuario")
        .select("roll")
        .eq("id", user.id)
        .single();

      if (error || !data || data.roll !== "admin") {
        navigate('/');
        return;
      }

      setAccesoPermitido(true);
    };

    verificarAcceso();
  }, [navigate]);

  // Obtener datos de usuarios y fotos
  useEffect(() => {
    if (!accesoPermitido) return;

    const obtenerDatos = async () => {
      const { data: usuariosData } = await supabase
        .from("usuario")
        .select("id, nombre, correo, telefono");

      const { data: fotosData } = await supabase
        .from("multimedia")
        .select("id, url, usuarioid");

      const usuariosConFotos = usuariosData.map((usuario) => ({
        ...usuario,
        fotos: fotosData.filter((foto) => foto.usuarioid === usuario.id),
      }));

      setUsuarios(usuariosConFotos);
      setFotos(fotosData);
      setLoading(false);
    };

    obtenerDatos();
  }, [accesoPermitido]);

  const editarUsuario = async (id, nuevoNombre, nuevoCorreo, nuevoTelefono) => {
    const { error } = await supabase
      .from("usuario")
      .update({
        nombre: nuevoNombre,
        correo: nuevoCorreo,
        telefono: nuevoTelefono,
      })
      .eq("id", id);

    if (!error) {
      setUsuarios((prev) =>
        prev.map((usuario) =>
          usuario.id === id
            ? { ...usuario, nombre: nuevoNombre, correo: nuevoCorreo, telefono: nuevoTelefono }
            : usuario
        )
      );
    }
  };

  const eliminarImagen = async (imagenId) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", imagenId);

    if (!error) {
      setFotos((prevFotos) => prevFotos.filter((foto) => foto.id !== imagenId));
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) => ({
          ...usuario,
          fotos: usuario.fotos.filter((foto) => foto.id !== imagenId),
        }))
      );
    }
  };

  const handleChange = (e, usuarioId, campo) => {
    const newValue = e.target.value;
    setUsuarios((prev) =>
      prev.map((usuario) =>
        usuario.id === usuarioId ? { ...usuario, [campo]: newValue } : usuario
      )
    );
  };

  if (!accesoPermitido) return null;
  if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Administrador – Gestión de Usuarios</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #555' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fotos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} style={{ borderBottom: '1px solid #333' }}>
              <td>{usuario.id}</td>
              <td>
                <input
                  type="text"
                  value={usuario.nombre}
                  onChange={(e) => handleChange(e, usuario.id, "nombre")}
                />
              </td>
              <td>{usuario.correo}</td>
              <td>
                <input
                  type="text"
                  value={usuario.telefono}
                  onChange={(e) => handleChange(e, usuario.id, "telefono")}
                />
              </td>
              <td>
                {usuario.fotos.map((foto) => (
                  <div key={foto.id} style={{ marginBottom: '0.5rem' }}>
                    <img src={foto.url} alt="Foto" width="80" />
                    <button onClick={() => eliminarImagen(foto.id)}>🗑</button>
                  </div>
                ))}
              </td>
              <td>
                <button
                  onClick={() =>
                    editarUsuario(
                      usuario.id,
                      usuario.nombre,
                      usuario.correo,
                      usuario.telefono
                    )
                  }
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Administrador;