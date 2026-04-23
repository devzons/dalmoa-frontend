import type { AdSectionItem } from './types';

export const homepageAdSections: AdSectionItem[] = [
  {
    id: 'homepage-top',
    title: 'Featured Sponsors',
    placement: 'top',
    items: [
      {
        id: 'top-1',
        title: 'Dallas Korean Business Directory',
        description: 'Promote your business to the local Korean community.',
        href: '/ko/directory',
        ctaLabel: 'View Directory',
        placement: 'top',
        featured: true,
      },
      {
        id: 'top-2',
        title: 'Mortgage & Loan Specials',
        description: 'See current financing and mortgage service highlights.',
        href: '/ko/loan',
        ctaLabel: 'Browse Loans',
        placement: 'top',
        featured: true,
      },
    ],
  },
  {
    id: 'homepage-inline',
    title: 'Community Picks',
    placement: 'inline',
    items: [
      {
        id: 'inline-1',
        title: 'Hot Job Listings',
        description: 'Employers can promote open roles across Dallas.',
        href: '/ko/jobs?featured=1',
        ctaLabel: 'See Jobs',
        placement: 'inline',
        featured: true,
      },
      {
        id: 'inline-2',
        title: 'Business Sale Listings',
        description: 'Featured opportunities for buyers and sellers.',
        href: '/ko/business-sale?featured=1',
        ctaLabel: 'See Listings',
        placement: 'inline',
        featured: true,
      },
      {
        id: 'inline-3',
        title: 'Marketplace Deals',
        description: 'Promoted community marketplace items.',
        href: '/ko/marketplace?featured=1',
        ctaLabel: 'Browse Deals',
        placement: 'inline',
        featured: true,
      },
    ],
  },
  {
    id: 'homepage-bottom',
    title: 'Promote With Dalmoa Hub',
    placement: 'bottom',
    items: [
      {
        id: 'bottom-1',
        title: 'Top Banner Placement',
        description: 'Reserve premium homepage visibility for your brand.',
        href: '/ko/ads',
        ctaLabel: 'Advertise Now',
        placement: 'bottom',
        featured: true,
      },
      {
        id: 'bottom-2',
        title: 'Category Sponsored Placement',
        description: 'Run ads inside jobs, marketplace, real estate, and more.',
        href: '/ko/ads',
        ctaLabel: 'See Ad Options',
        placement: 'bottom',
        featured: true,
      },
    ],
  },
];