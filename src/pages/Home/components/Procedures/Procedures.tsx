import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import proceduresStyle from './procedures.module.scss';
import buttonStyle from '../Intro/intro.module.scss';
import procedure1 from '../../../../assets/procedures/procedure1.webp';
import procedure2 from '../../../../assets/procedures/procedure2.webp';
import procedure3 from '../../../../assets/procedures/procedure3.webp';

export function Procedures(): JSX.Element {
  return (
    <section className={proceduresStyle.procedures} id="procedures">
      <div className={proceduresStyle.container}>
        <h2>
          Наші <span className="bold-blue">процедури</span>
        </h2>
        <div className={proceduresStyle.gallery}>
          <div className={proceduresStyle.block}>
            <img src={procedure1} alt="procedure1" />
            <p>
              Маски
              <br />
              для обличчя
            </p>
            <div className={proceduresStyle.gradient}></div>
          </div>
          <div className={proceduresStyle.block}>
            <img src={procedure2} alt="procedure2" />
            <p>
              Ін'єкційна <br /> косметологія
            </p>
            <div className={proceduresStyle.gradient}></div>
          </div>
          <div className={proceduresStyle.block}>
            <img src={procedure3} alt="procedure3" />
            <p>
              Чистка <br />
              обличчя
            </p>
            <div className={proceduresStyle.gradient}></div>
          </div>
        </div>
        <Link to={'/procedures'} className={buttonStyle.infoButton}>
          Детальніше &rarr;
        </Link>
      </div>
    </section>
  );
}
