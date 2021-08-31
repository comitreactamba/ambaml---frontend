import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import PubCard from './PubCard';
import PubEditorModal from './PubEditorModal';

import Swal from 'sweetalert2';

export default function PubList({ mode, user }) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [showPubEditorModal, setShowPubEditorModal] = useState(false);

  const [pubId, setPubId] = useState(null);

  useEffect(() => {
    getPubs();
  }, [mode]);

  async function getPubs() {
    let url = 'http://localhost:8000/publicaciones';

    if (mode === 'mispubs') {
      url = 'http://localhost:8000/publicaciones/mispublicaciones';
    } else if (mode === 'favs') {
      url = 'http://localhost:8000/favoritos';
    }

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    setPublicaciones(data);
  }

  const handleEditClick = (id) => {
    setPubId(id);
    setShowPubEditorModal(true);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: '¿Confirma que desea eliminar la publicación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(result);
      if (result.value) {
        const url = `http://localhost:8000/publicaciones/${id}`;

        fetch(url, { method: 'DELETE', credentials: 'include' }).then(
          async (response) => {
            const data = await response.json();

            if (response.status === 200) {
              getPubs();
              Swal.fire({
                text: data.message,
                icon: 'success',
              });
            } else {
              Swal.fire({
                text: data.message,
                icon: 'error',
              });
            }
          }
        );
      }
    });
  };

  const handleChangeFavStatus = (pubId, isFav) => {
    if (isFav) {
      alert('Eliminar el favorito ' + pubId);
    } else {
      alert('Agregar a favoritos ' + pubId);
    }
  };

  const getCards = () => {
    const cards = publicaciones.map((publicacion) => (
      <PubCard
        publicacion={publicacion}
        mode={mode}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        user={user}
        isFav={true}
        onChangeFavStatus={handleChangeFavStatus}
      />
    ));

    return cards;
  };

  const handleNewPubClick = () => {
    setPubId(null);
    setShowPubEditorModal(true);
  };

  const handleHidePubEditorModal = () => {
    setShowPubEditorModal(false);
  };

  return (
    <>
      {mode === 'mispubs' && (
        <NavBarMisPublicaciones onNewPubClick={handleNewPubClick} />
      )}
      <Row
        className={
          'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6'
        }
      >
        {getCards()}
      </Row>

      <PubEditorModal
        show={showPubEditorModal}
        handleHide={handleHidePubEditorModal}
        pubId={pubId}
        handleListRefresh={getPubs}
      />
    </>
  );
}
