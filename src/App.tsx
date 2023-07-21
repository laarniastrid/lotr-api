import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';

import NavBar from './components/NavBar/NavBar';

import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import Characters from './components/Characters/Characters';
import Quotes from './components/Quotes/Quotes';

function App() {

  return (
    <>
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/*" element={<Movies />} />
        <Route path="/characters/*" element={<Characters />} />
        <Route path="/quotes/*" element={<Quotes />} />
      </Routes>
    </>
  );
}

export default App;
