<template>
    <div id="auth">
        <input type="checkbox" id="chk" aria-hidden="true">
        <div class="signup">
            <Alert
                v-if="Object.keys(errors).length"
                :title="errors"
                type="warning"
            />
            <form>
                <label for="chk" aria-hidden="true">Register</label>
                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    required=""
                    v-model="registerForm.name"
                >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    v-model="registerForm.email"
                >
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    v-model="registerForm.password"
                >
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm password"
                    required=""
                    v-model="registerForm.password_confirmation"
                >
                <button class="btn-submit" @click.prevent="SubmitRegister()">Register</button>
            </form>
        </div>
        <div class="login">
            <form>
                <label for="chk" aria-hidden="true">Login</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    v-model="loginForm.email"
                >
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    v-model="loginForm.password"
                >
                <button class="btn-submit" @click.prevent="SubmitLogin()">Login</button>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import {storeToRefs} from "pinia";
import { useRouter } from 'vue-router';

import {useAuthStore} from '../store/auth.js';
import Alert from "@/components/generally/Alert.vue";

const authStore = useAuthStore();
const { handleRegister, handleLogin } = authStore;
const {isLoggedIn, errors, user, userToken} = storeToRefs(authStore);
const router = useRouter();


const registerForm = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});
const loginForm = ref({
    email: '',
    password: '',
});

const SubmitRegister = async () => {
    await handleRegister(registerForm.value)
    if (isLoggedIn.value) {
        await router.push({ name: 'CurrentWeather' });
    }
}
const SubmitLogin = async () => {
    await handleLogin(loginForm.value)
    if (isLoggedIn.value) {
        await router.push({ name: 'CurrentWeather' });
    }
}
</script>


<style scoped>
#auth {
    max-height: 420px;
    overflow: hidden;
}
#chk {
    display: none;
}
.signup {
    position: relative;
    width: 100%;
    height: 100%;
}
label {
    color: #573b8a;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
}
input {
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
}
.login {
    height: 2000px;
    background: #eee;
    border-radius: 70% / 10%;
    transform: translateY(10px);
    transition: .8s ease-in-out;
}
.login label {
    color: #573b8a;
    transform: scale(.6);
}
#chk:checked ~ .login {
    transform: translateY(-370px);
}
#chk:checked ~ .login label {
    transform: scale(1);
}
#chk:checked ~ .signup label {
    transform: scale(.6);
}
</style>
