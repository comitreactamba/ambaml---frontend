import React, { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PubEditorModal({ show, handleHide, pubId }) {
  const [categorias, setCategorias] = useState([]);

  const [pubTitle, setPubTitle] = useState('');
  const [pubPrice, setPubPrice] = useState('');
  const [pubStock, setPubStock] = useState('');
  const [pubImage, setPubImage] = useState(null);
  const [pubCategory, setPubCategory] = useState('');
  const [previewPubImage, setPreviewPubImage] = useState('');

  useEffect(() => {
    const url = `http://localhost:8000/categorias`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      });
  }, []);

  useEffect(() => {
    if (pubId) {
      const url = `http://localhost:8000/publicaciones/${pubId}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPubTitle(data.nombre);
          setPubPrice(data.precio);
          setPubStock(data.stock);
          setPubCategory(data.id_categoria);
          setPubImage('');
          setPreviewPubImage(`http://localhost:8000/images/${data.imagen}`);
        });
    } else {
      setPubTitle('');
      setPubPrice('');
      setPubStock('');
      setPubCategory('');
      setPubImage('');
      setPreviewPubImage('');
    }
  }, [pubId]);

  useEffect(() => {
    pubImage && setPreviewPubImage(URL.createObjectURL(pubImage));
  }, [pubImage]);

  const getCategoriasOptions = () => {
    return categorias.map((categoria) => (
      <option value={categoria.id}>{categoria.nombre}</option>
    ));
  };

  const handlePubTitleChange = (event) => {
    setPubTitle(event.target.value);
  };

  const handlePubPriceChange = (event) => {
    setPubPrice(event.target.value);
  };

  const handlePubStockChange = (event) => {
    setPubStock(event.target.value);
  };

  const handlePubCategoryChange = (event) => {
    setPubCategory(event.target.value);
  };

  const handlePubImageChange = (event) => {
    setPubImage(event.target.files[0]);
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append('pubTitle', pubTitle);
    formData.append('pubPrice', pubPrice);
    formData.append('pubStock', pubStock);
    formData.append('pubImage', pubImage);
    formData.append('pubCategory', pubCategory);

    let url = `http://localhost:8000/publicaciones`;
    let method = 'POST';

    if (pubId) {
      url += `/${pubId}`;
      method = 'PUT';
    }

    fetch(url, { method, body: formData, credentials: 'include' });
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Publicación</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              value={pubTitle}
              onChange={handlePubTitleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              value={pubPrice}
              onChange={handlePubPriceChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              value={pubStock}
              onChange={handlePubStockChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              as="select"
              value={pubCategory}
              onChange={handlePubCategoryChange}
            >
              {getCategoriasOptions()}
            </Form.Control>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            <img style={{ height: '25vh' }} src={previewPubImage} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handlePubImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}
