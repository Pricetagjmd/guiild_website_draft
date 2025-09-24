export type HeroSlide = {
  id: number;
  title: string;
  description: string;
  cta: string;
  accent: 'crimson' | 'gold' | 'slate';
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Guild Innovations Hub',
    description: 'Collaborate on cross-discipline initiatives that shape the next generation of member services.',
    cta: 'Explore the guild roadmap',
    accent: 'crimson',
  },
  {
    id: 2,
    title: 'Events That Bring Us Together',
    description: 'From strategy roundtables to community showcases, there is always something on the calendar.',
    cta: 'View the events calendar',
    accent: 'gold',
  },
  {
    id: 3,
    title: 'Resource Vault',
    description: 'A curated archive of playbooks, templates, and insights from guild chapters across the globe.',
    cta: 'Preview the vault collection',
    accent: 'slate',
  },
];
