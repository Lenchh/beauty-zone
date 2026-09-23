import type { JSX } from 'react';
import profileStyle from '../profile.module.scss';

export interface IBooking {
  id: string;
  date: string;
  time: string;
  service: string;
  specialist: string;
  status: 'upcoming' | 'past';
}

export function VisitHistoryComponent(): JSX.Element {
  const mockBookings: IBooking[] = [
    {
      id: '1',
      date: '15.03.2026',
      time: '14:00',
      service: 'Чистка обличчя',
      specialist: 'Олена Коваль',
      status: 'upcoming',
    },
    {
      id: '2',
      date: '24.03.2026',
      time: '14:00',
      service: 'Чистка обличчя',
      specialist: 'Олена Коваль',
      status: 'upcoming',
    },
    {
      id: '3',
      date: '15.03.2026',
      time: '14:00',
      service: 'Чистка обличчя',
      specialist: 'Олена Коваль',
      status: 'upcoming',
    },
    {
      id: '4',
      date: '01.02.2026',
      time: '10:00',
      service: 'Масаж тіла',
      specialist: 'Олена Коваль',
      status: 'past',
    },
    {
      id: '5',
      date: '01.02.2026',
      time: '10:00',
      service: 'Масаж тіла',
      specialist: 'Олена Коваль',
      status: 'past',
    },
  ];

  const futureBookings = mockBookings.filter((booking) => booking.status === 'upcoming');
  const previousBookings = mockBookings.filter((booking) => booking.status === 'past');
  return (
    <div className={profileStyle.historyBookingsTable}>
      <div className={profileStyle.futureBookings}>
        <h3>Майбутні записи</h3>
        {futureBookings.length > 0 ? (
          futureBookings.map((booking) => (
            <div key={booking.id} className={profileStyle.bookingCard}>
              <p>
                {booking.date}, {booking.time} - {booking.service} <br />- {booking.specialist}
              </p>
              <button>Скасувати</button>
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
                {booking.date}, {booking.time} - {booking.service} <br />- {booking.specialist}
              </p>
            </div>
          ))
        ) : (
          <div className={profileStyle.bookingCard}>
            <p>Тут будуть минулі записи</p>
          </div>
        )}
      </div>
    </div>
  );
}
