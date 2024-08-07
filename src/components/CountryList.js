import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Card, Form } from 'react-bootstrap';
import { fetchCountries } from '../features/countries/countriesSlice';
import './CountryList.css';

const CountryList = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries.countries);
    const status = useSelector((state) => state.countries.status);
    const error = useSelector((state) => state.countries.error);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'idle' && countries.length === 0) {
            dispatch(fetchCountries());
        }
    }, [dispatch, status, countries.length]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Сортировка стран по алфавиту
    const sortedCountries = countries.slice().sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    const filteredCountries = sortedCountries.filter((country) =>
        country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (status === 'failed') {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <div className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="row">
                {filteredCountries.map((country) => (
                    <div key={country.cca3} className="col-md-4 mb-3">
                        <Card className="custom-card">
                            <Card.Body>
                                <Card.Title>{country.name.common}</Card.Title>
                                <Link
                                    to={`/country/${country.cca3}`}
                                    className="btn btn-primary custom-button"
                                >
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryList;
