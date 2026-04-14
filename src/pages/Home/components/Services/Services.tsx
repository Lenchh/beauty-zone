import type { JSX } from 'react';
import servicesStyle from './services.module.scss';
import buttonStyle from '../Intro/intro.module.scss';
import gameIcon from '../../../../assets/HomePage/services/game-icons.svg';
import serviceIcon from '../../../../assets/HomePage/services/services.svg';
import crownIcon from '../../../../assets/HomePage/services/crown-icons.svg';
import { Link } from 'react-router-dom';
import { CardService } from '../../../../common/components/ServiceCard/CardService';

export function Services(): JSX.Element {
  const cardsServices = [
    {
      id: 1,
      description: 'Всі наші косметологи мають вищу медичну освіту та стаж роботи від 5 років',
      iconCard: gameIcon,
    },
    {
      id: 2,
      description: 'Використовуємо тільки професійне обладнання та косметику, перевірену часом',
      iconCard: serviceIcon,
    },
    {
      id: 3,
      description: 'Наша мета - підкреслити переваги та приховати недоліки, а не переробити',
      iconCard: crownIcon,
    },
  ];

  return (
    <section className={servicesStyle.services} id="services">
      <div className={servicesStyle.container}>
        <h2>
          Чому люди
          <br />
          <span className="bold-blue">обирають нас</span>
        </h2>
        <div className={servicesStyle.blocks}>
          {cardsServices.map((card) => (
            <CardService key={card.id} description={card.description} iconCard={card.iconCard} />
          ))}
        </div>
        <Link to={'/aboutUs'} className={buttonStyle.infoButton}>
          Детальніше &rarr;
        </Link>
      </div>
    </section>
  );
}
