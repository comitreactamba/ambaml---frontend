import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import PubCard from './PubCard';
import PubEditorModal from './PubEditorModal';

export default function PubList({ mode }) {
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

  const getCards = () => {
    const cards = publicaciones.map((publicacion) => (
      <PubCard
        publicacion={publicacion}
        mode={mode}
        onEditClick={handleEditClick}
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
      />
    </>
  );
}
