import axios from 'axios';
import apiClient from './api-client';

class VerificationService {

    constructor(){}

    backendApi = 'http://localhost:5000/api/user';

    getAll() {
        const controller = new AbortController();
        const request = axios
          .get(this.backendApi + "/verifications", {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    approve(id: number) {
        return axios.put(this.backendApi + "/approve/" + id)
    }

    reject(id: number) {
        return axios.put(this.backendApi + "/reject/" + id)
    }

}
    
const verificationService = new VerificationService()
    
export default verificationService;
