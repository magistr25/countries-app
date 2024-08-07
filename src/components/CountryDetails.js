import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Card, Spinner, Alert } from 'react-bootstrap';
import './CountryDetails.css';
import {fetchCountries} from "../features/countries/countriesSlice";

const CountryDetails = () => {
    const { cca3 } = useParams();
    const countries = useSelector((state) => state.countries.countries);
    const dispatch = useDispatch();

    const [country, setCountry] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            setStatus('loading');
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
                setCountry(response.data[0]);
                setStatus('succeeded');
            } catch (err) {
                setError(err.message);
                setStatus('failed');
            }
        };

        if (!countries.length) {
            dispatch(fetchCountries());
        }

        fetchCountry();
    }, [cca3, countries.length, dispatch]);

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
        return <Alert variant="danger">Error: {error}</Alert>;
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
                <Card.Img src={country.flags.png} alt={`${country.name.common} flag`} className="img-fluid" style={{ width: '150px' }} />
            </Card.Body>
        </Card>
    );
};

export default CountryDetails;
