import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MenuSection from '@/components/menu-section';
import { BookingDialog } from '@/components/booking-dialog';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full">
        <Image
          src={placeholderImages.hero.src}
          alt={placeholderImages.hero.alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={placeholderImages.hero.hint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            Savor the Moment
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Experience culinary excellence. Book your table at TableMaster and
            create unforgettable memories.
          </p>
          <div className="mt-8">
            <BookingDialog>
              <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Book a Table
              </Button>
            </BookingDialog>
          </div>
        </div>
      </section>

      <MenuSection />
    </div>
  );
}
