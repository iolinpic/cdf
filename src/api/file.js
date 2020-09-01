import api from '../config/api'

let endpoints = {
    prefix: '/file/',
};
export default {
    upload: (data) => {
        return api.post(endpoints.prefix+'upload', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    },
    download(payload){
        return api.post(endpoints.prefix+'download',payload,{responseType: 'arraybuffer'})
    }

}
