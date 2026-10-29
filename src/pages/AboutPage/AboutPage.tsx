import { useEffect, useRef, useState, type JSX } from 'react';
import { Header } from '../../common/components/Header/Header';
import aboutStyle from './about.module.scss';
import gameIcon from '../../assets/HomePage/services/game-icons.svg';
import serviceIcon from '../../assets/HomePage/services/services.svg';
import crownIcon from '../../assets/HomePage/services/crown-icons.svg';
import shieldIcon from '../../assets/HomePage/services/shieldIcon.svg';
import personIcon from '../../assets/HomePage/services/personIcon.svg';
import spaIcon from '../../assets/HomePage/services/spaIcon.svg';
import { CardService } from '../../common/components/ServiceCard/CardService';
import { CertificateModal } from './Components/CertificateModal/CertificateModal';
import { CardSpecialist } from './Components/CardSpecialist/CardSpecialist';
import { Footer } from '../../common/components/Footer/Footer';
import { toastError } from '../../toastr/error/toastr-options-error';
import type { ISpecialist } from '../../common/interfaces/ISpecialist';
import type { ICertificate } from '../../common/interfaces/ICertificate';
import '../../common/nprogress/nprogress-custom.css';
import { Link, useLocation } from 'react-router-dom';
import { AddSpecialistModal } from './Components/AddSpecialistModal/AddSpecialistModal';
import instance from '../../api/request';
import { useAppSelector } from '../../featchers/hooks';

export function AboutPage(): JSX.Element {
  const [selectedAward, setSelectedAward] = useState<ICertificate | null>(null);
  const [specialists, setSpecialists] = useState<ISpecialist[]>();
  const [certificates, setCertificates] = useState<ICertificate[]>();
  const [modalWindow, openModalWindow] = useState(false);
  const location = useLocation();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specialistsResult, certificatesResult] = await Promise.all([
          instance.get('/api/specialists'),
          instance.get('/api/certificates'),
        ]);
        setSpecialists(specialistsResult.data);
        setCertificates(certificatesResult.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toastError(error, 'Помилка завантаження даних:');
      }
    };
    fetchData();
  }, []);

  const scrollPosition = useRef(0);

  useEffect(() => {
    if (selectedAward || modalWindow) {
      scrollPosition.current = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedAward, modalWindow]);

  useEffect(() => {
    if (location.pathname.includes('/aboutUs/addSpecialists')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      openModalWindow(true);
    }
  }, [location]);

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
          {certificates?.map((certificate, index) => (
            <img
              src={certificate.imgUrl}
              alt={certificate.altText}
              className={aboutStyle.award}
              key={index}
              onClick={() => setSelectedAward(certificate)}
            />
          ))}
        </div>
        <h2>
          Наші <span className="bold-blue">спеціалісти</span>{' '}
        </h2>
        <div className={aboutStyle.benefitsBlocks}>
          {specialists?.map((specialist) => (
            <CardSpecialist specialist={specialist} key={specialist.id} />
          ))}
        </div>
        {userInfo?.role === 'admin' && (
          <Link
            to={'/aboutUs/addSpecialists'}
            className={aboutStyle.addSpecialist}
            onClick={() => openModalWindow(true)}
          >
            Додати спеціаліста
          </Link>
        )}
      </div>
      <Footer />
      {selectedAward && <CertificateModal certificate={selectedAward} setSelectedAward={setSelectedAward} />}
      {modalWindow && <AddSpecialistModal openModalWindow={openModalWindow} modalWindow={modalWindow} />}
    </div>
  );
}
