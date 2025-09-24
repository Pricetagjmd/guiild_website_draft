export type EventRecord = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  price?: string | null;
  createdAt: string;
};

type ApiEvent = Omit<EventRecord, 'createdAt'> & { created_at: string };

const fallbackEvents: EventRecord[] = [
  {
    id: 1,
    title: 'Guild Strategy Summit',
    date: '2024-02-19T17:00:00.000Z',
    location: 'Guild Hall East Wing',
    description: 'An open planning session where students co-design the guild’s annual priorities and funding roadmap.',
    price: 'Free',
    createdAt: '2024-01-28T12:00:00.000Z'
  },
  {
    id: 2,
    title: 'Community Kitchen Pop-Up',
    date: '2024-02-12T16:00:00.000Z',
    location: 'Campus Quad',
    description: 'Share recipes, learn quick meal prep tips, and contribute to the campus food pantry initiative.',
    price: 'Suggested donation $5',
    createdAt: '2024-01-25T09:30:00.000Z'
  },
  {
    id: 3,
    title: 'Guild Alumni Mentorship Mixer',
    date: '2024-01-05T23:00:00.000Z',
    location: 'Downtown Innovation Hub',
    description: 'Past guild officers reconnect with students to discuss career pathways and leadership development.',
    price: null,
    createdAt: '2023-12-20T10:15:00.000Z'
  }
];

const toEventRecord = (event: ApiEvent): EventRecord => ({
  ...event,
  createdAt: event.created_at
});

export const fetchEvents = async (): Promise<EventRecord[]> => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: ApiEvent[] = await response.json();
    return events.map(toEventRecord);
  } catch (error) {
    console.warn('Falling back to local event data', error);
    return fallbackEvents;
  }
};
