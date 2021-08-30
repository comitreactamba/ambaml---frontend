import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function NavBarMisPublicaciones({ onNewPubClick }) {
  return (
    <Row className="mt-2 ml-2">
      <Col>
        <Button onClick={onNewPubClick}>Nueva publicación</Button>
      </Col>
    </Row>
  );
}
