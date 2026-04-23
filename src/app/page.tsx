import Link from 'next/link';
import HomepageAdSections from '@/features/ads/components/HomepageAdSections';

const categoryLinks = [
  { href: '/ko/jobs', label: 'Jobs' },
  { href: '/ko/business-sale', label: 'Business Sale' },
  { href: '/ko/loan', label: 'Loan' },
  { href: '/ko/marketplace', label: 'Marketplace' },
  { href: '/ko/real-estate', label: 'Real Estate' },
  { href: '/ko/cars', label: 'Cars' },
  { href: '/ko/directory', label: 'Directory' },
  { href: '/ko/town-board', label: 'Town Board' },
  { href: '/ko/news', label: 'News' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              Dallas Korean Community Portal
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Dalmoa Hub
            </h1>

            <p className="text-lg leading-8 text-gray-600">
              Local listings, jobs, business opportunities, loans, housing, cars, and community updates in one place.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/ko/jobs"
                className="inline-flex items-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Browse Listings
              </Link>

              <Link
                href="/ko/register"
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {categoryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-sm font-semibold text-gray-900 shadow-sm transition hover:shadow-md"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <HomepageAdSections />
      </section>
    </main>
  );
}