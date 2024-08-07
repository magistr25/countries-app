import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Card, Form } from 'react-bootstrap';
import { fetchCountries } from '../features/countries/countriesSlice'; // Импортируем действие из нашего среза
import './CountryList.css'; // Добавим кастомные стили

const CountryList = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries.countries); // Извлекаем только необходимые данные
    const status = useSelector((state) => state.countries.status);
    const error = useSelector((state) => state.countries.error);
    const [searchTerm, setSearchTerm] = useState(''); // Добавляем состояние для ключевого слова поиска

    useEffect(() => {
        if (status === 'idle') { // Проверяем, загружены ли данные
            dispatch(fetchCountries());
        }
    }, [dispatch, status]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCountries = countries.filter((country) =>
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
                        <Card className="custom-card"> {/* Используем кастомный класс */}
                            <Card.Body>
                                <Card.Title>{country.name.common}</Card.Title>
                                <Link
                                    to={`/country/${country.cca3}`}
                                    className="btn btn-primary custom-button"  // Используем кастомный класс
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

