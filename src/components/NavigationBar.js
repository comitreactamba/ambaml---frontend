import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export default function NavigationBar({
  user,
  handleLogout,
  handleLoginClick,
}) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <Navbar.Brand>AmbaML</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <>
                <Link className="nav-link" to="/mispubs">
                  Mis publicaciones
                </Link>
                <Link className="nav-link" to="/favoritos">
                  Favoritos
                </Link>

                <NavDropdown title={user} alignRight>
                  <NavDropdown.Item href="#action/3.1">
                    Mi cuenta
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
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
    </>
  );
}
