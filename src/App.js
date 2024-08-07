import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar style={{ backgroundColor: 'rgb(83, 91, 242)' }} variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand as={Link} to="/">Country Info</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div className="container mt-4">
                        <Routes>
                            <Route path="/" element={<CountryList />} />
                            <Route path="/country/:cca3" element={<CountryDetails />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;


