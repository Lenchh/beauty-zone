import { useState, type ChangeEvent, type JSX } from 'react';
import profileStyle from '../profile.module.scss';
import type { IUser } from '../../../common/interfaces/IUser';
import { toastError } from '../../../toastr/error/toastr-options-error';
import { toastSuccess } from '../../../toastr/success/toastr-options-success';
import { toastInfo } from '../../../toastr/info/toastr-options-info';
import { validate } from 'email-validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutUser, setUser } from '../../../featchers/slices/authSlice';
import instance from '../../../api/request';

interface props {
  userInfo: IUser;
  oldUserInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

export function EditInfoForm({ userInfo, oldUserInfo, setUserInfo }: props): JSX.Element {
  const dispatch = useDispatch();
  const { name, surname, phone, email } = userInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[а-яА-ЯіІїЇєЄґҐ'’-]*$/.test(e.target.value)) {
      const { name, value } = e.target;
      if (name === 'name') setUserInfo((prev) => ({ ...prev, name: value }));
      if (name === 'surname') setUserInfo((prev) => ({ ...prev, surname: value }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9+]*$/.test(e.target.value)) {
      const newValue = e.target.value;
      if (newValue.length < 4 || !newValue.startsWith('+380')) {
        setUserInfo((prev) => ({ ...prev, phone: '+380' }));
        return;
      }
      setUserInfo((prev) => ({ ...prev, phone: newValue }));
    }
  };

  const handleSubmit = async (fieldName: keyof IUser) => {
    setActiveInput(fieldName);
    setIsSubmitted(true);
    if (userInfo[fieldName] === oldUserInfo[fieldName]) {
      return;
    }
    if (!userInfo[fieldName]) {
      setUserInfo((prev) => ({ ...prev, [fieldName]: oldUserInfo[fieldName] }));
      return;
    }
    if (
      (fieldName === 'phone' && phone.length < 13) ||
      (fieldName === 'name' && name.length < 2) ||
      (fieldName === 'surname' && surname.length < 3) ||
      (fieldName === 'email' && !validate(email))
    ) {
      toastInfo('Введіть коректні дані.', 'Некоректні дані');
      return;
    }
    try {
      setIsLoading(true);
      const currentValue = userInfo[fieldName];
      const updateData = {
        [fieldName]: currentValue,
      };
      await instance.patch('/api/users/profile', updateData);
      dispatch(setUser({ ...oldUserInfo, [fieldName]: currentValue }));
      toastSuccess('Дані збережено.', 'Дані успішно змінені.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(`Повідомлення про помилку: ${error}`, 'Помилка при збереженні даних');
    }
    setIsLoading(false);
  };

  const handleLogOut = async () => {
    dispatch(logOutUser());
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className={profileStyle.editInfoContainer}>
      <h3>Особиста інформація</h3>
      <div className={profileStyle.inputContainer}>
        <input
          type="text"
          name="name"
          placeholder="Iм'я"
          value={name}
          onChange={handleNameChange}
          style={isSubmitted && name.length < 2 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
        />
        <button type="button" onClick={() => handleSubmit('name')} disabled={isLoading}>
          {isLoading && activeInput === 'name' ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
      <div className={profileStyle.inputContainer}>
        <input
          type="text"
          name="surname"
          placeholder="Прізвище"
          value={surname}
          onChange={handleNameChange}
          style={isSubmitted && surname.length < 3 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
        />
        <button type="button" onClick={() => handleSubmit('surname')} disabled={isLoading}>
          {isLoading && activeInput === 'surname' ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
      <div className={profileStyle.inputContainer}>
        <input
          type="tel"
          name="phone"
          placeholder="+380 XX XXX XX XX"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={13}
          style={isSubmitted && phone.length < 13 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
        />
        <button type="button" onClick={() => handleSubmit('phone')} disabled={isLoading}>
          {isLoading && activeInput === 'phone' ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
      <div className={profileStyle.inputContainer}>
        <input
          type="text"
          placeholder="Електронна пошта"
          value={email}
          onChange={(e): void => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
          style={isSubmitted && !validate(email) ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
        />
        <button type="button" onClick={() => handleSubmit('email')} disabled={isLoading}>
          {isLoading && activeInput === 'email' ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
      <button className={profileStyle.buttonLogOut} onClick={handleLogOut}>
        Вихід
      </button>
    </div>
  );
}
