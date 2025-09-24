import { useEffect } from 'react';
import { EventRecord } from '../api/events';
import './event-overlay.css';

type EventOverlayProps = {
  event: EventRecord | null;
  onClose: () => void;
};

const EventOverlay = ({ event, onClose }: EventOverlayProps) => {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [event]);

  if (!event) return null;

  return (
    <div className="event-overlay" role="dialog" aria-modal="true">
      <div className="event-overlay__card">
        <button type="button" className="event-overlay__close" onClick={onClose} aria-label="Close event details">
          ×
        </button>
        <p className="section-eyebrow">Event spotlight</p>
        <h2>{event.title}</h2>
        <p className="event-overlay__time">
          {new Date(event.date).toLocaleString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
          })}
        </p>
        <p className="event-overlay__location">{event.location}</p>
        <p>{event.description}</p>
        {event.price && <p className="event-overlay__price">{event.price}</p>}
        <p className="event-overlay__created">Added {new Date(event.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="event-overlay__backdrop" onClick={onClose} />
    </div>
  );
};

export default EventOverlay;
