<template>
    <div class="header">
        <div class="nav-item">
            <router-link :to="{ name: 'CurrentWeather' }">
                <VueFeather type="cloud" size="26" class="icon"/>
                <br>
                <span>Actual</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link :to="{ name: 'WeatherUpcoming' }">
                <VueFeather type="list" size="26" class="icon"/>
                <br>
                <span>Upcoming</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link
                v-if="user.name === 'Guest'"
                :to="{ name: 'Auth' }"
            >
                <VueFeather type="log-in" size="26" class="icon"/>
                <br>
                <span>Sign in</span>
            </router-link>
            <router-link
                v-else
                :to="{ name: 'Profile' }"
            >
                <VueFeather type="user" size="26" class="icon"/>
                <br>
                <span>Profile</span>
            </router-link>
        </div>
    </div>
</template>


<script setup>
import {storeToRefs} from "pinia";
import { useAuthStore } from "@/store/auth.js";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>


<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    margin-bottom: 15px;
}
.nav-item a {
    display: flex;
    text-decoration: none;
    font-size: 18px;
    color: #666;
    text-transform: capitalize;
}
.nav-item:not(:first-child):not(:last-child) {
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    border-right: 2px solid rgba(0, 0, 0, 0.1);
    padding: 0px 6px;
}
.nav-item span {
    margin-left: 5px;
}
</style>
