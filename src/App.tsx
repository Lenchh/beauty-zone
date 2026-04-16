import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ProceduresPage } from './pages/Procedures/ProceduresPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ScrollToTop } from './common/components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProceduresPage />} />
        <Route path="/procedures/procedure/:procedureId" element={<ProceduresPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
      </Routes>
      <ScrollToTop />
    </HashRouter>
  );
}

export default App;
