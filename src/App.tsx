import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ProceduresPage } from './pages/Procedures/ProceduresPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ScrollToTop } from './common/components/ScrollToTop/ScrollToTop';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { PrivateRoutes } from './common/components/PrivateRoutes/PrivateRoutes';
import { AdminProtectedRoute } from './common/components/PrivateRoutes/AdminProtectedRoute';
import { useAppDispatch } from './featchers/hooks';
import { useEffect } from 'react';
import instance from './api/request';
import { setUser } from './featchers/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await instance.get('/api/users/profile');
          dispatch(setUser(response.data));
        } catch (error) {
          console.error('Не вдалося відновити сесію', error);
        }
      }
    };

    restoreSession();
  }, [dispatch]);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProceduresPage />} />
        <Route path="/procedures/procedure/:procedureId" element={<ProceduresPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/procedures/addProcedures" element={<ProceduresPage />} />
          <Route path="/aboutUs/addSpecialists" element={<AboutPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </HashRouter>
  );
}

export default App;
