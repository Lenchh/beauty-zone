import { useEffect, useRef, useState, type JSX } from 'react';
import { Header } from '../../common/components/Header/Header';
import proceduresStyle from './procedures.module.scss';
import { Footer } from '../../common/components/Footer/Footer';
import { ModalWindow } from './components/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../featchers/hooks';
import { Link, useLocation, useParams } from 'react-router-dom';
import { openModal } from '../../featchers/slices/modalSlice';
import { ProcedureBlock } from './components/ProcedureBlock';
import type { IProcedure } from '../../common/interfaces/IProcedure';
import { toastError } from '../../toastr/error/toastr-options-error';
import '../../common/nprogress/nprogress-custom.css';
import { AddProcedureWindow } from './components/AddProcedureWindow';
import instance from '../../api/request';

export function ProceduresPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { procedureId } = useParams();
  const allCategories = [
    'Масаж',
    'Косметологія',
    "Ін'єкційна косметологія",
    "Б'юті-послуги",
    'Нігтьовий сервіс',
    'Волосся',
    'Маски для обличчя',
  ];
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [procedures, setProcedures] = useState<IProcedure[]>();
  const [modalWindow, openModalWindow] = useState(false);
  const location = useLocation();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await instance.get('/api/procedures');
        setProcedures(responce.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toastError(error, 'Помилка завантаження даних:');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/procedures/addProcedures')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      openModalWindow(true);
    }
  }, [location]);

  const handleChange = (category: string) => {
    if (selectedFilters.includes(category)) setSelectedFilters(selectedFilters.filter((item) => item !== category));
    else setSelectedFilters([...selectedFilters, category]);
  };

  const isOpen = useAppSelector((state) => state.modal.isOpen);

  const scrollPosition = useRef(0);

  useEffect(() => {
    if (isOpen || modalWindow) {
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
  }, [isOpen, modalWindow]);

  useEffect(() => {
    if (procedureId) {
      const foundProcedure: IProcedure | undefined = procedures?.find(
        (procedure) => String(procedure.id) === procedureId
      );
      if (foundProcedure) {
        dispatch(openModal(foundProcedure));
      }
    }
  }, [dispatch, procedureId, procedures]);

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
                <input
                  type="checkbox"
                  name={category}
                  id={category}
                  className={proceduresStyle.customCheckbox}
                  checked={selectedFilters.includes(category)}
                  onChange={() => handleChange(category)}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
          <div className={proceduresStyle.procedures}>
            {selectedFilters.length > 0
              ? procedures
                  ?.filter((procedure) => selectedFilters.includes(procedure.category))
                  .map((procedure) => <ProcedureBlock procedure={procedure} key={procedure.id} />)
              : procedures?.map((procedure) => <ProcedureBlock procedure={procedure} key={procedure.id} />)}
          </div>
        </div>
        {userInfo?.role === 'admin' && (
          <Link
            to={'/procedures/addProcedures'}
            className={proceduresStyle.addProcedure}
            onClick={() => openModalWindow(true)}
          >
            Додати процедуру
          </Link>
        )}
      </div>
      <Footer />
      {isOpen && <ModalWindow />}
      {modalWindow && <AddProcedureWindow modalWindow={modalWindow} openModalWindow={openModalWindow} />}
    </div>
  );
}
