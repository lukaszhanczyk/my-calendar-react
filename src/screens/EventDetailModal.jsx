import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EventDetailsModal = ({ isOpen, toggle, event, onDeleteEvent, onEditEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(event ? event.title : '');
  const [editedDetails, setEditedDetails] = useState(event ? event.details : '');

  if (!event) {
    return null; 
  }

  const handleDelete = () => {
    onDeleteEvent(event);
  };

  const handleSave = () => {
    const updatedEvent = { ...event, title: editedTitle, details: editedDetails };
    onEditEvent(updatedEvent);
    setIsEditing(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{isEditing ? 'Edit Event' : "Title: " + event.title}</ModalHeader>
      <ModalBody>
         {isEditing ? (
          <Form>
            <FormGroup>
              <Label for="editedTitle">Event Title</Label>
              <Input 
                type="text" 
                name="editedTitle" 
                id="editedTitle" 
                value={editedTitle} 
                onChange={(e) => setEditedTitle(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedDetails">Event Details</Label>
              <Input 
                type="textarea" 
                name="editedDetails" 
                id="editedDetails" 
                value={editedDetails} 
                onChange={(e) => setEditedDetails(e.target.value)} 
              />
            </FormGroup>
          </Form>
        ) : (
          <p>Details: {event.details}</p>
        )}
      </ModalBody>
      <ModalFooter>
        {isEditing ? (
          <>
            <Button color="primary" onClick={handleSave}>Save Changes</Button>
            <Button color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button color="warning" onClick={() => setIsEditing(true)}>Edit Event</Button>
            <Button color="danger" onClick={handleDelete}>Delete Event</Button>
            <Button color="secondary" onClick={toggle}>Close</Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default EventDetailsModal;