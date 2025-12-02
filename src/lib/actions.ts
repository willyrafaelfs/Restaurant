'use server';

import { revalidatePath } from 'next/cache';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, Timestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { Reservation, ReservationFormData } from './types';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string().optional(),
  userId: z.string({ required_error: 'User ID is required.' }),
  userName: z.string().optional(),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string({ required_error: 'Please select a time.' }),
  pax: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }),
  specialRequest: z.string().optional(),
});

const CreateReservation = FormSchema.omit({ id: true });
const UpdateReservation = FormSchema;

export async function createReservation(userId: string, userName: string | null | undefined, formData: ReservationFormData) {
  const validatedFields = CreateReservation.safeParse({
    userId,
    userName: userName ?? 'Guest',
    ...formData,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Reservation.',
    };
  }
  
  const { date, ...rest } = validatedFields.data;

  try {
    await addDoc(collection(db, 'reservations'), {
      ...rest,
      date: Timestamp.fromDate(date),
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Create Reservation.' };
  }

  revalidatePath('/dashboard');
  return { message: 'Reservation created successfully.' };
}

export async function updateReservation(id: string, userId: string, formData: ReservationFormData) {
    const validatedFields = UpdateReservation.safeParse({
        id,
        userId,
        ...formData
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Reservation.',
        };
    }
    
    const { date, ...rest } = validatedFields.data;

    try {
        const reservationRef = doc(db, 'reservations', id);
        await updateDoc(reservationRef, {
            ...rest,
            date: Timestamp.fromDate(date),
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Reservation.' };
    }

    revalidatePath('/dashboard');
    return { message: 'Reservation updated successfully.' };
}

export async function deleteReservation(id: string) {
  try {
    await deleteDoc(doc(db, 'reservations', id));
    revalidatePath('/dashboard');
    return { message: 'Reservation cancelled.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Cancel Reservation.' };
  }
}

export async function getReservations(userId: string): Promise<Reservation[]> {
  const reservationsCol = collection(db, 'reservations');
  const q = query(reservationsCol, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const reservations = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: (data.date as Timestamp).toDate(),
    } as Reservation;
  });
  
  // Sort reservations by date in descending order
  reservations.sort((a, b) => (b.date as Date).getTime() - (a.date as Date).getTime());

  return reservations;
}
