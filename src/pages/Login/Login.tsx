import { useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toastError } from '../../toastr/error/toastr-options-error';
import { validate } from 'email-validator';
import { toastInfo } from '../../toastr/info/toastr-options-info';
import { toastSuccess } from '../../toastr/success/toastr-options-success';
import loginStyle from '../Registration/registration.module.scss';
import homeIcon from '../../assets/LoginPage/homeIcon.svg';
import nProgress from 'nprogress';
import { supabase } from '../../api/supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../featchers/slices/authSlice';

export function Login(): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!validate(email)) {
      toastError('Перевірте коректність введеної електронної пошти.', 'Некоректні дані');
      return;
    }
    if (!password) {
      toastInfo('Введіть коректний пароль.', 'Некоректні дані');
      return;
    }
    nProgress.start();
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error?.message === 'Invalid login credentials') {
        toastError('Неправильний логін або пароль.', 'Помилка авторизації');
      } else {
        toastError(`Помилка: ${error.message}`, 'Помилка авторизації');
      }
    } else {
      const { data, error } = await supabase
        .from('clients')
        .select('name,surname,phone')
        .eq('id', user.user.id)
        .single();
      if (error) {
        toastError(`Повідомлення про помилку: ${error.message}`, 'Помилка завантаження даних');
      } else if (data) {
        dispatch(
          setUser({
            id: user.user.id,
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email,
          })
        );
        localStorage.setItem('userId', user.user.id);
        toastSuccess('Вітаємо!', 'Успішна авторизація');
      }
      navigate('/');
    }
    nProgress.done();
  };
  return (
    <div className={loginStyle.container}>
      <Link to={'/'} className={loginStyle.goHome}>
        <img src={homeIcon} alt="home icon" />
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Авторизація</h2>
        <div className={loginStyle.info}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Введіть електронну пошту"
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
            style={isSubmitted && !validate(email) ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <div className={loginStyle.info}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
            style={!password && isSubmitted ? { borderColor: 'red' } : { borderColor: '#2b7fff' }}
          />
        </div>
        <button type="submit">Увійти</button>
        <p>
          Ще немає акаунту? <Link to="/registration">Зареєструватися</Link>
        </p>
      </form>
    </div>
  );
}
