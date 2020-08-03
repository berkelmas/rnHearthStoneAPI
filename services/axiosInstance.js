import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    'x-rapidapi-key': '8564d6bd33msh47c3e5603a707bfp1d5be8jsn382c0a4248d7',
  },
});
