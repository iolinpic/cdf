import axios from 'axios'
const remoteApp = axios.create({
    baseURL:'/api',
    headers:{
        'X-Requested-With':'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
    }
});
export default remoteApp
