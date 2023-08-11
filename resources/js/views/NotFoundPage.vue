<template>
    <div class="not-found-page">
        <h1>
            Error 404 not Found
        </h1>
        <router-link :to="{ name: 'CurrentWeather' }">Please go back to the current weather page</router-link>
    </div>
</template>


<style scoped>
.not-found-page h1, a {
    display: flex;
    justify-content: center;
    text-decoration: none;
}
</style>
