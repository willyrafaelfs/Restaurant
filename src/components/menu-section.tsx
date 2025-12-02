import { menuItems } from '@/lib/data';
import { MenuCard } from './menu-card';

export default function MenuSection() {
  return (
    <section id="menu" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">
          Our Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
