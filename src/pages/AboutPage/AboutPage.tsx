import type { JSX } from 'react';
import { Header } from '../Home/components/Header/Header';
import aboutStyle from './about.module.scss';
import gameIcon from '../../assets/services/game-icons.svg';
import serviceIcon from '../../assets/services/services.svg';
import crownIcon from '../../assets/services/crown-icons.svg';
import shieldIcon from '../../assets/services/shieldIcon.svg';
import personIcon from '../../assets/services/personIcon.svg';
import spaIcon from '../../assets/services/spaIcon.svg';
import { CardService } from '../Home/components/Services/Components/CardService';

export function AboutPage(): JSX.Element {
  const cardsServices = [
    {
      id: 1,
      description: 'Використовуємо тільки професійне обладнання та косметику, перевірену часом',
      iconCard: serviceIcon,
    },
    {
      id: 2,
      description: 'Наша мета - підкреслити переваги та приховати недоліки, а не переробити',
      iconCard: crownIcon,
    },
    {
      id: 3,
      description: 'Всі наші косметологи мають вищу медичну освіту та стаж роботи від 5 років',
      iconCard: gameIcon,
    },
    {
      id: 4,
      description:
        'Застосовуємо лише одноразові витратні матеріали та проводимо дезінфекцію інструментів після кожного клієнта.',
      iconCard: shieldIcon,
    },
    {
      id: 5,
      description:
        'Ми створили атмосферу повного спокою та затишку, щоб ви могли відновити не лише красу, а й внутрішній баланс.',
      iconCard: spaIcon,
    },
    {
      id: 6,
      description:
        'Наші фахівці розробляють персональний план догляду, спираючись на аналіз вашої шкіри та ваші особисті побажання.',
      iconCard: personIcon,
    },
  ];
  return (
    <div className={aboutStyle.aboutPage}>
      <Header />
      <div className={aboutStyle.container}>
        <h2>Наші переваги</h2>
        <div className={aboutStyle.benefitsBlocks}>
          {cardsServices.map((card) => (
            <CardService key={card.id} description={card.description} iconCard={card.iconCard} />
          ))}
        </div>
      </div>
    </div>
  );
}
