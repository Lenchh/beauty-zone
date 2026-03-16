import { useState, type ChangeEvent, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../featchers/hooks';
import { closeModal } from '../../../featchers/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import modalStyle from './modalWindow.module.scss';

export function ModalWindow(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const currentProcedure = useAppSelector((state) => state.modal.procedure);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
  });

  const closeWindow = () => {
    dispatch(closeModal());
    navigate('/procedures');
  };

  const clickToClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
      navigate('/procedures');
    }
  };

  if (!isOpen || !currentProcedure) {
    closeWindow();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={modalStyle.modal} onClick={clickToClose}>
      <div className={`${modalStyle.content} ${modalStyle.scrollStyled}`}>
        <div className={modalStyle.headerForPhoneScreen}>
          <h2 className={modalStyle.title}>{currentProcedure?.title}</h2>
          <button className={modalStyle.close} onClick={closeWindow}>
            &times;
          </button>
        </div>
        <img src={currentProcedure?.imgUrl} alt={currentProcedure?.title} className={modalStyle.picture} />
        <div className={`${modalStyle.info} ${modalStyle.scrollStyled}`}>
          <div className={modalStyle.textContent}>
            <div className={modalStyle.textHeader}>
              <h2 className={modalStyle.title}>{currentProcedure?.title}</h2>
              <button className={modalStyle.close} onClick={closeWindow}>
                &times;
              </button>
            </div>
            <p>
              <span>Опис:</span> {currentProcedure?.description}
            </p>
            <p>
              <span>Тривалість:</span> {currentProcedure?.duration}
            </p>
            <p className="bold-blue">
              <span>Ціна:</span> {currentProcedure?.price} грн
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeWindow();
            }}
            className={modalStyle.orderForm}
          >
            <h2 className={modalStyle.title}>Форма для запису</h2>
            <input
              type="text"
              name="name"
              placeholder="Ваше ім'я"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Номер телефону"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            <button type="submit" className={modalStyle.submitBtn}>
              Підтвердити запис
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
