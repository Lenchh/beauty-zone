import type { JSX } from 'react';
import modalWindowStyle from './cancelBooking.module.scss';
import { toastError } from '../../../toastr/error/toastr-options-error';
import { toastSuccess } from '../../../toastr/success/toastr-options-success';
import type { IBooking } from '../../../common/interfaces/IBooking';
import instance from '../../../api/request';

interface props {
  openModalWindow: React.Dispatch<React.SetStateAction<IBooking | null>>;
  infoBooking: IBooking | null;
  handleBookingCancelled: (id: string) => void;
}

export function CancelBookingWindow({ openModalWindow, infoBooking, handleBookingCancelled }: props): JSX.Element {
  function clickToClose(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) openModalWindow(null);
  }

  const handleCancelBooking = async () => {
    try {
      const updateData = {
        id: infoBooking?.id,
        status: 'cancelled',
      };
      await instance.patch('/api/bookings', updateData);
      toastSuccess('', 'Запис успішно скасовано!');
      handleBookingCancelled(infoBooking!.id);
      openModalWindow(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(`${error}`, 'Помилка скасування:');
    }
  };

  return (
    <div className={modalWindowStyle.modalWindow} onClick={clickToClose}>
      <div className={modalWindowStyle.modalContent}>
        <div className={modalWindowStyle.header}>
          <p>Ви впевнені, що хочете скасувати та видалити запис?</p>
          <button type="button" className={modalWindowStyle.close} onClick={() => openModalWindow(null)}>
            &times;
          </button>
        </div>
        <button className={modalWindowStyle.cancelButton} onClick={handleCancelBooking}>
          Скасувати запис
        </button>
      </div>
    </div>
  );
}
