import { EventRecord } from '../api/events';
import { generateCalendarMatrix } from '../utils/date';
import './events-calendar.css';

type EventsCalendarProps = {
  viewDate: Date;
  onChangeMonth: (offset: number) => void;
  events: EventRecord[];
  onSelectEvent: (event: EventRecord) => void;
};

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EventsCalendar = ({ viewDate, onChangeMonth, events, onSelectEvent }: EventsCalendarProps) => {
  const matrix = generateCalendarMatrix(viewDate);

  const eventsByDay = events.reduce<Record<string, EventRecord[]>>((accumulator, event) => {
    const key = new Date(event.date).toDateString();
    accumulator[key] = accumulator[key] ? [...accumulator[key], event] : [event];
    return accumulator;
  }, {});

  return (
    <section className="events-calendar">
      <header className="events-calendar__header">
        <button type="button" onClick={() => onChangeMonth(-1)} aria-label="Previous month">
          ‹
        </button>
        <div>
          <p className="section-eyebrow">Guild calendar</p>
          <h2>
            {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
          </h2>
        </div>
        <button type="button" onClick={() => onChangeMonth(1)} aria-label="Next month">
          ›
        </button>
      </header>
      <div className="events-calendar__grid" role="grid">
        {weekdays.map((weekday) => (
          <div key={weekday} className="weekday" role="columnheader">
            {weekday}
          </div>
        ))}
        {matrix.flatMap((week, weekIndex) =>
          week.map((date, dayIndex) => {
            const key = date ? date.toDateString() : `empty-${weekIndex}-${dayIndex}`;
            const dayEvents = date ? eventsByDay[key] ?? [] : [];
            return (
              <div
                key={key}
                className={`calendar-cell ${dayEvents.length > 0 ? 'calendar-cell--active' : ''}`}
                role="gridcell"
              >
                {date && (
                  <>
                    <span className="calendar-cell__date">{date.getDate()}</span>
                    <ul>
                      {dayEvents.map((event) => (
                        <li key={event.id}>
                          <button type="button" onClick={() => onSelectEvent(event)}>
                            {event.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default EventsCalendar;
