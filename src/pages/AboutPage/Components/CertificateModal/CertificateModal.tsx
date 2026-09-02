import type { JSX } from 'react';
import modalStyle from './modalAward.module.scss';
import type { ICertificate } from '../../../../common/interfaces/ICertificate';

interface props {
  certificate: ICertificate;
  setSelectedAward: React.Dispatch<React.SetStateAction<ICertificate | null>>;
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
        <img src={certificate.imgUrl} alt={certificate.altText} className={modalStyle.container} />
      </div>
    </div>
  );
}
