import { EventItem } from '../data/events';

interface EventCalendarProps {
  events: EventItem[];
  onSelect: (event: EventItem) => void;
}

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const EventCalendar = ({ events, onSelect }: EventCalendarProps) => {
  const eventsByDay = dayLabels.map((_, index) =>
    events.filter(event => new Date(event.date).getDay() === index).sort((a, b) => a.date.localeCompare(b.date)),
  );

  return (
    <div className="event-calendar" role="grid" aria-label="Event calendar">
      {dayLabels.map((label, index) => (
        <div key={label} className="event-calendar__column" role="gridcell" aria-label={label}>
          <p className="event-calendar__day">{label}</p>
          {eventsByDay[index].length === 0 ? (
            <p className="event-calendar__empty">No scheduled events</p>
          ) : (
            eventsByDay[index].map(event => (
              <button
                key={event.id}
                type="button"
                className="event-calendar__event"
                onClick={() => onSelect(event)}
              >
                <span className="event-calendar__event-title">{event.title}</span>
                <span className="event-calendar__event-time">{event.time}</span>
              </button>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default EventCalendar;
