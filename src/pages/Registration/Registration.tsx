import { useState, type ChangeEvent, type JSX } from 'react';
import { Link } from 'react-router-dom';
import { toastError } from '../../toastr/error/toastr-options-error';
import { toastSuccess } from '../../toastr/success/toastr-options-success';
import { validate } from 'email-validator';
import registerStyle from './registration.module.scss';
import { toastInfo } from '../../toastr/info/toastr-options-info';
import homeIcon from '../../assets/LoginPage/homeIcon.svg';

export function Registration(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('+380');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[а-яА-ЯіІїЇєЄґҐ'’-]*$/.test(e.target.value)) {
      const { name, value } = e.target;
      if (name === 'name') setName(value);
      if (name === 'surname') setSurname(value);
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9+]*$/.test(e.target.value)) {
      const newValue = e.target.value;
      if (newValue.length < 4 || !newValue.startsWith('+380')) {
        setPhone('+380');
        return;
      }
      setPhone(newValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitted(true);
    if (name.length < 2 || surname.length < 3) {
      toastError('Перевірте коректність введених імені або прізвища.', 'Некоректні дані');
    }
    if (phone.length < 13) {
      toastError('Перевірте коректність введеного номеру.', 'Некоректні дані');
    }
    if (!validate(email)) {
      toastError('Перевірте коректність введеної електронної пошти.', 'Некоректні дані');
      return;
    }
    if (password.length < 6) {
      toastInfo('Пароль повинен містити щонайменше 6 символів.', 'Некоректні дані');
      return;
    }
    toastSuccess('Користувача успішно зареєстровано.', 'Успішна реєстрація');
  };
  return (
    <div className={registerStyle.container}>
      <Link to={'/'} className={registerStyle.goHome}>
        <img src={homeIcon} alt="home icon" />
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Реєстрація</h2>
        <div className={registerStyle.info}>
          <label htmlFor="text">Ім'я</label>
          <input
            type="text"
            name="name"
            placeholder="Введіть ваше ім'я"
            value={name}
            onChange={handleNameChange}
            style={isSubmitted && name.length < 2 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={registerStyle.info}>
          <label htmlFor="text">Прізвище</label>
          <input
            type="text"
            name="surname"
            placeholder="Введіть ваше прізвище"
            value={surname}
            onChange={handleNameChange}
            style={isSubmitted && surname.length < 3 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={registerStyle.info}>
          <label htmlFor="tel">Номер телефону</label>
          <input
            type="tel"
            name="phone"
            placeholder="+380 XX XXX XX XX"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={13}
            style={isSubmitted && phone.length < 13 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={registerStyle.info}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Введіть електронну пошту"
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
            style={isSubmitted && !validate(email) ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={registerStyle.info}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            placeholder="Мін. довжина пароля: 6 символів"
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
            style={
              (password || isSubmitted) && password.length < 6 ? { borderColor: 'red' } : { borderColor: '#2b7fff' }
            }
          />
        </div>
        <button type="submit">Зареєструватися</button>
        <p>
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </form>
    </div>
  );
}
