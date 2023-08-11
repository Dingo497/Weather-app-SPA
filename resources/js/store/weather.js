import { ref } from "vue";
import { defineStore } from "pinia";
import { currentForecast } from "../http/weather-api.js";

export const useWeatherStore = defineStore("weatherStore", {
    state: () => ({
        locationName: ref(''),
        locationCountry: ref(''),
        lastUpdated: ref(''),

        currentFeelsLike_EU: ref(''),
        currentFeelsLike_US: ref(''),
        currentTemp_EU: ref(''),
        currentTemp_US: ref(''),
        currentWind_EU: ref(''),
        currentWind_US: ref(''),
        currentHumidity: ref(''),
        currentCloud: ref(''),
        currentIcon: ref(''),
        currentIconDescription: ref(''),

        errorMessage: ref(''),
    }),


    getters: {
        /**
         * Ziskanie spravnej triedy animacie pocasia v pozadi
         * TODO Vyzera to divoko, pretoze neviem najst v API pocasia ktoru volam, ziadne rozdelenie hlasok
         * @param state
         * @returns {string}
         */
        backgroundWeather(state) {
            switch (state.currentIconDescription) {
                case 'Sunny':
                    return 'clear';
                case 'Light rain':
                case 'Moderate rain at times':
                case 'Light rain shower':
                    return 'rain';
                case 'Snowy':
                    return 'snow';
                default:
                    return 'clouds';
            }
        },

        /**
         * Ziskanie sily vetra podla toho, ci vlozeny pouzivatel ma nastavenu EU alebo US lokalizaciu
         * @param state
         * @returns {(function(string): string)}
         */
        getCurrentWind(state) {
            return (userLocation) => {
                if (userLocation === 'EN') {
                    return state.currentWind_EU + 'kph';
                } else {
                    return state.currentWind_US + 'mph';
                }
            }
        },

        /**
         * Ziskanie pocitovej teploty podla vlozeneho pouzivatela a jeho hodnoty lokalizacie
         * @param state
         * @returns {(function(string): ({unit: string, value: string}))}
         */
        getCurrentFeelsLike(state) {
            return (userLocation) => {
                if (userLocation === 'EN') {
                    return {
                        'value': state.currentFeelsLike_EU ?? '',
                        'unit': 'C'
                    }
                } else {
                    return {
                        'value': state.currentFeelsLike_US ?? '',
                        'unit': 'F'
                    }
                }
            }
        },

        /**
         * Ziskanie teploty podla vlozeneho pouzivatela a jeho hodnoty lokalizacie
         * @param state
         * @returns {(function(string): ({unit: string, value: string}))}
         */
        getCurrentTemp(state) {
            return (userLocation) => {
                if (userLocation === 'EN') {
                    return {
                        'value': state.currentTemp_EU ?? '',
                        'unit': 'C'
                    }
                } else {
                    return {
                        'value': state.currentTemp_US ?? '',
                        'unit': 'F'
                    }
                }
            }
        }

    },


    actions: {
        /**
         * Zavolanie API a ziskanie aktualneho pocasia a priradenie potrebnych hodnot
         * @param place
         * @returns {Promise<void>}
         */
        async handleCurrentForecast(place) {
            try {
                const {data} = await currentForecast(place);
                if (data.current && data.location) {
                    this.locationName = data.location.name ?? '';
                    this.locationCountry = data.location.country ?? '';
                    this.lastUpdated = data.current.last_updated ?? '';

                    this.currentFeelsLike_EU = data.current.feelslike_c ?? '';
                    this.currentFeelsLike_US = data.current.feelslike_f ?? '';
                    this.currentTemp_EU = data.current.temp_c ?? '';
                    this.currentTemp_US = data.current.temp_f ?? '';
                    this.currentWind_EU = data.current.wind_kph ?? '';
                    this.currentWind_US = data.current.wind_mph ?? '';
                    this.currentHumidity = data.current.humidity ?? '';
                    this.currentCloud = data.current.cloud ?? '';
                    this.currentIcon = data.current.condition.icon ?? '';
                    this.currentIconDescription = data.current.condition.text ?? '';
                    // Ak este stale mam error z predosleho hladania, tak ho resetujem
                    if (this.errorMessage) {
                        this.errorMessage = '';
                    }
                }
            } catch (error) {
                if (error.response.data.error.message) {
                    this.errorMessage = error.response.data.error.message;
                } else {
                    this.errorMessage = error.message;
                }
            }
        }
    }
});
