import { EventItem } from '../data/events';

interface EventListProps {
  events: EventItem[];
  onSelect: (event: EventItem) => void;
}

const EventList = ({ events, onSelect }: EventListProps) => {
  return (
    <ul className="event-list">
      {events.map(event => (
        <li key={event.id} className="event-list__item">
          <article>
            <p className="event-list__date">
              {new Date(event.date).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <h3>{event.title}</h3>
            <p className="event-list__meta">
              <span>{event.time}</span>
              <span>{event.location}</span>
            </p>
            <p>{event.summary}</p>
            <button type="button" className="link-button" onClick={() => onSelect(event)}>
              View details
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
