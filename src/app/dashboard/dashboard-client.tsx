'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import type { Reservation } from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import AiRecommendations from '@/components/dashboard/ai-recommendations';
import { getMenuRecommendations } from '@/ai/flows/getMenuRecommendations';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardClientProps {
  getReservations: (userId: string) => Promise<Reservation[]>;
}

export default function DashboardClient({ getReservations }: DashboardClientProps) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/');
      return;
    }

    const fetchReservations = async () => {
      setLoading(true);
      const userReservations = await getReservations(user.uid);
      // Create some dummy reservations if none exist
      if (userReservations.length === 0) {
        const dummyReservations: Reservation[] = [
          { id: 'dummy1', userId: user.uid, userName: user.displayName || 'User', date: new Date(Date.now() + 86400000 * 7), time: '19:00', pax: 2, specialRequest: 'Window seat' },
          { id: 'dummy2', userId: user.uid, userName: user.displayName || 'User', date: new Date(Date.now() - 86400000 * 14), time: '20:30', pax: 4, specialRequest: 'Birthday celebration' },
          { id: 'dummy3', userId: user.uid, userName: user.displayName || 'User', date: new Date(Date.now() + 86400000 * 30), time: '18:00', pax: 2 },
        ];
        setReservations(dummyReservations);
      } else {
        setReservations(userReservations);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [user, authLoading, router, getReservations]);

  if (authLoading || loading) {
    return (
      <div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  
  if (reservations.length === 0) {
    return (
         <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">No Reservations Found</h2>
            <p className="text-muted-foreground mb-4">You haven't booked any tables yet.</p>
            <Button asChild>
                <Link href="/#menu">Book Your First Table</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-8">
        <AiRecommendations getRecommendations={getMenuRecommendations} reservations={reservations} />
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Reservation History</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={reservations} />
            </CardContent>
        </Card>
    </div>
  );
}
