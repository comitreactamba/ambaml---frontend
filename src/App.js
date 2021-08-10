import React, { useState } from 'react';
import './App.css';

import NavigationBar from './components/NavigationBar';
import PubList from './components/PubList';
import FavList from './components/FavList';
import MyPubsList from './components/MyPubsList';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <Switch>
        <Route exact path="/">
          <PubList />
        </Route>

        <Route path="/favoritos">
          <FavList />
        </Route>

        <Route path="/mispubs">
          <MyPubsList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
