import { useEffect, useState } from 'react';
import '../App.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  const quitarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter(cripto => cripto.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  if (favoritos.length === 0) {
    return (
      <div className="lista">
        <h2>Mis Favoritos</h2>
        <p>No has agregado criptomonedas a favoritos todavía.</p>
      </div>
    );
  }

  return (
    <div className="lista">
      <h2>Mis Favoritos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {favoritos.map((cripto) => (
          <li key={cripto.id} className="card">
            <img src={cripto.image} alt={cripto.name} />
            <span>{cripto.name}</span>
            <span>${cripto.current_price.toLocaleString()}</span>
            <button
              onClick={() => quitarFavorito(cripto.id)}
              style={{
                marginLeft: 'auto',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              title="Quitar de favoritos"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
