import { EventItem } from '../data/events';

interface EventOverlayProps {
  event: EventItem | null;
  onClose: () => void;
}

const EventOverlay = ({ event, onClose }: EventOverlayProps) => {
  if (!event) return null;

  return (
    <div className="event-overlay" role="dialog" aria-modal="true" aria-labelledby="event-overlay-title">
      <div className="event-overlay__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="event-overlay__content">
        <button type="button" className="event-overlay__close" onClick={onClose} aria-label="Close details">
          ×
        </button>
        <p className="event-overlay__eyebrow">Event spotlight</p>
        <h3 id="event-overlay-title">{event.title}</h3>
        <p className="event-overlay__meta">
          <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>{event.time}</span>
          <span>{event.location}</span>
        </p>
        <p className="event-overlay__summary">{event.summary}</p>
        <p>{event.description}</p>
        <button type="button" className="cta-button">
          Add to calendar
        </button>
      </div>
    </div>
  );
};

export default EventOverlay;
