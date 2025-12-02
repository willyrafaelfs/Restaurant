import type { Timestamp } from 'firebase/firestore';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
}

export interface Reservation {
  id: string;
  userId: string;
  date: Date | Timestamp;
  time: string;
  pax: number;
  specialRequest?: string;
  userName?: string;
}

export type ReservationFormData = Omit<Reservation, 'id' | 'userId' | 'userName' | 'date'> & {
  date: Date;
};
