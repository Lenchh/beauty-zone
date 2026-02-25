import type { JSX } from 'react';
import introStyle from './intro.module.scss';

export function Intro(): JSX.Element {
  return (
    <section className={introStyle.intro}>
      <div className={introStyle.info}>
        <p className={introStyle.text}>Косметологічна клініка</p>
        <h1 className={introStyle.head}>Beauty Zone</h1>
        <button>Замовити дзвінок</button>
        <p className={introStyle.labelForButton}>
          Запишись та отримай безкоштовну
          <br />
          консультацію нашого косметолога
        </p>
      </div>
      <div className={introStyle.waveContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
