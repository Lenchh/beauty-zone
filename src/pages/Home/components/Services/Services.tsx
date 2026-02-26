import type { JSX } from 'react';
import servicesStyle from './services.module.scss';
import buttonStyle from '../Intro/intro.module.scss';
import gamaIcon from '../../../../assets/services/game-icons.svg';
import serviceIcon from '../../../../assets/services/services.svg';
import crownIcon from '../../../../assets/services/crown-icons.svg';
import { Link } from 'react-router-dom';

export function Services(): JSX.Element {
  return (
    <section className={servicesStyle.services} id="services">
      <div className={servicesStyle.container}>
        <h2>
          Чому люди
          <br />
          <span className="bold-blue">обирають нас</span>
        </h2>
        <div className={servicesStyle.blocks}>
          <div className={servicesStyle.element}>
            <img src={gamaIcon} alt="Game icons" />
            <p>Всі наші косметологи мають вищу медичну освіту та стаж роботи від 5 років</p>
          </div>
          <div className={servicesStyle.element}>
            <img src={serviceIcon} alt="Services" />
            <p>Використовуємо тільки професійне обладнання та косметику, перевірену часом</p>
          </div>
          <div className={servicesStyle.element}>
            <img src={crownIcon} alt="Crown" />
            <p>Наша мета - підкреслити переваги та приховати недоліки, а не переробити</p>
          </div>
        </div>
        <Link to={'/aboutUs'} className={buttonStyle.infoButton}>
          Детальніше &rarr;
        </Link>
      </div>
    </section>
  );
}
