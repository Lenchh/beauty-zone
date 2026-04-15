import { useState, type ChangeEvent, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../featchers/hooks';
import { closeModal } from '../../../featchers/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import modalStyle from './modalWindow.module.scss';
import { toastrSuccess } from '../../../toastr/success/toastr-options-success';
import { toastrInfo } from '../../../toastr/info/toastr-options-info';
import scheduleIcon from '../../../assets/ProcedurePage/schedule.svg';
import priceIcon from '../../../assets/ProcedurePage/price.svg';
import userIcon from '../../../assets/ProcedurePage/user.svg';
import telephoneIcon from '../../../assets/ProcedurePage/telephone.svg';
import calendarIcon from '../../../assets/ProcedurePage/calendar.svg';
import { timeSlots } from '../../../data/procedures';

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
    surname: '',
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

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    setFormData({ ...formData, time: selectedTime });
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
            <h2 className={modalStyle.title}>{currentProcedure?.title}</h2>
            <p>{currentProcedure?.description}</p>
            <div className={modalStyle.infoBlocks}>
              <div className={modalStyle.block}>
                <img src={scheduleIcon} alt="schedule" />
                <p>
                  <span>Тривалість:</span>
                  <br />
                  {currentProcedure?.duration}
                </p>
              </div>
              <div className={modalStyle.block}>
                <img src={priceIcon} alt="price" />
                <p className="bold-blue">
                  <span>Ціна:</span>
                  <br />
                  {currentProcedure?.price} грн
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.name || !formData.surname || !formData.phone || !formData.date || !formData.time) {
                toastrInfo('Будь ласка, заповніть всі поля!', 'Всі поля мають бути заповнені.');
                return;
              } else if (formData.phone.length < 9 || formData.name.length === 1 || formData.surname.length === 1) {
                toastrInfo('Всі поля мають бути заповнені правильно.', 'Будь ласка, введіть коректні дані!');
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
            <div className={modalStyle.inputContainer}>
              <img src={userIcon} alt="user icon" />
              <input
                type="text"
                name="name"
                placeholder="Ваше ім'я"
                value={formData.name}
                onChange={handleNameChange}
              />
            </div>
            <div className={modalStyle.inputContainer}>
              <img src={userIcon} alt="user icon" />
              <input
                type="text"
                name="surname"
                placeholder="Ваше прізвище"
                value={formData.surname}
                onChange={handleNameChange}
              />
            </div>
            <div className={modalStyle.inputContainer}>
              <img src={telephoneIcon} alt="telephone icon" />
              <span className={modalStyle.prefix}>+380</span>
              <input
                type="tel"
                name="phone"
                placeholder="XX XXX XX XX"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={9}
              />
            </div>
            <div className={modalStyle.infoBlocks}>
              <label className={modalStyle.inputContainer}>
                <img src={calendarIcon} alt="calendar icon" />
                Дата:
                <input
                  type="date"
                  name="date"
                  min={minAvailableDate}
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </label>
              <label className={modalStyle.inputContainer}>
                <img src={scheduleIcon} alt="schedule icon" />
                Час:
                <select name="time" value={formData.time} onChange={handleTimeChange}>
                  <option value="" disabled>
                    Оберіть час
                  </option>
                  {timeSlots.map((element) => (
                    <option value={element} key={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className={modalStyle.submitBtn}>
              Підтвердити запис
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
