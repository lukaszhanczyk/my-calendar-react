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

  const eventColors = {
    blue: '#ff8a00',
    green: '#e52e71',
    red: '#9d50bb',
    yellow: '#654ea3'
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
                style={{ backgroundColor: eventColors[event.color] || event.color }}
            ></div>
          ))}
        </div>
      </div>  
    </Col>
  );
}