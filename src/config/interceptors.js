import store from '@/store'
import * as types from '@/store/mutation-types'
import remoteApp from "@/config/api";
export const setupAxios = function () {
    remoteApp.interceptors.request.use((config) => {
        const token = store.getters.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    remoteApp.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return new Promise(function () {
            let msg = {
                type: 'error',
                message: 'Ошибка! ',
            };
            if (error.response) {
                msg.message += error.response.data.message;
            } else if (error.request) {
                msg.message += error.request;
            } else {
                msg.message += error.message;
            }
            store.commit(types.UI_ALERT_SHOW, msg);
        });
    });
};
