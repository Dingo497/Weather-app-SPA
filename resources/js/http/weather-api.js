import {weatherAPI} from './main-api.js';

export const currentForecast = (place) => weatherAPI.get('forecast.json', {
    params: {
        q: place
    }
});
