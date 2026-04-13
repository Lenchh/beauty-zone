import type { JSX } from 'react';
import contactsStyle from './contacts.module.scss';
import mapPicture from '../../../../assets/HomePage/contacts/map.webp';
import { ContactCards } from '../../../../components/ContactCards';

export function Contacts(): JSX.Element {
  return (
    <section className={contactsStyle.contacts}>
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
          <ContactCards />
        </div>
      </div>
    </section>
  );
}
