import { useEffect, useMemo, useState } from 'react';
import { EventRecord, fetchEvents } from '../api/events';
import EventsCalendar from '../components/EventsCalendar';
import EventList from '../components/EventList';
import EventOverlay from '../components/EventOverlay';
import { partitionEvents } from '../utils/date';
import './pages.css';

const EventsPage = () => {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const visibleMonthEvents = useMemo(() => {
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    return events.filter((event) => {
      const date = new Date(event.date);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  }, [events, viewDate]);

  const { upcoming, past } = useMemo(() => partitionEvents(events), [events]);

  return (
    <section className="page-section">
      <header>
        <p className="section-eyebrow">Plan ahead</p>
        <h1 className="section-title">Events</h1>
        <p>
          Explore upcoming gatherings, workshops, and celebrations hosted by the University Guild. Use the calendar to browse by
          month or switch to list view to skim highlights, including archived programs.
        </p>
        <div className="view-toggle" role="tablist" aria-label="Event view options">
          <button
            role="tab"
            aria-selected={viewMode === 'calendar'}
            className={viewMode === 'calendar' ? 'view-toggle__button view-toggle__button--active' : 'view-toggle__button'}
            type="button"
            onClick={() => setViewMode('calendar')}
          >
            Calendar view
          </button>
          <button
            role="tab"
            aria-selected={viewMode === 'list'}
            className={viewMode === 'list' ? 'view-toggle__button view-toggle__button--active' : 'view-toggle__button'}
            type="button"
            onClick={() => setViewMode('list')}
          >
            List view
          </button>
        </div>
      </header>

      {viewMode === 'calendar' ? (
        <EventsCalendar
          viewDate={viewDate}
          onChangeMonth={(offset) =>
            setViewDate((previous) => new Date(previous.getFullYear(), previous.getMonth() + offset, 1))
          }
          events={visibleMonthEvents}
          onSelectEvent={setSelectedEvent}
        />
      ) : (
        <div className="event-lists">
          <EventList title="Upcoming events" events={upcoming} onSelectEvent={setSelectedEvent} />
          <EventList title="Past events" events={past} onSelectEvent={setSelectedEvent} />
        </div>
      )}

      <EventOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
};

export default EventsPage;
