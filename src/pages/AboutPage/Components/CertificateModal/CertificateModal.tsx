import type { JSX } from 'react';
import modalStyle from './modalAward.module.scss';

interface props {
  certificate: string;
  setSelectedAward: React.Dispatch<React.SetStateAction<string | null>>;
}

export function CertificateModal({ certificate, setSelectedAward }: props): JSX.Element {
  function clickToClose(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) setSelectedAward(null);
  }
  return (
    <div className={modalStyle.modal} onClick={clickToClose}>
      <div className={modalStyle.wrap}>
        <button type="button" className={modalStyle.close} onClick={() => setSelectedAward(null)}>
          &times;
        </button>
        <img src={certificate} alt="award" className={modalStyle.container} />
      </div>
    </div>
  );
}
