import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ProceduresPage } from './pages/Procedures/ProceduresPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ScrollToTop } from './common/components/ScrollToTop/ScrollToTop';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProceduresPage />} />
        <Route path="/procedures/procedure/:procedureId" element={<ProceduresPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <ScrollToTop />
    </HashRouter>
  );
}

export default App;
