//https://api.themoviedb.org/3/movie/now_playing?api_key=403bbbb76def6431060b7afed07db398&language=pt-BR

//base da URL
//https://api.themoviedb.org/3/

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;