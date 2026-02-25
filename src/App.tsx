import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ServicesPage } from './pages/Services/ServicesPage';
import { AboutPage } from './pages/AboutPage/AboutPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
