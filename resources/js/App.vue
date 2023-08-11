<template>
    <div
        class="app"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
    >
        <transition name="fade" mode="out-in" appear>
            <div class="card">
                <Header />
                <router-view></router-view>
            </div>
        </transition>
        <WeatherAnimate />
        <div class="footer-text">
            <a href="https://github.com/Dingo497?tab=repositories" target="_blank" class="link">
                <VueFeather type="github" size="30" class="icon"/>
                <span>Martin Banas</span>
            </a>
        </div>
    </div>
</template>


<script setup>
import WeatherAnimate from "./components/generally/WeatherAnimate.vue";
import Header from "./components/generally/Header.vue";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/store/auth.js";
import {useWeatherStore} from "@/store/weather.js";

const authStore = useAuthStore();
const { user, userToken, isLoggedIn } = storeToRefs(authStore);
const { handleLogout } = authStore;

const weatherStore = useWeatherStore();
const { handleCurrentForecast } = weatherStore;

onMounted(async () => {
    const localStorageUser = JSON.parse(localStorage.getItem('userData'));
    const localStorageUserToken = localStorage.getItem('userToken');

    user.value = localStorageUser ?? {};
    userToken.value = localStorageUserToken ?? '';

    if (isLoggedIn.value) {
        await handleCurrentForecast(user.value.homeLocationName);
    } else {
        await handleCurrentForecast(user.value.homeLocationName);
    }
});
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400");
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Jost", sans-serif;
}
.app {
    display: flex;
    align-items: center;
    justify-content: center;
}
.card {
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    max-width: 360px;
    width: 100%;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 70px rgba(0,0,0,0.3);
    z-index: 9999;
    background-color: #f1f1f1;
}
@media (max-height: 767px) {
    .card {
        padding: 30px;
    }
}
@media (max-width: 480px) {
    .card {
        padding: 20px;
    }
}
.footer-text {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
}
.footer-text .link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #070000e5;
    font-weight: 1000;
    text-shadow: 0 5px 9px rgba(0,0,0,0.2);
}
.footer-text .link span {
    font-size: 18px;
    margin-left: 5px;
}
.footer-text .link:hover {
    text-decoration: underline;
}
</style>
