import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function PubCard({ publicacion }) {
  const imageUrl = `http://localhost:8000/images/${publicacion.imagen}`;

  const cardImageStyle = {
    height: '30vh',
    objectFit: 'contain',
  };

  return (
    <Col className="my-4 text-center">
      <Card className="h-100">
        <Card.Img
          style={cardImageStyle}
          variant="top"
          src={imageUrl}
        ></Card.Img>

        <Card.Body>
          <Card.Title>{publicacion.nombre}</Card.Title>
        </Card.Body>

        <Card.Footer>$ {publicacion.precio}</Card.Footer>
      </Card>
    </Col>
  );
}
