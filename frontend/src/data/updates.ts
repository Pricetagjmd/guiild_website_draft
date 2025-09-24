export type UpdateItem = {
  id: number;
  title: string;
  date: string;
  description: string;
  category: 'Announcement' | 'Spotlight' | 'Reminder';
};

export const updates: UpdateItem[] = [
  {
    id: 1,
    title: 'Quarterly Summit Registration Open',
    date: 'April 02, 2024',
    description: 'Secure your seat for the hybrid summit featuring member-led case studies and live design critiques.',
    category: 'Announcement',
  },
  {
    id: 2,
    title: 'Spotlight: Chapter Beta',
    date: 'March 24, 2024',
    description: 'See how Chapter Beta accelerated onboarding by pairing new members with guild alumni.',
    category: 'Spotlight',
  },
  {
    id: 3,
    title: 'Resource Vault Refresh',
    date: 'March 18, 2024',
    description: 'New templates added for strategic planning, monthly reporting, and member journey mapping.',
    category: 'Reminder',
  },
];
