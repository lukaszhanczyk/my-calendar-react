import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './AddEventModal.css';

const AddEventModal = ({ isOpen, onAddEvent, onToggle }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventTitle.trim() !== '') {
      onAddEvent(eventTitle, eventDetails, selectedColor);
      setEventTitle('');
      setEventDetails('');
      setSelectedColor('blue');
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <Modal isOpen={isOpen} >
      <ModalHeader toggle={onToggle}>Add event</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="eventTitle">Event Title</Label>
            <Input type="text" name="eventTitle" id="eventTitle" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="eventDetails">Event Details</Label>
            <Input type="textarea" name="eventDetails" id="eventDetails" value={eventDetails} onChange={(e) => setEventDetails(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Event Color</Label>
            <div className="color-selector">
              <div className={`color-option ${selectedColor === 'blue' && 'selected'}`} style={{ backgroundColor: '#ff8a00' }} onClick={() => handleColorSelect('ff8a00')}></div>
              <div className={`color-option ${selectedColor === 'green' && 'selected'}`} style={{ backgroundColor: '#e52e71' }} onClick={() => handleColorSelect('green')}></div>
              <div className={`color-option ${selectedColor === 'red' && 'selected'}`} style={{ backgroundColor: '#9d50bb' }} onClick={() => handleColorSelect('red')}></div>
              <div className={`color-option ${selectedColor === 'yellow' && 'selected'}`} style={{ backgroundColor: '#654ea3' }} onClick={() => handleColorSelect('yellow')}></div>
            </div>
          </FormGroup>
          <Button type="submit" color="primary">Add</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddEventModal;