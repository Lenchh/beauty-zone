import type { JSX } from 'react';
import type { IProcedure } from '../../../data/procedures';
import procedureStyle from '../../AboutPage/Components/CardSpecialist/cardSpecialist.module.scss';
import buttonStyle from '../procedures.module.scss';

interface props {
  procedure: IProcedure;
}

export function ProcedureBlock({ procedure }: props): JSX.Element {
  return (
    <div className={procedureStyle.container}>
      <img src={procedure.imgUrl} alt={procedure.title} className={procedureStyle.avatar} />
      <div className={`${procedureStyle.info} ${procedureStyle.scrollStyled}`}>
        <p>{procedure.title}</p>
        <p className={procedureStyle.experience}>{procedure.duration}</p>
        <p className="bold-blue">{`${procedure.price} грн`}</p>
        <button className={buttonStyle.moreDetails}>Детальніше</button>
      </div>
    </div>
  );
}
