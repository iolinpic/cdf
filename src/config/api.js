import axios from 'axios'
const remoteApp = axios.create({
    // baseURL:host,
    headers:{
        'X-Requested-With':'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
    }
});
export default remoteApp
