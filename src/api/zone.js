import api from '../config/api'

let endpoints = {
    prefix: '/zone/',
    // generate: '/zone/generate/'
};
export default {
    all: () => {
        return api.get(endpoints.prefix);
    },
    one: (id) => {
        return api.get(endpoints.prefix + id)
    },
    store: (payload) => {
        return api.post(endpoints.prefix, payload)
    },
    update: (id,payload) => {
        return api.put(endpoints.prefix+id, payload)
    },
    delete: (id) => {
        return api.delete(endpoints.prefix+id)
    },
    // generate: () => {
    //     return api.get(endpoints.generate,{responseType: 'arraybuffer'})
    // },

}
