import type { JSX } from 'react';
import servicesStyle from './serviceCard.module.scss';

interface props {
  description: string;
  iconCard: string;
}

export function CardService({ description, iconCard }: props): JSX.Element {
  return (
    <div className={servicesStyle.element}>
      <img src={iconCard} alt="service card icon" />
      <p>{description}</p>
    </div>
  );
}
