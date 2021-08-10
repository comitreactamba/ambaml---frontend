import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import LoginModal from './LoginModal';

export default function NavigationBar() {
  const [user, setUser] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">AmbaML</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <>
                <Nav.Link href="#home">Mis publicaciones</Nav.Link>
                <Nav.Link href="#link">Favoritos</Nav.Link>

                <NavDropdown title={user} alignRight>
                  <NavDropdown.Item href="#action/3.1">
                    Mi cuenta
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button onClick={handleLoginClick}>Iniciar sesión</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <LoginModal show={showLoginModal} onHide={handleCloseLoginModal} />
    </>
  );
}
