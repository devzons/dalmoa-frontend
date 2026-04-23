import Link from 'next/link';
import type { AdItem, AdPlacement } from '../types';

type AdSlotProps = {
  item: AdItem;
  placement: AdPlacement;
  compact?: boolean;
};

export default function AdSlot({
  item,
  placement,
  compact = false,
}: AdSlotProps) {
  const href = item.ctaUrl ?? '#';
  const label = item.ctaLabel ?? 'Learn More';

  const content = (
    <article
      className={[
        'rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md',
        compact ? 'p-4' : 'p-6',
      ].join(' ')}
    >
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            Sponsored
          </div>

          <h3 className={compact ? 'text-base font-semibold text-gray-900' : 'text-lg font-semibold text-gray-900'}>
            {item.title}
          </h3>

          {item.excerpt ? (
            <p className="text-sm leading-6 text-gray-600">{item.excerpt}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-400">{placement.toUpperCase()}</span>
          <span className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white">
            {label}
          </span>
        </div>
      </div>
    </article>
  );

  if (!item.ctaUrl) {
    return content;
  }

  if (item.isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}