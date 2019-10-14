import api from '../config/api'

let endpoints = {
    conditions: '/conditions/',
    generate: '/conditions/generate/'
};
export default {
    all: () => {
        return api.get(endpoints.conditions);
    },
    one: (id) => {
        return api.get(endpoints.conditions + id)
    },
    store: (payload) => {
        return api.post(endpoints.conditions, payload)
    },
    update: (id,payload) => {
        return api.put(endpoints.conditions+id, payload)
    },
    delete: (id) => {
        return api.delete(endpoints.conditions+id)
    },
    generate: () => {
        return api.get(endpoints.generate,{responseType: 'arraybuffer'})
    },

}