import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Alert } from 'react-bootstrap';

const CountryDetails = () => {
    const { cca3 } = useParams();
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

        fetchCountry();
    }, [cca3]);

    if (status === 'loading') {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>;
    }

    if (status === 'failed') {
        return <Alert variant="danger">Error: {error}</Alert>;
    }

    return (
        country && (
            <Card>
                <Card.Img variant="top" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <Card.Body>
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Text>Capital: {country.capital ? country.capital[0] : 'N/A'}</Card.Text>
                </Card.Body>
            </Card>
        )
    );
};

export default CountryDetails;
