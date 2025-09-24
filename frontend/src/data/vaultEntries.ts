export type VaultEntry = {
  year: number;
  title: string;
  description: string;
  tags: string[];
};

export const vaultEntries: VaultEntry[] = [
  {
    year: 2024,
    title: 'Community Garden Partnership',
    description: 'The guild collaborates with the local community garden to launch a student-led sustainability program.',
    tags: ['Sustainability', 'Community']
  },
  {
    year: 2012,
    title: 'Equity Scholarship Fund',
    description: 'Alumni endow a fund to provide micro-grants for students organizing inclusion-focused initiatives.',
    tags: ['Scholarship', 'Equity']
  },
  {
    year: 1998,
    title: 'Guild Radio Reboot',
    description: 'The campus radio station returns to the airwaves, broadcasting student journalism across the region.',
    tags: ['Broadcast', 'Media']
  },
  {
    year: 1965,
    title: 'Guild March for Academic Freedom',
    description: 'Students mobilize to protect academic expression, resulting in landmark policy changes.',
    tags: ['Advocacy', 'History']
  }
];
