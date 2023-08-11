import axios from 'axios';

const VITE_BASE_URL = 'http://localhost:8000/api';

const WEATHER_BASE_URL = 'https://weatherapi-com.p.rapidapi.com';
const WEATHER_API_KEY = '9faa4598e8msh7442fb03acfb1c8p109ed2jsn9c2db763d77c';
const WEATHER_API_HOST = 'weatherapi-com.p.rapidapi.com';

let backendAPI = axios.create({
    baseURL: VITE_BASE_URL,
});

let weatherAPI = axios.create({
    baseURL: WEATHER_BASE_URL,
    headers: {
        'X-RapidAPI-Key': WEATHER_API_KEY,
        'X-RapidAPI-Host': WEATHER_API_HOST
    }
});

export { backendAPI, weatherAPI }

