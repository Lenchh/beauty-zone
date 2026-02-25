import type { JSX } from 'react';
import contactsStyle from './contacts.module.scss';
import mapPicture from '../../../../assets/contacts/map.webp';

export function Contacts(): JSX.Element {
  return (
    <section className={contactsStyle.contacts} id="contacts">
      <div className={contactsStyle.container}>
        <h2>
          Як нас <span className="bold-blue">знайти</span>
        </h2>
        <div className={contactsStyle.block}>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Україна, м. Київ, вул. Тараса Шевченка 5"
            target="_blank"
            className={contactsStyle.mapPicture}
          >
            <img src={mapPicture} alt="map" />
          </a>
          <form action="" className={`${contactsStyle.form} ${contactsStyle.scrollStyled}`}>
            <p className={contactsStyle.label}>
              Запишіться <span className="bold-blue">безкоштовно</span>
              <br />
              та отримайте подарунок
            </p>
            <input type="text" id="firstName" name="firstName" placeholder="Ваше ім'я та прізвище" />
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Ваш номер телефону" />
            <input type="text" id="email" name="email" placeholder="Ваша електронна пошта" />
            <button type="button">Записатись безкоштовно</button>
            <p className={contactsStyle.agreement}>
              Натискаючи на кнопку я погоджуюсь
              <br />
              <a href="">з політикою конфіденційності</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
