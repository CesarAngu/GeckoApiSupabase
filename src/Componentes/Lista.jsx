import { useContext } from 'react';
import { AppContext } from '../contexto/contexto';
import '../App.css'; // Importa los estilos

function Lista() {
  const { criptos, ordenAscendente, setOrdenAscendente } = useContext(AppContext);

  const alternarOrden = () => {
    setOrdenAscendente(prev => !prev);
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
