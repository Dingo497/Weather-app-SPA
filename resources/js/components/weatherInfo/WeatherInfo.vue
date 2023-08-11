<template>
    <div
        class="weather-item"
        :title="props.title"
        v-if="props.value"
    >
        <div class="icon-value">
            <VueFeather :type="props.iconType" size="30" class="icon"/>
            <span class="value">{{ props.value }}</span>
        </div>
        <span class="name">{{ props.title }}</span>
    </div>
</template>


<script setup>
const props = defineProps({
    title: String,
    value: String,
    iconType: String
});
</script>


<style scoped>
.weather-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #666;
}
.weather-item .icon-value {
    display: flex;
    align-items: center;
}
.weather-item .value {
    margin-left: 5px;
    font-weight: 500;
}
.weather-item .name {
    margin-top: 5px;
}
</style>
