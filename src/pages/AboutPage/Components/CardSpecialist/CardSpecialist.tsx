import type { JSX } from 'react';
import type { ISpecialist } from '../../../../data/specialists';
import specialistStyle from './cardSpecialist.module.scss';

interface props {
  specialist: ISpecialist;
}

export function CardSpecialist({ specialist }: props): JSX.Element {
  return (
    <div className={specialistStyle.container}>
      <img
        src={specialist.imgUrl}
        alt={`${specialist.name} ${specialist.surname}`}
        className={specialistStyle.avatar}
      />
      <div className={`${specialistStyle.info} ${specialistStyle.scrollStyled}`}>
        <p>{`${specialist.name} ${specialist.surname}`}</p>
        <p className="bold-blue">{specialist.specialty}</p>
        <p className={specialistStyle.experience}>{specialist.experience}</p>
        <p className={specialistStyle.description}>{specialist.description}</p>
      </div>
    </div>
  );
}
