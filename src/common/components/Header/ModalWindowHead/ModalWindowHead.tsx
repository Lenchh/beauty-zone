import type { JSX } from 'react';
import { Link, NavLink } from 'react-router-dom';
import windowHeadStyle from './modalWindowHead.module.scss';
import headerStyle from '../header.module.scss';

interface props {
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalWindowHead({ openModalWindow }: props): JSX.Element {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${headerStyle.link} ${headerStyle.active}` : headerStyle.link;

  return (
    <div className={windowHeadStyle.modal}>
      <div className={windowHeadStyle.content}>
        <div className={headerStyle.info}>
          <h2 className="bold-blue">
            Beauty
            <br />
            Zone
          </h2>
          <button className={windowHeadStyle.close} onClick={() => openModalWindow(false)}>
            &times;
          </button>
        </div>
        <div className={windowHeadStyle.element}>
          <ul className={windowHeadStyle.listInfo}>
            <li>
              {' '}
              <NavLink to={'/'} className={getLinkClass}>
                Про нас
              </NavLink>
            </li>
            <li>
              <NavLink to={'/aboutUs'} className={getLinkClass}>
                Чому ми
              </NavLink>
            </li>
            <li>
              <NavLink to={'/procedures'} className={getLinkClass}>
                Наші процедури
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to={'/login'} className={headerStyle.buttonToLogin}>
          Вхід
        </Link>
      </div>
    </div>
  );
}
