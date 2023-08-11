<template>
    <div
        id="main-animation"
        class="weather-animate"
        :class="'weather-' + backgroundWeather "
    ></div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useWeatherStore} from "@/store/weather.js";
const { backgroundWeather } = storeToRefs(useWeatherStore());
</script>

<style scoped>
.weather-animate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    transition: background-image 2s;
    background-position: center;
}
.weather-default::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(-45deg,#999,#666);
}
.weather-clear {
    background-image: url("../../../images/clear.jpg");
}
.weather-clear::after, .weather-clear::before {
    content: "";
    background-image: url("../../../images/fog.png");
    height: 810px;
    position: absolute;
    width: 100%;
    background-repeat: repeat-x;
}
.weather-clear::after {
    top: -50px;
    animation: animateCloud 150s linear infinite alternate-reverse;
}
.weather-clear::before {
    top: 200px;
    animation: animateCloud calc(60s) linear infinite alternate;
}
.weather-clouds {
    background-image: url("../../../images/clouds.jpg");
}
.weather-clouds::after, .weather-clouds::before {
    content: "";
    background-image: url("../../../images/fog.png");
    height: 810px;
    position: absolute;
    width: 100%;
    background-repeat: repeat-x;
}
.weather-clouds::after {
    top: -50px;
    animation: animateCloud 150s linear infinite alternate-reverse;
}
.weather-clouds::before {
    top: 300px;
    animation: animateCloud calc(75s) linear infinite alternate;
}
@keyframes animateCloud {
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 100% 0;
    }
}
.weather-snow {
    background-image: url("../../../images/snow.jpg");
}
.weather-snow::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    animation: animateSnow 15s cubic-bezier(0.28,0.54,0.47,0.56) infinite normal;
    background-image: url("../../../images/snow2.png"), url("../../../images/snow3.png"), url("../../../images/snow4.png"), url("../../../images/snow3.png");
}
@keyframes animateSnow {
    0% {
        background-position: 0px 0px, 0px 0px, 0px 0px;
    }
    100% {
        background-position: 400px 1100px, 400px 400px, 600px 600px;
    }
}
.weather-rain {
    background-image: url("../../../images/rain-bg.jpg");
}
.weather-rain::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    animation: animateRain 70s cubic-bezier(0.28,0.54,0.47,0.56) infinite normal;
    background-image: url("../../../images/rain-1.png"), url("../../../images/rain-2.png");
    opacity: 0.8;
}
@keyframes animateRain {
    0% {
        background-position: 0px 0px, 0px 0px, 0px 0px;
    }
    100% {
        background-position: 400px 1100px, 400px 400px, 600px 600px;
    }
}
</style>
