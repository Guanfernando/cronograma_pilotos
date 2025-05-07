const API_KEY = 'ec6ef779e69c4ef8b31203701252804';
const BASE_URL = 'https://api.weatherapi.com/v1'

export async function getWeather(city) {
    try{
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no&lang=es`)
        if (!response.ok) {
            throw new Error('error en la respuesta de la API')
        }
        const data = await response.json();
        return data;
    }catch (error) {
        throw new Error(error.message); 
    }
}