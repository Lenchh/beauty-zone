import type { JSX } from 'react';
import { Header } from '../Home/components/Header/Header';
import proceduresStyle from './procedures.module.scss';
import { procedures } from '../../data/procedures';
import { ProcedureBlock } from './components/ProcedureBlock';
import { Footer } from '../Home/components/Footer/Footer';

export function ProceduresPage(): JSX.Element {
  const allCategories = [
    'Масаж',
    'Косметологія',
    "Ін'єкційна косметологія",
    "Б'юті-послуги",
    'Нігтьовий сервіс',
    'Волосся',
    'Маски для обличчя',
  ];

  return (
    <div className={proceduresStyle.proceduresPage}>
      <Header />
      <div className={proceduresStyle.container}>
        <h2>Наші процедури</h2>
        <div className={proceduresStyle.services}>
          <div className={proceduresStyle.filters}>
            <h2>Фільтр</h2>
            {allCategories.map((category, index) => (
              <div key={index}>
                <input type="checkbox" name={category} id={category} className={proceduresStyle.customCheckbox} />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
          <div className={proceduresStyle.procedures}>
            {procedures.map((procedure) => (
              <ProcedureBlock procedure={procedure} key={procedure.id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
