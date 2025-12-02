'use client';

import { useEffect, useState } from 'react';
import type { MenuItem, Reservation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuCard } from '../menu-card';
import { Skeleton } from '../ui/skeleton';
import { Wand2 } from 'lucide-react';

interface AiRecommendationsProps {
  reservations: Reservation[];
  getRecommendations: (reservations: Reservation[]) => Promise<MenuItem[]>;
}

export default function AiRecommendations({ reservations, getRecommendations }: AiRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const result = await getRecommendations(reservations);
      setRecommendations(result);
      setLoading(false);
    };

    if (reservations.length > 0) {
      fetchRecommendations();
    } else {
        setLoading(false);
    }
  }, [reservations, getRecommendations]);

  if (loading) {
    return (
        <Card>
            <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Wand2 className="text-accent" />
                <span>Curated For You</span>
            </CardTitle>
            <CardDescription>
                Our AI is analyzing your preferences to suggest some dishes...
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full hidden md:block" />
                <Skeleton className="h-80 w-full hidden lg:block" />
            </div>
            </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the component if there are no recommendations
  }

  return (
    <Card className="bg-secondary border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="text-accent" />
            <span>Just For You</span>
        </CardTitle>
        <CardDescription>
          Based on your booking history, we think you'll love these dishes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
