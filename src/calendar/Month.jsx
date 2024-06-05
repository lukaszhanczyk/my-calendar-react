import React from 'react';
import Day from './Day';
import WeekdaysHeader from './WeekdaysHeader';
import './Month.css';

const Month = ({ month, currentMonth, onDayClick }) => {
  return (
    <div className="month">
      <WeekdaysHeader />
      {month.map((week, weekIndex) => (
        <div key={weekIndex} className="week">
          {week.map((day, dayIndex) => (
            <Day key={dayIndex} day={day} currentMonth={currentMonth} onDayClick={onDayClick} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;