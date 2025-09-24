export type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  description: string;
};

export const events: EventItem[] = [
  {
    id: 1,
    title: 'Strategy Roundtable',
    date: '2024-04-11',
    time: '10:00 AM – 11:30 AM ET',
    location: 'Virtual',
    summary: 'Member strategy leads share their quarterly OKRs and request cross-team input.',
    description:
      'Join facilitators from across chapters for a focused roundtable on member strategy. Bring one challenge that needs guild feedback and leave with actionable advice.',
  },
  {
    id: 2,
    title: 'Design Ops Clinic',
    date: '2024-04-17',
    time: '2:00 PM – 3:15 PM ET',
    location: 'Guild HQ, Studio 4',
    summary: 'Live working session to streamline briefs and handoffs for the innovation studio teams.',
    description:
      'Our design ops leads are opening up their playbooks. Expect hands-on activities focused on simplifying the guild request intake process and clarifying success metrics.',
  },
  {
    id: 3,
    title: 'Community Showcase',
    date: '2024-04-23',
    time: '6:00 PM – 7:30 PM ET',
    location: 'Hybrid',
    summary: 'Celebrate project launches with lightning talks from three chapters and member Q&A.',
    description:
      'An energizing evening featuring chapter demo booths, live lightning talks, and an AMA with the leadership council. Bring guests and questions!',
  },
  {
    id: 4,
    title: 'Vault Curators AMA',
    date: '2024-04-29',
    time: '12:00 PM – 1:00 PM ET',
    location: 'Virtual',
    summary: 'Meet the curators stewarding new vault submissions and learn how to contribute.',
    description:
      'Hear directly from the curators about submission guidelines, evaluation criteria, and upcoming thematic collections. Plenty of time for questions and shared inspiration.',
  },
];
