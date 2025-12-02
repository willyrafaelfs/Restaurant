'use client';

import Link from 'next/link';
import { UserNav } from '@/components/auth/user-nav';
import { UtensilsCrossed } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { BookingDialog } from './booking-dialog';
import { Button } from './ui/button';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">TableMaster</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {user && (
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              My Reservations
            </Link>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <BookingDialog>
             <Button>Book a Table</Button>
          </BookingDialog>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
