import type { JSX } from 'react';
import proceduresStyle from './procedures.module.scss';
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
            <div className={proceduresStyle.gradient}></div>
          </div>
          <div className={proceduresStyle.block}>
            <img src={procedure3} alt="procedure3" />
            <div className={proceduresStyle.gradient}></div>
          </div>
          <button className={proceduresStyle.arrowButton}></button>
        </div>
      </div>
    </section>
  );
}
