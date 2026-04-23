'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  currentPage: number;
  hasNextPage?: boolean;
};

export default function ListingPagination({
  currentPage,
  hasNextPage = true,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold">
        {currentPage}
      </div>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNextPage}
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}