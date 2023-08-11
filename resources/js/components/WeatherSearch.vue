<template>
    <div class="weather-search">
        <input
            type="text"
            placeholder="Search City"
            class="search-control"
            v-model="searchValue"
            @keydown.enter="submitSearch"
        />
    </div>
    <Alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
    />
</template>


<script setup>
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import Alert from '../components/generally/Alert.vue';
import {useAuthStore} from '../store/auth.js';
import {useWeatherStore} from '../store/weather.js';

const authStore = useAuthStore();
const weatherStore = useWeatherStore();

const { user } = storeToRefs(authStore);
const { errorMessage } = storeToRefs(weatherStore);
const { handleCurrentForecast } = weatherStore;

// Nastavenie inputu hladania na default hodnotu
// bud podla toho co si zaznacil pouzivatel, alebo default co ma nastavene Guest
const searchValue = ref('');
onMounted(() => {
    searchValue.value = user.value.homeLocationName;
});

const submitSearch = async () => {
    await handleCurrentForecast(searchValue.value);
}
</script>


<style scoped>
.weather-search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.weather-search .search-control {
    text-align: center;
    width: 80%;
    height: 50px;
    border: 2px solid rgba(0,0,0,0.1);
    border-radius: 100px;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding: 0px 25px;
    transition: all 0.4s;
}
.weather-search .search-control::placeholder {
    text-align: center;
    color: rgba(0,0,0,0.6);
}
.weather-search .search-control:focus {
    text-align: center;
    background-color: #fff;
    box-shadow: 0 8px 16px rgba(0,0,0,0.25);
    border-color: rgba(0,0,0,0.05);
    font-weight: 600;
}
.weather-search .search-control:focus::placeholder {
    text-align: center;
    font-weight: 400;
}
</style>

