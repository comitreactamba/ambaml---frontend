import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import PubCard from './PubCard';

export default function PubList() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    getPubs();
  }, []);

  async function getPubs() {
    const url = 'http://localhost:8000/publicaciones';

    const response = await fetch(url);
    const data = await response.json();

    setPublicaciones(data);
  }

  const getCards = () => {
    const cards = publicaciones.map((publicacion) => (
      <PubCard publicacion={publicacion} />
    ));

    return cards;
  };

  return (
    <Row
      className={
        'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6'
      }
    >
      {getCards()}
    </Row>
  );
}
