import { useState, type JSX } from 'react';
import headerStyle from './header.module.scss';
import phoneIcon from '../../../../assets/header/telephone.svg';
import facebookIcon from '../../../../assets/header/facebook.svg';
import instagramIcon from '../../../../assets/header/instagram.svg';
import menuIcon from '../../../../assets/header/menu.svg';
import { ModalWindowHead } from './ModalWindowHead/ModalWindowHead';

export function Header(): JSX.Element {
  const [modalWindow, openModalWindow] = useState(false);

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
            <li className="bold-blue">Про нас</li>
            <li>
              <a href="#services">Чому ми</a>
            </li>
            <li>
              <a href="#procedures">Наші процедури</a>
            </li>
            <li>
              <a href="#contacts">Контакти</a>
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
