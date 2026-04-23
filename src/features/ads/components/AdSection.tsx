import type { AdSectionItem } from '../types';
import AdSlot from './AdSlot';

type AdSectionProps = {
  section: AdSectionItem;
};

function getGridClass(itemCount: number) {
  if (itemCount === 1) return 'grid-cols-1';
  if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
}

export default function AdSection({ section }: AdSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Advertising</p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{section.title}</h2>
        </div>
      </div>

      <div className={`grid gap-4 ${getGridClass(section.items.length)}`}>
        {section.items.map((item) => (
          <AdSlot
            key={item.id}
            item={item}
            placement={section.placement}
          />
        ))}
      </div>
    </section>
  );
}