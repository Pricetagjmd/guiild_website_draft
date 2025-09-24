import { useMemo, useState } from 'react';
import { events as eventsData, EventItem } from '../data/events';
import EventCalendar from '../components/EventCalendar';
import EventList from '../components/EventList';
import EventOverlay from '../components/EventOverlay';
import SearchBar from '../components/SearchBar';
import useScrollReveal from '../hooks/useScrollReveal';

type EventsView = 'calendar' | 'list';

const Events = () => {
  const [view, setView] = useState<EventsView>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const introRef = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const boardRef = useScrollReveal<HTMLElement>({ threshold: 0.25 });

  const events = useMemo(() => eventsData.slice().sort((a, b) => a.date.localeCompare(b.date)), []);

  const handleViewChange = (nextView: EventsView) => {
    setView(nextView);
  };

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const handleCloseOverlay = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="page events-page">
      <section ref={introRef} className="page-section">
        <div className="page-section__header">
          <h2>Events</h2>
          <p>Choose your view to browse upcoming gatherings, clinics, and community spotlights.</p>
        </div>
        <SearchBar placeholder="Search events" variant="dark" />
        <div className="view-toggle" role="tablist" aria-label="Event view options">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'calendar'}
            className={view === 'calendar' ? 'is-active' : ''}
            onClick={() => handleViewChange('calendar')}
          >
            Calendar view
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'list'}
            className={view === 'list' ? 'is-active' : ''}
            onClick={() => handleViewChange('list')}
          >
            List view
          </button>
        </div>
      </section>
      <section ref={boardRef} className="page-section">
        {view === 'calendar' ? (
          <EventCalendar events={events} onSelect={handleSelectEvent} />
        ) : (
          <EventList events={events} onSelect={handleSelectEvent} />
        )}
      </section>
      <EventOverlay event={selectedEvent} onClose={handleCloseOverlay} />
    </div>
  );
};

export default Events;
