import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import Lista from './Componentes/Lista';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Lista />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
