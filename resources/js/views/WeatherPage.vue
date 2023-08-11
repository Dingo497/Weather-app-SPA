<template>
    <WeatherSearch />
    <div class="weather-main">
        <div class="weather-feelsLike">
            Feels like
            <span>
                {{ getCurrentFeelsLike(user.location).value }}
            </span>
            <sup><small>&deg;{{ getCurrentFeelsLike(user.location).unit }}</small></sup>
        </div>
        <div class="weather-temp">
            <div
                class="weather-icon"
                :style="{ backgroundImage: 'url(' + currentIcon + ')' }"
            >
            </div>
            <span>
                {{ getCurrentTemp(user.location).value }}
            </span>
            <sup><small>&deg;{{ getCurrentTemp(user.location).unit }}</small></sup>
        </div>
        <div class="weather-description">
            {{ currentIconDescription ?? '' }}
        </div>
        <p></p>
    </div>
    <WeatherInfoList />
</template>

<script setup>
import {storeToRefs} from "pinia";
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherInfoList from "@/components/weatherInfo/WeatherInfoList.vue";
import {useAuthStore} from "../store/auth.js";

const authStore = useAuthStore();
const { user, userToken } = storeToRefs(authStore);
import {useWeatherStore} from "../store/weather.js";
const weatherStore = useWeatherStore();
const { getCurrentFeelsLike, getCurrentTemp } = weatherStore;

const { currentIcon, currentIconDescription } = storeToRefs(weatherStore);
</script>

<style scoped>
.weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
}
.weather-main .weather-temp {
    position: relative;
    width: 155px;
    height: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    box-shadow: 0 0 40px rgba(0,0,0,0.2);
    background-color: #fff;
    margin: 40px 0;
}
.weather-main .weather-temp span {
    font-size: 80px;
    position: relative;
}
.weather-main .weather-temp sup {
    position: relative;
    top: -18px;
    left: 5px;
    font-size: 40px;
}
.weather-main .weather-icon {
    position: absolute;
    top: -35px;
    left: -35px;
    width: 110px;
    height: 110px;
    background-repeat: no-repeat;
    background-size: 100%;
    filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.03)) drop-shadow(-5px -5px 0 rgba(0,0,0,0.08));
}
.weather-main .weather-feelsLike, .weather-main .weather-description {
    font-size: 18px;
    color: #666;
    text-transform: capitalize;
}
.weather-main .weather-feelsLike sup, .weather-main .weather-description sup {
    position: relative;
    top: 5px;
    left: 1px;
    font-size: 18px;
}
@media (max-height: 767px) {
    .weather-main {
        margin-top: 10px;
        margin-bottom: -10px;
    }
    .weather-main .weather-temp {
        width: 140px;
        height: 140px;
        margin: 30px 0;
    }
}

</style>
