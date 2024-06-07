import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import Month from '../calendar/Month.jsx';
import dayjs from 'dayjs';
import { Button } from 'reactstrap';
import axiosClient from "../client/axios-client";
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
  const { logout, user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetailsModalOpen, setEventDetailsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const daysMatrix = getMonth(currentYear, currentMonth);

  const refreshEvents = () => {
    setEvents([])
    axiosClient.get(
        `/event/range`,
        {
          params: {
            year: currentYear,
            month: currentMonth + 1,
            user_id: user.id,
          }
        }
    ).then(response => {
      const _events = response.data;

      _events.map(event => {
        let arrayDate = event.date.split('-');
        event.date = dayjs(new Date(arrayDate[0], parseInt(arrayDate[1]) - 1, arrayDate[2]))
      });

      if (events) {
        setEvents(_events);
      } else {
        setEvents([])
      }
    })
  }
  useEffect(() => {
    refreshEvents();
  }, [currentMonth]);

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
    setModalOpen(true);
  };

  const handleEventClick = (eventId) => {
    const existingEvent = events.find(event => event.id === eventId);
    if (existingEvent) {
      setSelectedEvent(existingEvent);
      setEventDetailsModalOpen(true);
    }
  };

  const handleAddEvent = (eventTitle, eventDetails, color) => {
    const newEvent = { date: selectedDate, title: eventTitle, details: eventDetails, color: color };
    axiosClient.post(
        `/event/create`,
        {
          title: newEvent.title,
          description: newEvent.details,
          date: selectedDate.format('YYYY-MM-DD'),
          color: newEvent.color,
          user_id: user.id
        }
    ).then(() => {
      refreshEvents();
      setModalOpen(false);
    })
  };

  const handleDeleteEvent = (eventToDelete) => {
    axiosClient.delete(
        `/event/delete/${eventToDelete.id}`,
    ).then(() => {
      refreshEvents();
      setEventDetailsModalOpen(false);
    });
  };

  const handleEditEvent = (updatedEvent) => {
    axiosClient.put(
        `/event/update`,
        {
          id: updatedEvent.id,
          title: updatedEvent.title,
          description: updatedEvent.description,
          date: updatedEvent.date.format('YYYY-MM-DD'),
          color: updatedEvent.color,
          user_id: updatedEvent.user.id
        }
    ).then(() => {
      refreshEvents();
      setEventDetailsModalOpen(false);
    });
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
        <div className='header-container'>
        <h2>myCalendar</h2>
        <Button className="btn btn-primary mb-4" onClick={logout}>Logout</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button className="btn btn-secondary" onClick={handlePreviousMonth}>{"<--"}</Button>
          <h3>{dayjs(new Date(currentYear, currentMonth)).format('MMMM YYYY')}</h3>
          <Button className="btn btn-secondary" onClick={handleNextMonth}>{"-->"}</Button>
        </div>
        <div className="calendar-container">
          <Month month={daysMatrix} currentMonth={currentMonth} onDayClick={handleDayClick} onEventClick={handleEventClick} events={events} onEventDotClick={handleEventDotClick} />
        </div>
        <AddEventModal isOpen={modalOpen} onAddEvent={handleAddEvent} onToggle ={toggleModal} />
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





