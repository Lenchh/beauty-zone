import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import windowHeadStyle from './modalWindowHead.module.scss';
import headerStyle from '../header.module.scss';
import phoneIcon from '../../../../../assets/HomePage/header/telephone.svg';
import facebookIcon from '../../../../../assets/HomePage/header/facebook.svg';
import instagramIcon from '../../../../../assets/HomePage/header/instagram.svg';

interface props {
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalWindowHead({ openModalWindow }: props): JSX.Element {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${headerStyle.link} ${headerStyle.active}` : headerStyle.link;

  return (
    <div className={windowHeadStyle.modal}>
      <div className={windowHeadStyle.content}>
        <div className={headerStyle.info}>
          <h2 className="bold-blue">
            Beauty
            <br />
            Zone
          </h2>
          <button className={windowHeadStyle.close} onClick={() => openModalWindow(false)}>
            &times;
          </button>
        </div>
        <div className={windowHeadStyle.element}>
          <ul className={windowHeadStyle.listInfo}>
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
          <ul className={windowHeadStyle.listSocialMedia}>
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
        </div>
      </div>
    </div>
  );
}
