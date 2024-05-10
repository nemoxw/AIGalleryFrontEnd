import axios from 'axios';

class UploadDataService {
    uploadImage(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/images/upload`, data);
    }
}

export default new UploadDataService();