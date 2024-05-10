import axios from 'axios';

class FavoritesDataService {

    UpdateFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/favorites`, data);
    }

    GetFavorites(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/favorites/${userId}`);
    }



}


export default new FavoritesDataService();