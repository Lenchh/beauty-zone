import type { JSX } from 'react';
import modalWindowStyle from './cancelBooking.module.scss';
import type { IBooking } from './VisitHistoryComponent';
import { supabase } from '../../../api/supabase';
import { toastError } from '../../../toastr/error/toastr-options-error';
import { toastSuccess } from '../../../toastr/success/toastr-options-success';

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
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', infoBooking?.id);
    if (error) {
      toastError(`${error.message}`, 'Помилка скасування:');
    } else {
      toastSuccess('', 'Запис успішно скасовано!');
      handleBookingCancelled(infoBooking!.id);
      openModalWindow(null);
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
