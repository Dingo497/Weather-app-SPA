<template>
    <div>
        <button class="btn-submit mt-10" @click="SubmitLogout()">
            <span>Log out</span>
        </button>

        <div id="profile">
            <div class="change-user-data">
                <Alert
                    v-if="Object.keys(errors).length"
                    :title="errors"
                    type="warning"
                />
                <label class="profile-title">Change Profile</label>
                <form>
                    <div class="form-section">
                        <label class="form-label">Location</label>
                        <select
                            name="location"
                            class="form-input form-input-select"
                            v-model="user.location"
                        >
                            <option value="EN">EN</option>
                            <option value="US">US</option>

                        </select>
                    </div>
                    <div class="form-section">
                        <label class="form-label">Default location</label>
                        <input
                            type="text"
                            name="homeLocationName"
                            class="form-input form-input-text"
                            placeholder="Enter default search location"
                            v-model="user.homeLocationName"
                        >
                    </div>
                    <button class="btn-submit" @click.prevent="SubmitEdit()">Change Profile</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import Alert from '../components/generally/Alert.vue';

import { storeToRefs } from "pinia";
import { useAuthStore } from '../store/auth.js';
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { isLoggedIn, errors, user } = storeToRefs(authStore);
const { handleLogout, handleEditDefaultValues } = authStore;
const router = useRouter();

const SubmitLogout = async () => {
    await handleLogout();
    if (!isLoggedIn.value) {
        await router.push({ name: 'CurrentWeather' });
    }
}

const SubmitEdit = async () => {
    await handleEditDefaultValues();
}
</script>


<style scoped>
#profile {
    max-height: 420px;
    margin: 40px 0px;
}
.change-user-data {
    position: relative;
    width: 100%;
    height: 100%;
}
.profile-title {
    color: #573b8a;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
}
.form-section {
    display: flex;
    align-items: center;
}
.form-label {
    max-width: 20%;
}
.form-input {
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
}
.form-input-text {
    width: 60%;
    height: 20px;
}
.form-input-select {
    width: 67%;
    height: 40px;
}
</style>
