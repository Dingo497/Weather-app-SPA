<template>
    <div class="weather-info">
        <WeatherInfo
            title="Wind"
            :value="getCurrentWind(user.location)"
            iconType="wind"
        />
        <WeatherInfo
            title="Humidity"
            :value="currentHumidity + '%'"
            iconType="droplet"
        />
        <WeatherInfo
            title="Cloud"
            :value="currentCloud + '%'"
            iconType="cloud"
        />
    </div>
</template>


<script setup>
import WeatherInfo from "./WeatherInfo.vue";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/store/auth.js";
import {useWeatherStore} from "@/store/weather.js";

const authStore = useAuthStore();
const weatherStore = useWeatherStore();

const { user } = storeToRefs(authStore);
const {currentHumidity, currentCloud, getCurrentWind} = storeToRefs(weatherStore);
</script>


<style scoped>
.weather-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid rgba(0,0,0,0.1);
    padding-top: 20px;
}
</style>
