import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import Month from '../calendar/Month.jsx';
import dayjs from 'dayjs';
import { Button } from 'reactstrap';
import AddEventModal from './AddEventModal.jsx';
import EventDetailsModal from './EventDetailModal.jsx';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetailsModalOpen, setEventDetailsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    setSelectedDate(date);
    const existingEvent = events.find(event => event.date.isSame(date, 'day'));
    if (existingEvent) {
      setSelectedEvent(existingEvent);
      setEventDetailsModalOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  const handleAddEvent = (eventTitle, eventDetails, color) => {
    const newEvent = { date: selectedDate, title: eventTitle, details: eventDetails, color };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setModalOpen(false);
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(prevEvents => prevEvents.filter(event => event !== eventToDelete));
    setEventDetailsModalOpen(false);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(prevEvents => prevEvents.map(event => event === selectedEvent ? updatedEvent : event));
    setEventDetailsModalOpen(false);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleEventDotClick = (event) => {
    setSelectedEvent(event);
    setEventDetailsModalOpen(true);
  };

  const toggleEventDetailsModal = () => {
    setEventDetailsModalOpen(!eventDetailsModalOpen);
  };

  return (
    <div className="container mt-4">
      <h2>My Calendar</h2>
      <div className='d-flex justify-content-start align-items-center'>
        <Button className="btn btn-logout" onClick={logout}>Logout</Button>
      </div>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button className="btn btn-secondary" onClick={handlePreviousMonth}>Previous</Button>
        <h3>{dayjs(new Date(currentYear, currentMonth)).format('MMMM YYYY')}</h3>
        <Button className="btn btn-secondary" onClick={handleNextMonth}>Next</Button>
      </div>
      <div className="calendar-container">
        <Month month={daysMatrix} currentMonth={currentMonth} onDayClick={handleDayClick} events={events} onEventDotClick={handleEventDotClick} />
      </div>
      <AddEventModal isOpen={modalOpen} toggle={toggleModal} onAddEvent={handleAddEvent} />
      <EventDetailsModal 
        isOpen={eventDetailsModalOpen} 
        toggle={toggleEventDetailsModal} 
        event={selectedEvent} 
        onDeleteEvent={handleDeleteEvent} 
        onEditEvent={handleEditEvent} 
      />
    </div>
  );
};

export default Dashboard;





