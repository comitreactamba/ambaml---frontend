import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Swal from 'sweetalert2';

export default function LoginModal({ show, onHide, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAcceptClick = async () => {
    const loginUser = {
      email,
      password,
    };

    const url = 'http://localhost:8000/auth';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const dataJson = await response.json();
    if (response.status === 200) {
      onLoginSuccess(dataJson.data);
      console.log(dataJson);
    } else {
      Swal.fire({ icon: 'error', title: dataJson.message });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAcceptClick}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
