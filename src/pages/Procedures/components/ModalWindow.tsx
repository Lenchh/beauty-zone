import { useState, type ChangeEvent, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../featchers/hooks';
import { closeModal } from '../../../featchers/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import modalStyle from './modalWindow.module.scss';
import { toastrSuccess } from '../../../toastr/success/toastr-options-success';
import { toastrInfo } from '../../../toastr/info/toastr-options-info';

export function ModalWindow(): JSX.Element {
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };
  const minAvailableDate = getMinDate();
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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[а-яА-ЯіІїЇєЄґҐ'-]*$/.test(e.target.value)) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9+]*$/.test(e.target.value)) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = e.target.value;
    if (selectedDateString < minAvailableDate) {
      toastrInfo('Ця дата недоступна.', 'Будь ласка, оберіть дату в майбутньому.');
      setFormData({ ...formData, date: '' });
      return;
    }
    const dateObject = new Date(selectedDateString);
    const dayOfWeek = dateObject.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      toastrInfo('Вибачте, салон Beauty Zone не працює у вихідні дні.', 'Будь ласка, оберіть будній день.');
      setFormData({ ...formData, date: '' });
    } else {
      setFormData({ ...formData, date: selectedDateString });
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    if (selectedTime < '09:00' || selectedTime > '18:30') {
      toastrInfo('Салон Beauty Zone працює з 09:00 до 19:00.', 'Будь ласка, оберіть робочий час.');
      setFormData({ ...formData, time: '' });
    } else {
      setFormData({ ...formData, time: selectedTime });
    }
  };

  return (
    <div className={modalStyle.modal} onClick={clickToClose}>
      <div className={`${modalStyle.content} ${modalStyle.scrollStyled}`}>
        <button className={modalStyle.close} onClick={closeWindow}>
          &times;
        </button>
        <img src={currentProcedure?.imgUrl} alt={currentProcedure?.title} className={modalStyle.picture} />
        <div className={`${modalStyle.info} ${modalStyle.scrollStyled}`}>
          <div className={modalStyle.textContent}>
            <div className={modalStyle.textHeader}>
              <h2 className={modalStyle.title}>{currentProcedure?.title}</h2>
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
              if (!formData.name || !formData.phone || !formData.date || !formData.time) {
                toastrInfo('Будь ласка, заповніть всі поля!', 'Всі поля мають бути заповнені.');
                return;
              } else {
                const orderData = {
                  procedureId: currentProcedure?.id,
                  procedureName: currentProcedure?.title,
                  customer: formData,
                };
                console.log('Новий запис: ', orderData);
                toastrSuccess(`Дякуємо, ${formData.name}!`, 'Ваша заявка успішно прийнята.');
                closeWindow();
              }
            }}
            className={modalStyle.orderForm}
          >
            <h2 className={modalStyle.title}>Форма для запису</h2>
            <input type="text" name="name" placeholder="Ваше ім'я" value={formData.name} onChange={handleNameChange} />
            <input
              type="tel"
              name="phone"
              placeholder="+380XXXXXXXXX"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            <label>
              Дата:
              <input type="date" name="date" min={minAvailableDate} value={formData.date} onChange={handleDateChange} />
            </label>
            <label>
              Час:
              <input
                type="time"
                name="time"
                min="09:00"
                max="18:30"
                value={formData.time}
                onChange={handleTimeChange}
              />
            </label>
            <button type="submit" className={modalStyle.submitBtn}>
              Підтвердити запис
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
