import axios from 'axios'
import { API_URL as apiUrl } from '../consts/consts';
import { storageGet } from '../helpers/storageHelpers';

export const getAxios = async(endUrl) => {
    return await axios.get(`${apiUrl}${endUrl}`,{headers:{ Authorization: `Bearer ${storageGet('token')}` }});
};

export const loginPostAxios = async(endUrl, postData) => {
    return await axios.post(`${apiUrl}${endUrl}`,postData);
}

export const postAxios = async(endUrl, postData) => {
    return await axios.post(`${apiUrl}${endUrl}`,postData,{headers:{ Authorization: `Bearer ${storageGet('token')}` }});
};