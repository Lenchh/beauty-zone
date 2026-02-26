import type { JSX } from 'react';
import modalWindowStyle from './modalWindowIntro.module.scss';
import formStyle from '../../Contacts/contacts.module.scss';

interface props {
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalWindowIntro({ openModalWindow }: props): JSX.Element {
  function clickToClose(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) openModalWindow(false);
  }

  return (
    <div className={modalWindowStyle.modalWindow} onClick={clickToClose}>
      <form action="" className={`${modalWindowStyle.modalContent} ${formStyle.scrollStyled}`}>
        <button type="button" className={modalWindowStyle.close} onClick={() => openModalWindow(false)}>
          &times;
        </button>
        <h2 className={modalWindowStyle.modalHead}>Замовити дзвінок</h2>
        <p className={formStyle.label}>
          Запишіться <span className="bold-blue">безкоштовно</span>
          <br />
          та отримайте подарунок
        </p>
        <input type="text" id="firstName" name="firstName" placeholder="Ваше ім'я та прізвище" />
        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Ваш номер телефону" />
        <input type="text" id="email" name="email" placeholder="Ваша електронна пошта" />
        <button type="button" className={formStyle.buttonSubmit}>
          Записатись безкоштовно
        </button>
        <p className={formStyle.agreement}>
          Натискаючи на кнопку я погоджуюсь
          <br />
          <a href="/privacy-policy">з політикою конфіденційності</a>
        </p>
      </form>
    </div>
  );
}
