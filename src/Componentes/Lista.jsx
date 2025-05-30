import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexto/contexto';
import '../App.css';

function Lista() {
  const { criptos, ordenAscendente, setOrdenAscendente } = useContext(AppContext);
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const alternarOrden = () => {
    setOrdenAscendente(prev => !prev);
  };

  const esFavorito = (id) => favoritos.some(fav => fav.id === id);

  const alternarFavorito = (cripto) => {
    if (esFavorito(cripto.id)) {
      setFavoritos(favoritos.filter(fav => fav.id !== cripto.id));
    } else {
      setFavoritos([...favoritos, cripto]);
    }
  };

  return (
    <div className="lista">
      <h2>Criptomonedas</h2>
      <button onClick={alternarOrden}>
        Ordenar por valor: {ordenAscendente ? 'Ascendente ↑' : 'Descendente ↓'}
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {criptos.map((cripto) => (
          <li key={cripto.id} className="card">
            <img src={cripto.image} alt={cripto.name} />
            <span>{cripto.name}</span>
            <span>${cripto.current_price.toLocaleString()}</span>
            <button
              onClick={() => alternarFavorito(cripto)}
              style={{
                marginLeft: 'auto',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              title={esFavorito(cripto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {esFavorito(cripto.id) ? '⭐️' : '⭐'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
