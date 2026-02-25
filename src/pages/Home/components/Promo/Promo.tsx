import type { JSX } from 'react';
import promoStyle from './promo.module.scss';
import beforeResultImg from '../../../../assets/promo/beforeResult.webp';
import afterResultImg from '../../../../assets/promo/afterResult.webp';
import starIcon from '../../../../assets/promo/Star1.svg';

export function Promo(): JSX.Element {
  return (
    <section className={promoStyle.promo}>
      <div className={promoStyle.container}>
        <div className={promoStyle.info}>
          <h2>
            Перевтілюйтесь в <span className="bold-blue">Beauty Zone!</span>
          </h2>
          <p>Наша косметологічна клініка пропонує вам професійні послуги з догляду за шкірою обличчя та тіла. </p>
          <p>
            B <span>Beauty Zone</span> ми гарантуємо найвищі стандарти якості та приємний сервіс. Наші косметологічні
            процедури та препарати допоможуть вам підтримувати свою красу та молодість. <br />З нами краса назавжди!
          </p>
        </div>
        <ul className={promoStyle.images}>
          <li>
            <img src={beforeResultImg} alt="before result" className={promoStyle.imageElement} />
          </li>
          <li>
            <img src={starIcon} alt="star image" className={promoStyle.starImage} />
          </li>
          <li>
            <img src={afterResultImg} alt="after result" className={promoStyle.imageElement} />
          </li>
        </ul>
      </div>
    </section>
  );
}
