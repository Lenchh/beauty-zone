export interface IBooking {
  id: string;
  date: string;
  time: string;
  status: string;
  guestName?: string;
  guestSurname?: string;
  guestPhone?: string;
  procedure: {
    title: string;
    price: number;
    duration: number;
  };
  user?: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: string;
  };
}
