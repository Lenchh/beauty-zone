import type { JSX } from 'react';
import { useAppDispatch } from '../../../featchers/hooks';
import type { IProcedure } from '../../../data/procedures';
import procedureStyle from '../../AboutPage/Components/CardSpecialist/cardSpecialist.module.scss';
import buttonStyle from '../procedures.module.scss';
import { openModal } from '../../../featchers/slices/modalSlice';
import { Link } from 'react-router-dom';

interface props {
  procedure: IProcedure;
}

export function ProcedureBlock({ procedure }: props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(openModal(procedure));
  return (
    <div className={procedureStyle.container}>
      <img src={procedure.imgUrl} alt={procedure.title} className={procedureStyle.avatar} />
      <div className={`${procedureStyle.info} ${procedureStyle.scrollStyled}`}>
        <p>{procedure.title}</p>
        <p className={procedureStyle.experience}>{procedure.duration}</p>
        <p className="bold-blue">{`${procedure.price} грн`}</p>
        <Link
          to={`/procedures/procedure/${procedure.id}`}
          key={procedure.id}
          className={buttonStyle.moreDetails}
          onClick={handleClick}
        >
          {/* <button className={buttonStyle.moreDetails} onClick={handleClick}> */}
          Детальніше
          {/* </button> */}
        </Link>
      </div>
    </div>
  );
}
