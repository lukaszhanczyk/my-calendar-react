import React from 'react';
import Day from './Day';
import WeekdaysHeader from './WeekdaysHeader';
import './Month.css';

const Month = ({ month, currentMonth, onDayClick, onEventClick, events }) => {
  return (
    <div className="month">
      <WeekdaysHeader />
      {month.map((week, weekIndex) => (
        <div key={weekIndex} className="week">
          {week.map((day, dayIndex) => (
            <Day
              key={dayIndex}
              day={day}
              currentMonth={currentMonth}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
              events={events?.filter(event => event.date.format('YYYY-MM-DD') === (day.date.format('YYYY-MM-DD')))} // Filter events for the specific day
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;