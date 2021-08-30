import React, { useEffect } from 'react';

import { useParams } from 'react-router';

export default function PubDetail() {
  const { id } = useParams();

  useEffect(() => {
    getPubDetail();
  }, []);

  async function getPubDetail() {
    const url = `http://localhost:8000/publicaciones/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    console.log(data);
  }

  return <div>Detalle de la publicacion {id}</div>;
}
