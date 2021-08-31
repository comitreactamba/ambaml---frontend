import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import iconoFavorito from '../assets/icons/favorito.png';
import iconoNoFavorito from '../assets/icons/no_favorito.png';

export default function PubCard({
  publicacion,
  mode,
  onEditClick,
  onDeleteClick,
  user,
  onChangeFavStatus,
  isFav,
}) {
  const imageUrl = `http://localhost:8000/images/${publicacion.imagen}`;

  const cardImageStyle = {
    height: '30vh',
    objectFit: 'contain',
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    onEditClick(publicacion.id);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    onDeleteClick(publicacion.id);
  };

  const handleFavClick = (event) => {
    event.preventDefault();
    onChangeFavStatus(publicacion.id, isFav);
  };

  return (
    <Col className="my-4 text-center">
      <Link to={`/detail/${publicacion.id}`} className="nav-link">
        <Card className="h-100">
          <Row>
            <Col style={{ textAlign: 'right', margin: '6px' }}>
              {user && (
                <img
                  src={isFav ? iconoFavorito : iconoNoFavorito}
                  onClick={handleFavClick}
                />
              )}
            </Col>
          </Row>

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

                <Button variant="light" onClick={handleDeleteClick}>
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
