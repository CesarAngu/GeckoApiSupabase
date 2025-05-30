import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import { supabase } from './supabase';
import Administrador from './Componentes/Administrador';


import Lista from './Componentes/Lista';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Usuario from './Componentes/Usuario';
import Menu from './Componentes/Menu';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }

    verificarSesion();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>
          <Route path="/" element={usuario ? <Lista /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/usuario" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/admin" element={usuario ? <Administrador /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
