'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BookingForm } from './booking-form';
import type { Reservation } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface BookingDialogProps {
  children?: React.ReactNode;
  reservation?: Reservation;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BookingDialog({ children, reservation, open: controlledOpen, onOpenChange: setControlledOpen }: BookingDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { user } = useAuth();
  
  const open = controlledOpen ?? internalOpen;
  const setOpen = setControlledOpen ?? setInternalOpen;
  
  const handleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const GoogleIcon = () => (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
      <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.438 36.338 48 30.692 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            {reservation ? 'Update Your Reservation' : 'Book a Table'}
          </DialogTitle>
          <DialogDescription>
            {user ? 'Please fill in the details for your table.' : 'Please log in to continue.'}
          </DialogDescription>
        </DialogHeader>
        {user ? (
            <BookingForm reservation={reservation} onSuccess={() => setOpen(false)} />
        ) : (
            <div className="flex flex-col items-center justify-center pt-8 pb-4">
                <p className="mb-4 text-center">You need to be signed in to manage your reservations.</p>
                <Button onClick={handleSignIn}>
                    <GoogleIcon />
                    Sign In with Google
                </Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
