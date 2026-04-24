import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import GovCalculator from './pages/GovCalculator';
import FreelanceCalculator from './pages/FreelanceCalculator';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Background decoration */}
        <div className="bg-gradient" />
        <div className="bg-grid" />

        {/* Shared Navigation */}
        <NavBar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<GovCalculator />} />
          <Route path="/freelance" element={<FreelanceCalculator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
