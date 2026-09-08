import { useState, type ChangeEvent, type JSX } from 'react';
import profileStyle from '../profile.module.scss';
import type { IUser } from '../../../common/interfaces/IUser';
import nProgress from 'nprogress';
import { supabase } from '../../../api/supabase';
import { toastError } from '../../../toastr/error/toastr-options-error';
import { toastSuccess } from '../../../toastr/success/toastr-options-success';
import { toastInfo } from '../../../toastr/info/toastr-options-info';
import { validate } from 'email-validator';

interface props {
  userInfo: IUser;
  oldUserInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  setOldUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

export function EditInfoForm({ userInfo, oldUserInfo, setUserInfo, setOldUserInfo }: props): JSX.Element {
  const { name, surname, phone, email } = userInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsLoading(true);
    nProgress.start();
    const currentValue = userInfo[fieldName];
    if (fieldName === 'email') {
      const { error } = await supabase.auth.updateUser({ email: currentValue });
      if (error) {
        toastError(`Повідомлення про помилку: ${error.message}`, 'Помилка при збереженні даних');
      } else {
        toastSuccess('Дані збережено.', 'Дані успішно змінені.');
      }
      setIsLoading(false);
      nProgress.done();
      setOldUserInfo((prev) => ({ ...prev, [fieldName]: currentValue }));
      return;
    }
    const { error } = await supabase
      .from('clients')
      .update({ [fieldName]: currentValue })
      .eq('id', userInfo.id);
    if (error) {
      toastError(`Повідомлення про помилку: ${error.message}`, 'Помилка при збереженні даних');
    } else {
      toastSuccess('Дані збережено.', 'Дані успішно змінені.');
    }
    setIsLoading(false);
    nProgress.done();
    setOldUserInfo((prev) => ({ ...prev, [fieldName]: currentValue }));
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
          {isLoading && activeInput === 'name' ? 'Збереження...' : 'Збереження...'}
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
      {/* <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Мін. довжина пароля: 6 символів"
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        <img src={showPassword ? visibilityOffIcon : visibilityIcon} alt="toggle password visibility" />
      </button> */}
    </div>
  );
}
