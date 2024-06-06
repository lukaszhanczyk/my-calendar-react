import React from 'react';
import { Row, Col } from 'reactstrap';
import './WeekdaysHeader.css';

const WeekdaysHeader = () => {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  return (
    <Row className="daysofweek m-0 no-wrap">
      {weekdays.map((day, index) => (
        <Col key={index} className="border text-center day">
          {day}
        </Col>
      ))}
    </Row>
  );
};

export default WeekdaysHeader;