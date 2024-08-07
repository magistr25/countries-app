import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../features/countries/countriesSlice';
import { Link } from 'react-router-dom';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';

const CountryList = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries.countries);
    const status = useSelector((state) => state.countries.status);
    const error = useSelector((state) => state.countries.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>;
    }

    if (status === 'failed') {
        return <Alert variant="danger">Error: {error}</Alert>;
    }

    return (
        <ListGroup>
            {countries.map((country) => (
                <ListGroup.Item key={country.cca3}>
                    <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default CountryList;
