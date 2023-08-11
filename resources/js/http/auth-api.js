import {backendAPI} from './main-api.js';

export const register = (user) => backendAPI.post('register', user);

export const login = (user) => backendAPI.post('login', user);

export const logout = (token) => backendAPI.post('logout', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getUser = (token) => backendAPI.get('user', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
