import { useEffect, useState, type JSX } from 'react';
import { Link, NavLink } from 'react-router-dom';
import headerStyle from './header.module.scss';
import menuIcon from '../../../assets/HomePage/header/menu.svg';
import { ModalWindowHead } from './ModalWindowHead/ModalWindowHead';
import { supabase } from '../../../api/supabase';

export function Header(): JSX.Element {
  const [modalWindow, openModalWindow] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsUser(!!data.user);
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsUser(!!session);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (modalWindow) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [modalWindow]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${headerStyle.link} ${headerStyle.active}` : headerStyle.link;

  return (
    <>
      <header className={headerStyle.header}>
        <div className={headerStyle.info}>
          <h2>
            <Link to={'/'} className="bold-blue">
              Beauty
              <br />
              Zone
            </Link>
          </h2>
          <ul className={headerStyle.listInfo}>
            <li>
              {' '}
              <NavLink to={'/'} className={getLinkClass}>
                Про нас
              </NavLink>
            </li>
            <li>
              <NavLink to={'/aboutUs'} className={getLinkClass}>
                Чому ми
              </NavLink>
            </li>
            <li>
              <NavLink to={'/procedures'} className={getLinkClass}>
                Наші процедури
              </NavLink>
            </li>
          </ul>
          {isUser ? (
            <Link to={'/profile'} className={headerStyle.buttonToLogin}>
              Профіль
            </Link>
          ) : (
            <Link to={'/login'} className={headerStyle.buttonToLogin}>
              Вхід
            </Link>
          )}
          <button className={headerStyle.menu} onClick={() => openModalWindow(true)}>
            <img src={menuIcon} alt="menu" />
          </button>
        </div>
      </header>
      {modalWindow && <ModalWindowHead openModalWindow={openModalWindow} />}
    </>
  );
}
