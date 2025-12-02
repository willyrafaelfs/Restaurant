'use server';

import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import DashboardClient from './dashboard-client';
import type { Reservation } from '@/lib/types';

async function getReservations(userId: string): Promise<Reservation[]> {
  const reservationsCol = collection(db, 'reservations');
  const q = query(reservationsCol, where('userId', '==', userId), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  const reservations = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: (data.date as Timestamp).toDate(),
    } as Reservation;
  });
  return reservations;
}

export default async function DashboardPage() {
  // In a real app, you'd get the user from server-side auth.
  // For this demo, we'll fetch on the client side to handle auth state easily.
  // The server-side part shows how you *would* fetch data if the user were available.

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">
        My Reservations
      </h1>
      <p className="text-muted-foreground mb-8">
        View and manage your upcoming and past bookings.
      </p>
      <DashboardClient getReservations={getReservations} />
    </div>
  );
}
