import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import Month from '../calendar/Month.jsx';
import dayjs from 'dayjs';
import "./Dashboard.css";

function getMonth(year, month) {
  const today = dayjs();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
  const firstDayOfTheWeek = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
  const daysInMonth = dayjs(new Date(year, month + 1, 0)).date();
  let currentMonthCount = 0 - firstDayOfTheWeek;

  const totalDays = firstDayOfTheWeek + daysInMonth;
  const numberOfWeeks = Math.ceil(totalDays / 7);

  const daysMatrix = Array.from({ length: numberOfWeeks }, () => Array.from({ length: 7 }, () => null));

  for (let week = 0; week < numberOfWeeks; week++) {
    for (let day = 0; day < 7; day++) {
      currentMonthCount++;
      const date = dayjs(new Date(year, month, currentMonthCount));
      const isToday = today.isSame(date, 'day');
      daysMatrix[week][day] = {
        date,
        isToday,
        isCurrentMonth: date.month() === month,
        events: [] // Initialize events array
      };
    }
  }

  return daysMatrix;
}

const Dashboard = () => {
  const { logout } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [events, setEvents] = useState([]);

  const daysMatrix = getMonth(currentYear, currentMonth);

  const handlePreviousMonth = () => {
    const newDate = dayjs(new Date(currentYear, currentMonth, 1)).subtract(1, 'month');
    setCurrentMonth(newDate.month());
    setCurrentYear(newDate.year());
  };

  const handleNextMonth = () => {
    const newDate = dayjs(new Date(currentYear, currentMonth, 1)).add(1, 'month');
    setCurrentMonth(newDate.month());
    setCurrentYear(newDate.year());
  };

  const handleDayClick = (date) => {
    const eventText = prompt("Enter event for this day:");
    if (eventText) {
      // Update events state with the new event
      setEvents(prevEvents => [
        ...prevEvents,
        { date, event: eventText }
      ]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p>This is a protected page.</p>
      <button className="btn btn-primary mb-4" onClick={logout}>Logout</button>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary" onClick={handlePreviousMonth}>Previous</button>
        <h3>{dayjs(new Date(currentYear, currentMonth)).format('MMMM YYYY')}</h3>
        <button className="btn btn-secondary" onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-container">
        <Month month={daysMatrix} currentMonth={currentMonth} onDayClick={handleDayClick} />
      </div>
    </div>
  );
};

export default Dashboard;