import { useEffect, useRef, useState, type JSX } from 'react';
import { Header } from '../Home/components/Header/Header';
import aboutStyle from './about.module.scss';
import gameIcon from '../../assets/HomePage/services/game-icons.svg';
import serviceIcon from '../../assets/HomePage/services/services.svg';
import crownIcon from '../../assets/HomePage/services/crown-icons.svg';
import shieldIcon from '../../assets/HomePage/services/shieldIcon.svg';
import personIcon from '../../assets/HomePage/services/personIcon.svg';
import spaIcon from '../../assets/HomePage/services/spaIcon.svg';
import goldCertificate from '../../assets/AboutPage/awards/Black and Gold Certificate .webp';
import blueCertificate from '../../assets/AboutPage/awards/Blue Certificate.webp';
import whiteCertificate from '../../assets/AboutPage/awards/Certificate.webp';
import goldDiploma from '../../assets/AboutPage/awards/White and Gold Diploma.webp';
import whiteDiploma from '../../assets/AboutPage/awards/Diploma.webp';
import { CardService } from '../Home/components/Services/Components/CardService';
import { CertificateModal } from './Components/CertificateModal/CertificateModal';
import { specialists } from '../../data/specialists';
import { CardSpecialist } from './Components/CardSpecialist/CardSpecialist';
import { Footer } from '../Home/components/Footer/Footer';

export function AboutPage(): JSX.Element {
  const [selectedAward, setSelectedAward] = useState<string | null>(null);

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

  const scrollPosition = useRef(0);

  useEffect(() => {
    if (selectedAward) {
      scrollPosition.current = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [selectedAward]);

  const awards = [goldCertificate, blueCertificate, whiteCertificate, goldDiploma, whiteDiploma];
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
        <h2>Гарантія якості та безпеки</h2>
        <div className={`${aboutStyle.awardsBlocks} ${aboutStyle.scrollStyled}`}>
          {awards.map((award, index) => (
            <img
              src={award}
              alt="award"
              className={aboutStyle.award}
              key={index}
              onClick={() => setSelectedAward(award)}
            />
          ))}
        </div>
        <h2>
          Наші <span className="bold-blue">спеціалісти</span>
          <div className={aboutStyle.benefitsBlocks}>
            {specialists.map((specialist) => (
              <CardSpecialist specialist={specialist} key={specialist.id} />
            ))}
          </div>
        </h2>
      </div>
      <Footer />
      {selectedAward && <CertificateModal certificate={selectedAward} setSelectedAward={setSelectedAward} />}
    </div>
  );
}
