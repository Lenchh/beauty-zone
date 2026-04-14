import type { JSX } from 'react';
import modalWindowStyle from './modalWindowIntro.module.scss';
import { ContactCard } from '../../../../../common/components/ContactCard/ContactCard';

interface props {
  openModalWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalWindowIntro({ openModalWindow }: props): JSX.Element {
  function clickToClose(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) openModalWindow(false);
  }

  return (
    <div className={modalWindowStyle.modalWindow} onClick={clickToClose}>
      <ContactCard onClose={() => openModalWindow(false)} />
    </div>
  );
}
