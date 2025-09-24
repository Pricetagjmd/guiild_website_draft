import { EventRecord } from '../api/events';

export const getMonthKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export const generateCalendarMatrix = (viewDate: Date) => {
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const lastDay = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const weeks: (Date | null)[][] = [];

  let currentWeek: (Date | null)[] = [];
  let currentDate = new Date(firstDay);

  const leadingEmptyDays = firstDay.getDay();
  for (let i = 0; i < leadingEmptyDays; i += 1) {
    currentWeek.push(null);
  }

  while (currentDate <= lastDay) {
    currentWeek.push(new Date(currentDate));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

export const partitionEvents = (events: EventRecord[]) => {
  const now = new Date();
  const upcoming = events.filter((event) => new Date(event.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events.filter((event) => new Date(event.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { upcoming, past };
};
