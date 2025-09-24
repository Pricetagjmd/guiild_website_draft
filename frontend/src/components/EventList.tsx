import { EventRecord } from '../api/events';
import './event-list.css';

type EventListProps = {
  title: string;
  events: EventRecord[];
  onSelectEvent: (event: EventRecord) => void;
};

const EventList = ({ title, events, onSelectEvent }: EventListProps) => (
  <section className="event-list">
    <header>
      <h2>{title}</h2>
      <p className="event-list__count">{events.length} events</p>
    </header>
    <div className="event-list__items">
      {events.map((event) => (
        <article key={event.id} className="event-card">
          <div className="event-card__date">
            <span className="event-card__day">{new Date(event.date).toLocaleDateString(undefined, { day: 'numeric' })}</span>
            <span className="event-card__month">{new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}</span>
          </div>
          <div className="event-card__content">
            <h3>{event.title}</h3>
            <p className="event-card__meta">
              {new Date(event.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} · {event.location}
            </p>
            <p>{event.description}</p>
            {event.price && <p className="event-card__price">{event.price}</p>}
            <button type="button" onClick={() => onSelectEvent(event)}>
              View details
            </button>
          </div>
        </article>
      ))}
      {events.length === 0 && <p className="event-list__empty">No events in this view yet.</p>}
    </div>
  </section>
);

export default EventList;
