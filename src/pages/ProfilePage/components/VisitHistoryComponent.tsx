import { useEffect, useState, type JSX } from 'react';
import profileStyle from '../profile.module.scss';
import { supabase } from '../../../api/supabase';
import { toastError } from '../../../toastr/error/toastr-options-error';
import { CancelBookingWindow } from './CancelBookingWindow';

export interface IBooking {
  id: string;
  date: string;
  time: string;
  procedure: string;
  status: string;
}

export function VisitHistoryComponent(): JSX.Element {
  const [bookingsHistory, setBookingsHistory] = useState<IBooking[]>();
  const [modalWindow, openModalWindow] = useState<IBooking | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBookingsHistory = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`id, date, time, procedures (title), status`)
        .eq('client_id', userId);
      if (error) {
        toastError('Помилка завантаження історіі записів', `${error.message}`);
        console.log(error.message);
      } else if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedBookings = data.map((item: any) => {
          if (item.status === 'cancelled') {
            return {
              id: item.id,
              date: item.date,
              time: item.time,
              procedure: item.procedures?.title,
              status: item.status,
            };
          }
          const now = new Date();
          const bookingDate = new Date(`${item.date}T${item.time}`);
          return {
            id: item.id,
            date: item.date,
            time: item.time,
            procedure: item.procedures?.title,
            status: bookingDate <= now ? 'past' : 'upcoming',
          };
        });
        setBookingsHistory(formattedBookings);
      }
    };
    fetchBookingsHistory();
  }, []);

  const futureBookings = bookingsHistory?.filter((b) => b.status === 'upcoming') || [];
  const previousBookings = bookingsHistory?.filter((b) => b.status === 'past' || b.status === 'cancelled') || [];

  const handleBookingCancelled = (cancelledBookingId: string) => {
    setBookingsHistory((prevBookings) => {
      if (!prevBookings) return undefined;
      return prevBookings.map((booking) =>
        booking.id === cancelledBookingId ? { ...booking, status: 'cancelled' } : booking
      );
    });
  };
  return (
    <div className={profileStyle.historyBookingsTable}>
      <div className={profileStyle.futureBookings}>
        <h3>Майбутні записи</h3>
        {futureBookings.length > 0 ? (
          futureBookings.map((booking) => (
            <div key={booking.id} className={profileStyle.bookingCard}>
              <p>
                {booking.date}, {booking.time.substring(0, 5)} - {booking.procedure}
              </p>
              <button onClick={() => openModalWindow(booking)}>Скасувати</button>
            </div>
          ))
        ) : (
          <div className={profileStyle.bookingCard}>
            <p>Тут будуть майбутні записи</p>
          </div>
        )}
      </div>
      <div className={profileStyle.previousBookings}>
        <h3>Минулі записи</h3>
        {previousBookings.length > 0 ? (
          previousBookings.map((booking) => (
            <div key={booking.id} className={profileStyle.bookingCard}>
              <p>
                {booking.date}, {booking.time.substring(0, 5)} - {booking.procedure} -{' '}
                {booking.status === 'cancelled' && 'СКАСОВАНО'}
              </p>
            </div>
          ))
        ) : (
          <div className={profileStyle.bookingCard}>
            <p>Тут будуть минулі записи</p>
          </div>
        )}
      </div>
      {modalWindow && (
        <CancelBookingWindow
          infoBooking={modalWindow}
          openModalWindow={openModalWindow}
          handleBookingCancelled={handleBookingCancelled}
        />
      )}
    </div>
  );
}
