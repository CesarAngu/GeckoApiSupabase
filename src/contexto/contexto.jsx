import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [criptos, setCriptos] = useState([]);
  const [favoritas, setFavoritas] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

const criptosOrdenadas = [...criptos].sort((a, b) => {
  return ordenAscendente
    ? a.current_price - b.current_price
    : b.current_price - a.current_price;
});

  useEffect(() => {
    const fetchCriptos = async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await res.json();
      setCriptos(data);
    };
    fetchCriptos();
  }, []);

  return (
    <AppContext.Provider value={{
  criptos: criptosOrdenadas,
  favoritas,
  setFavoritas,
  ordenAscendente,
  setOrdenAscendente
}}>
      {children}
    </AppContext.Provider>
  );
}