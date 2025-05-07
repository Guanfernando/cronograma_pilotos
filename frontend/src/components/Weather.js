import React, { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherService';
import { Row, Col, Container } from 'react-bootstrap';

const Weather = () => {
  const cities = ['Medellín', 'Monteria', 'Cartago', 'Mariquita']; // Aquí están las 4 ciudades
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherResults = [];
      for (let city of cities) {
        try {
          const data = await getWeather(city);
          weatherResults.push({ city, data });
        } catch (err) {
          weatherResults.push({ city, error: err.message });
        }
      }
      setWeatherData(weatherResults);
    };

    fetchWeather();
  }, []); 

  return (
    <Container>
  {error && <p>Error: {error}</p>}
  {weatherData.length === 0 ? (
    <p>Cargando clima...</p>
  ) : (
    <Row className="mb-2">
      {weatherData.map((result, index) => (
        <Col key={index} xs={12} md={3} style={{textShadow:"1px 1px 2px rgba(0, 0, 0, 0.5)"}}>
          <h4>{result.city}</h4>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <div>
              <img
                src={`https:${result.data.current.condition.icon}`}
                alt={result.data.current.condition.text}
              />
              <p>Temperatura: {result.data.current.temp_c}°C</p>
              <p>Condición: {result.data.current.condition.text}</p>
              <p>Viento: {result.data.current.wind_kph} km/h</p>
              <p>Humedad: {result.data.current.humidity}%</p>
            </div>
          )}
        </Col>
      ))}
    </Row>
  )}
</Container>

      
     
   
  );
};

export default Weather;
