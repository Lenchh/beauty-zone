import { useEffect, useState, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import headerStyle from './header.module.scss';
import phoneIcon from '../../../assets/HomePage/header/telephone.svg';
import facebookIcon from '../../../assets/HomePage/header/facebook.svg';
import instagramIcon from '../../../assets/HomePage/header/instagram.svg';
import menuIcon from '../../../assets/HomePage/header/menu.svg';
import { ModalWindowHead } from './ModalWindowHead/ModalWindowHead';

export function Header(): JSX.Element {
  const [modalWindow, openModalWindow] = useState(false);

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
          <h2 className="bold-blue">
            Beauty
            <br />
            Zone
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
          <ul className={headerStyle.listContacts}>
            <li>
              <a href="tel:+380960000007">
                <img src={phoneIcon} alt="telephone" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <img src={facebookIcon} alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank">
                <img src={instagramIcon} alt="instagram" />
              </a>
            </li>
          </ul>
          <button className={headerStyle.menu} onClick={() => openModalWindow(true)}>
            <img src={menuIcon} alt="menu" />
          </button>
        </div>
      </header>
      {modalWindow && <ModalWindowHead openModalWindow={openModalWindow} />}
    </>
  );
}
