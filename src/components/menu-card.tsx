import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { MenuItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
  className?: string;
}

export function MenuCard({ item, className }: MenuCardProps) {
  return (
    <Card className={cn('flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300', className)}>
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={item.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <p className="font-bold text-lg text-primary">
          ${item.price.toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
