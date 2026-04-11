import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ProceduresPage } from './pages/Procedures/ProceduresPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { UserProfile } from './pages/UserProfile/UserProfile';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProceduresPage />} />
        <Route path="/procedures/procedure/:procedureId" element={<ProceduresPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
