import {backendAPI} from './main-api.js';

export const editDefaultValues = (token, data) => backendAPI.post(
    'user-edit-default-values',
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);
