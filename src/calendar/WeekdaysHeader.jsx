import React from 'react';
import { Row, Col } from 'reactstrap';
import './WeekdaysHeader.css';

const WeekdaysHeader = () => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Row className="daysofweek m-0">
      {weekdays.map((day, index) => (
        <Col key={index} className="border text-center day">
          {day}
        </Col>
      ))}
    </Row>
  );
};

export default WeekdaysHeader;