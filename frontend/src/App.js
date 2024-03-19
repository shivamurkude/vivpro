import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Charts from './Pages/Charts';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/charts" exact element={<Charts/>} />
     
      </Routes>
    </Router>
  );
}

export default App;
