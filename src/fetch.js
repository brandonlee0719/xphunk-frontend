import axios from 'axios';

const BASE_URL = 'https://localhost:8000/';

export const GetMetaData = () => {
    axios.get(BASE_URL).then(response => {
        return response;
    }).catch(error => {
        console.log(`Error: ${error}`);
        return error;
    })
}