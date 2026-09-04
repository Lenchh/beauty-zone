import type { JSX } from 'react';
import buttonLogOutStyle from '../../common/components/Header/header.module.scss';
import nProgress from 'nprogress';
import { supabase } from '../../api/supabase';
import { toastError } from '../../toastr/error/toastr-options-error';
import { useNavigate } from 'react-router-dom';

export function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
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
    <div>
      <button className={buttonLogOutStyle.buttonToLogin} onClick={handleLogOut}>
        Вихід
      </button>
    </div>
  );
}
