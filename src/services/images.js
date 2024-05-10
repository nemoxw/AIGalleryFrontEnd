import axios from 'axios';

class MovieDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images?page=${page}`);
    }

    find(query, by='title', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/images?${by}=${query}&page=${page}`
        );
    }

    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/ratings`);
    }

    getMovieById(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/id/${id}`);
    }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/review`, data);
    }

    UpdateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/review`, data);
    }

    DeleteReview(dataForDelete) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/review`, { data: dataForDelete });
    }





}

/* eslint import/no-anonymous-default-export: [2,{"allowNew": true}] */
export default new MovieDataService();