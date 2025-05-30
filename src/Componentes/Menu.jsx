import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#121212',
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      borderBottom: '1px solid #2c2c2c'
    }}>
      <Link to="/" style={{ color: '#00bcd4', fontWeight: 'bold' }}>Inicio</Link>
      <Link to="/usuario" style={{ color: '#00bcd4', fontWeight: 'bold' }}>Perfil</Link>
    </nav>
  );
}

export default Menu;
