import React from 'react';
import { Col } from 'reactstrap';
import './Day.css';

export default function Day({ day, currentMonth, onDayClick }) {
  const isCurrentMonth = day.isCurrentMonth;
  const isToday = day.isToday;

  const handleClick = () => {
    if (onDayClick) {
      onDayClick(day.date);
    }
  };

  return (
    <Col className={`border p-2 text-center day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`} onClick={handleClick}>
      <div className="date-number">
        <span>{day.date.date()}</span>
      </div>
    </Col>
  );
}