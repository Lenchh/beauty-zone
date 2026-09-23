import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ProceduresPage } from './pages/Procedures/ProceduresPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ScrollToTop } from './common/components/ScrollToTop/ScrollToTop';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { supabase } from './api/supabase';
import { logOutUser, setUser } from './featchers/slices/authSlice';
import type { User } from '@supabase/supabase-js';
import { PrivateRoutes } from './common/components/PrivateRoutes/PrivateRoutes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetUser = async (user: User) => {
      if (!user) {
        return;
      }
      const { data, error } = await supabase.from('clients').select('name,surname,phone').eq('id', user.id).single();
      if (data && !error) {
        dispatch(
          setUser({
            id: user.id,
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: user.email!,
          })
        );
      }
    };
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) fetchAndSetUser(user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        fetchAndSetUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        dispatch(logOutUser());
        localStorage.removeItem('userId');
      }
    });
    return () => {
      subscription.unsubscribe();
    };
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
      </Routes>
      <ScrollToTop />
    </HashRouter>
  );
}

export default App;
