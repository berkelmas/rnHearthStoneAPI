import {axiosInstance} from './axiosInstance';

export const getAllCards = () => axiosInstance.get('cards');
export const searchCards = (name) => axiosInstance.get(`cards/${name}`);
