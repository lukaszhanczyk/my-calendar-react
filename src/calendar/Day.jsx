import React, { useEffect } from 'react';
import { Col } from 'reactstrap';
import './Day.css';

export default function Day({ day, currentMonth, onDayClick, onEventClick, events }) {
  const isCurrentMonth = day.isCurrentMonth;
  const isToday = day.isToday;

  const handleClick = () => {
    if (onDayClick) {
      onDayClick(day.date);
    }
  };

  const handleEventClick = (e, eventId) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(eventId);
    }
  };


  return (
    <Col className={`border p-2 text-center day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`} onClick={handleClick}>
      <div className='date-div'>
        <div className="date-number">
        <span>{day.date.date()}</span>
        </div>
        <div className="events">
          {events.map((event) => (
            <div
                onClick={(elem) => handleEventClick(elem, event.id)}
                key={event.id}
                className="event-rectangle"
                style={{ backgroundColor: event.color }}
            >{event.title}</div>
          ))}
        </div>
      </div>  
    </Col>
  );
}