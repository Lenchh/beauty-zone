import type { JSX } from 'react';
import footerStyle from './footer.module.scss';
import phoneIcon from '../../../../assets/footer/telephone.svg';
import facebookIcon from '../../../../assets/footer/facebook.svg';
import instagramIcon from '../../../../assets/footer/instagram.svg';
import pictureFooter from '../../../../assets/footer/footer.webp';

export function Footer(): JSX.Element {
  return (
    <footer className={footerStyle.footer}>
      <div className={footerStyle.container}>
        <h2 className="bold-blue">
          Beauty
          <br />
          Zone
        </h2>
        <ul className={`${footerStyle.block} ${footerStyle.rightSide}`}>
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
        <div className={footerStyle.block}>
          <ul className={footerStyle.blockContacts}>
            <li>
              <a href="tel:+380960000007">+ 38 (096) 000 00 07</a>
            </li>
            <li>
              <a href="mailto:beautyzone@gmail.com">beautyzone@gmail.com</a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Україна, м. Київ, вул. Тараса Шевченка 5"
                target="_blank"
              >
                Україна, м. Київ,
                <br />
                вул. Тараса Шевченка 5
              </a>
            </li>
          </ul>
          <ul className={footerStyle.blockSocialMedia}>
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
        <div className={`${footerStyle.block} ${footerStyle.rightSide}`}>
          <p className={footerStyle.privacyPolicy}>Політика конфіденційності</p>
          <p className={footerStyle.protectedData}>© 2022 Дані захищені</p>
        </div>
        <p className={footerStyle.protectedDataHidden}>© 2022 Дані захищені</p>
      </div>
      <img src={pictureFooter} alt="photo footer" className={footerStyle.imgFooter} />
    </footer>
  );
}
