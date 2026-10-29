import { useEffect, useState, type JSX } from 'react';
import profileStyle from '../profile.module.scss';
import { toastError } from '../../../toastr/error/toastr-options-error';
import { CancelBookingWindow } from './CancelBookingWindow';
import type { IBooking } from '../../../common/interfaces/IBooking';
import instance from '../../../api/request';
import { useAppSelector } from '../../../featchers/hooks';

export function VisitHistoryComponent(): JSX.Element {
  const [bookingsHistory, setBookingsHistory] = useState<IBooking[]>();
  const [modalWindow, openModalWindow] = useState<IBooking | null>(null);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchBookingsHistory = async () => {
      try {
        const response = await instance.get('/api/bookings');
        setBookingsHistory(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toastError('Помилка завантаження історіі записів', `${error}`);
      }
    };
    fetchBookingsHistory();
  }, []);

  const futureBookings = bookingsHistory?.filter((b) => b.status === 'active') || [];
  const previousBookings = bookingsHistory?.filter((b) => b.status === 'completed' || b.status === 'cancelled') || [];

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
              {userInfo?.role === 'admin' ? (
                <p>
                  {booking.date.substring(0, 10)}, {booking.time.substring(11, 16)} - {booking.procedure.title} -{' '}
                  {booking.user?.name} {booking.user?.surname} {booking.user?.email}
                </p>
              ) : (
                <p>
                  {booking.date.substring(0, 10)}, {booking.time.substring(11, 16)} - {booking.procedure.title}
                </p>
              )}
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
              {userInfo?.role === 'admin' ? (
                <p>
                  {booking.date.substring(0, 10)}, {booking.time.substring(11, 16)} - {booking.procedure.title} -{' '}
                  {booking.user?.name} {booking.user?.surname} {booking.user?.email}
                </p>
              ) : (
                <p>
                  {booking.date.substring(0, 10)}, {booking.time} - {booking.procedure.title} -{' '}
                  {booking.status === 'cancelled' && 'СКАСОВАНО'}
                </p>
              )}
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
