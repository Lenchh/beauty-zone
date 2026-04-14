import type { JSX } from 'react';
import modalWindowStyle from './contactCard.module.scss';
import scheduleIcon from '../../../assets/HomePage/intro/schedule.svg';
import calendarIcon from '../../../assets/HomePage/intro/calendar.svg';
import locationIcon from '../../../assets/HomePage/intro/location.svg';
import instagramIcon from '../../../assets/HomePage/intro/instagram.svg';
import facebookIcon from '../../../assets/HomePage/intro/facebook.svg';
import telephoneIcon from '../../../assets/HomePage/intro/telephone.svg';

interface props {
  onClose?: () => void;
}

export function ContactCard({ onClose }: props): JSX.Element {
  const getLinkClass = onClose
    ? `${modalWindowStyle.modalContent} ${modalWindowStyle.scrollStyled}`
    : `${modalWindowStyle.blockContacts} ${modalWindowStyle.scrollStyled}`;
  return (
    <div className={getLinkClass}>
      {onClose && (
        <button type="button" className={modalWindowStyle.close} onClick={onClose}>
          &times;
        </button>
      )}
      <div className={modalWindowStyle.contacts}>
        <div className={modalWindowStyle.block}>
          <img src={scheduleIcon} alt="schedule icon" />
          <p>
            Графік
            <br /> <span>Пн-Пт 9:00-20:00</span>
          </p>
        </div>
        <div className={modalWindowStyle.block}>
          <img src={calendarIcon} alt="calendar icon" />
          <p>
            Вихідні
            <br />
            <span>Сб-Вс</span>
          </p>
        </div>
        <div className={modalWindowStyle.block}>
          <img src={locationIcon} alt="location icon" />
          <p>
            Адреса
            <br />
            <span>вул. Шевченка, 27</span>
          </p>
        </div>
      </div>
      <div className={modalWindowStyle.divider}></div>
      <div className={modalWindowStyle.contacts}>
        <div className={modalWindowStyle.block}>
          <img src={instagramIcon} alt="instagram icon" />
          <a href="https://www.instagram.com/" target="_blank">
            Instagram
          </a>
        </div>
        <div className={modalWindowStyle.block}>
          <img src={facebookIcon} alt="facebook icon" />
          <a href="https://www.facebook.com/" target="_blank">
            Facebook
          </a>
        </div>
        <div className={modalWindowStyle.block}>
          <img src={telephoneIcon} alt="telephone icon" />
          <a href="tel:+380960000007">Telephone</a>
        </div>
      </div>
    </div>
  );
}
