import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/Navbar';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <Router>
        <NavBar />
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:cca3" element={<CountryDetails />} />
          </Routes>
        </Container>
      </Router>
  );
};

export default App;

