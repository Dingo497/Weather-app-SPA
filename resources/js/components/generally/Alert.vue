<template>
    <div
        class="alert"
        v-if="props.title"
    >
        <VueFeather
            size="25"
            class="icon"
            type="alert-circle"
            :stroke="
                type === 'error' ? 'red' : type === 'warning' ? 'orange' : 'green'
            "
        />
        <span
            :class="
                type === 'error' ? 'text-red' : type === 'warning' ? 'text-orange' : 'text-green'
            "
        >
            <span v-for="error in errors">
                {{ error }} <br>
            </span>
        </span>
        <VueFeather
            size="25"
            class="icon"
            type="alert-circle"
            :stroke="
                type === 'error' ? 'red' : type === 'warning' ? 'orange' : 'green'
            "
        />
    </div>
</template>


<script setup>
import { computed } from "vue";

const props = defineProps({
    title: [String, Object],
    type: String,
});

// Ak mi na vstupe pride objekt (cize viac chyb), tak ho spracujem a vypisem
const errors = computed(() => {
    let errorsArray = [];
    if (typeof props.title === "object") {
        Object.keys(props.title).forEach(key => {
            errorsArray.push(props.title[key][0]);
        });
    } else if (typeof props.type === 'string') {
        errorsArray.push(props.title);
    }
    return errorsArray;
});

</script>


<style scoped>
.alert {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 14px;
}
.alert i {
    align-items: center;
    display: flex;
}
.alert .text-red {
    color: red;
}
.alert .text-orange {
    color: orange;
}
.alert .text-green {
    color: green;
}
</style>
