import type { JSX } from 'react';
import mapPicture from '../../../../assets/HomePage/contacts/map.webp';
import { ContactCard } from '../../../../common/components/ContactCard/ContactCard';
import contactsStyle from './contacts.module.scss';

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
          <ContactCard />
        </div>
      </div>
    </section>
  );
}
