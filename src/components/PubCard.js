import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function PubCard({ publicacion, mode, onEditClick }) {
  const imageUrl = `http://localhost:8000/images/${publicacion.imagen}`;

  const cardImageStyle = {
    height: '30vh',
    objectFit: 'contain',
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    onEditClick(publicacion.id);
  };

  return (
    <Col className="my-4 text-center">
      <Link to={`/detail/${publicacion.id}`} className="nav-link">
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

          {mode === 'mispubs' && (
            <Row className="my-2">
              <Col>
                <Button variant="light" onClick={handleEditClick}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>

                <Button
                  variant="light"
                  onClick={() => {
                    alert('Eliminar');
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Col>
            </Row>
          )}
        </Card>
      </Link>
    </Col>
  );
}
