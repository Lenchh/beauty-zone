import { useEffect, useState, type JSX } from 'react';
import buttonLogOutStyle from '../../common/components/Header/header.module.scss';
import nProgress from 'nprogress';
import { supabase } from '../../api/supabase';
import { toastError } from '../../toastr/error/toastr-options-error';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/Header/Header';
import { Footer } from '../../common/components/Footer/Footer';
import profileStyle from './profile.module.scss';
import { EditInfoForm } from './components/EditInfoForm';
import type { IUser } from '../../common/interfaces/IUser';

export function ProfilePage(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUser>({
    id: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
  });
  const [oldUserInfo, setOldUserInfo] = useState<IUser>({
    id: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      nProgress.start();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('clients').select('name,surname,phone').eq('id', user.id).single();
        if (error) {
          toastError(`Повідомлення про помилку: ${error.message}`, 'Помилка завантаження даних');
        } else if (data) {
          setUserInfo({
            id: user.id,
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: user.email!,
          });
          setOldUserInfo({
            id: user.id,
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: user.email!,
          });
        }
      }
      nProgress.done();
    };
    checkUser();
  }, []);

  const handleLogOut = async () => {
    nProgress.start();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toastError('Помилка при виході з акаунту.', 'Помилка');
    }
    nProgress.done();
    navigate('/');
  };
  return (
    <div className={profileStyle.profilePage}>
      <Header />
      <div className={profileStyle.userInfoContainer}>
        <h2>
          Мій <span className="bold-blue">профіль</span>
        </h2>
        <EditInfoForm
          userInfo={userInfo}
          oldUserInfo={oldUserInfo}
          setUserInfo={setUserInfo}
          setOldUserInfo={setOldUserInfo}
        />
      </div>
      <button className={buttonLogOutStyle.buttonToLogin} onClick={handleLogOut}>
        Вихід
      </button>
      <Footer />
    </div>
  );
}
