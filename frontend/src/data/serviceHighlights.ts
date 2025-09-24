export type ServiceHighlight = {
  id: number;
  name: string;
  summary: string;
  linkLabel: string;
};

export const serviceHighlights: ServiceHighlight[] = [
  {
    id: 1,
    name: 'Mentorship Circles',
    summary: 'Connect with domain experts each quarter for guided cohort sessions and peer accountability.',
    linkLabel: 'Meet the mentors',
  },
  {
    id: 2,
    name: 'Innovation Studio',
    summary: 'Rapid prototyping lab for validating member experience ideas with real guild feedback.',
    linkLabel: 'Tour the studio',
  },
  {
    id: 3,
    name: 'Learning Tracks',
    summary: 'Curated playlists of workshops, recordings, and playbooks to expand your guild toolkit.',
    linkLabel: 'Browse tracks',
  },
];
