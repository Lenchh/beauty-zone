import type { JSX } from 'react';
import windowHeadStyle from './modalWindowHead.module.scss';
import headerStyle from '../header.module.scss';
import phoneIcon from '../../../../../assets/header/telephone.svg';
import facebookIcon from '../../../../../assets/header/facebook.svg';
import instagramIcon from '../../../../../assets/header/instagram.svg';

interface props {
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalWindowHead({ openModalWindow }: props): JSX.Element {
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
              <a href="">Про нас</a>
            </li>
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
