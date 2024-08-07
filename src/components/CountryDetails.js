import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Spinner, Alert } from 'react-bootstrap';
import './CountryDetails.css';
import { fetchCountries } from '../features/countries/countriesSlice';

const CountryDetails = () => {
    const { cca3 } = useParams();
    const countries = useSelector((state) => state.countries.countries);
    const status = useSelector((state) => state.countries.status);
    const error = useSelector((state) => state.countries.error);
    const dispatch = useDispatch();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        } else {
            const selectedCountry = countries.find((country) => country.cca3 === cca3);
            setCountry(selectedCountry);
        }
    }, [dispatch, status, countries, cca3]);

    useEffect(() => {
        if (status === 'succeeded') {
            const selectedCountry = countries.find((country) => country.cca3 === cca3);
            setCountry(selectedCountry);
        }
    }, [status, countries, cca3]);

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

    if (!country) {
        return <Alert variant="danger">Country not found</Alert>;
    }

    const languages = country.languages ? Object.values(country.languages).join(', ') : 'Not specified';
    const borders = country.borders ? country.borders.join(', ') : 'Not specified';
    const capital = country.capital ? country.capital.join(', ') : 'Not specified';
    const subregion = country.subregion || 'Not specified';

    return (
        <Card className="custom-card">
            <Card.Body>
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Text><strong>Official Name:</strong> {country.name.official}</Card.Text>
                <Card.Text><strong>Capital:</strong> {capital}</Card.Text>
                <Card.Text><strong>Population:</strong> {country.population.toLocaleString()}</Card.Text>
                <Card.Text><strong>Region:</strong> {country.region}</Card.Text>
                <Card.Text><strong>Subregion:</strong> {subregion}</Card.Text>
                <Card.Text><strong>Languages:</strong> {languages}</Card.Text>
                <Card.Text><strong>Borders:</strong> {borders}</Card.Text>
                <Card.Img  src={country.flags.png} alt={`${country.name.common} flag`} className="img-fluid" style={{ width: '150px' }} />
            </Card.Body>
        </Card>
    );
};

export default CountryDetails;
