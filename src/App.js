import React, { useState, useEffect } from 'react';
import './App.css';

import NavigationBar from './components/NavigationBar';
import PubList from './components/PubList';

import PubDetail from './components/PubDetail';
import LoginModal from './components/LoginModal';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    handleCloseLoginModal();
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    const url = 'http://localhost:8000/auth';

    fetch(url, { method: 'DELETE', credentials: 'include' }).then(
      (response) => {
        if (response.status === 200) {
          setUser(null);
        } else {
          console.log('Error al cerrar la sesion');
        }
      }
    );
  };

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  useEffect(() => {
    const url = 'http://localhost:8000/auth/check';

    fetch(url, { method: 'GET', credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'ok') {
          setUser(data.data.name);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        handleLogout={handleLogout}
        handleLoginClick={handleLoginClick}
      />

      <LoginModal
        show={showLoginModal}
        onHide={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <Switch>
        <Route exact path="/">
          <PubList mode="all" user={user} />
        </Route>

        <Route path="/favoritos">
          <PubList mode="favs" user={user} />
        </Route>

        <Route path="/mispubs">
          <PubList mode="mispubs" user={user} />
        </Route>

        <Route path="/detail/:id">
          <PubDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
