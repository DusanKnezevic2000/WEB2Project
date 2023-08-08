import axios from "../services/custom-axios";
import apiClient from './api-client';

class VerificationService {

    constructor(){}

    backendApi = import.meta.env.VITE_BACKEND_USER_API;

    getAll() {
        const controller = new AbortController();
        const request = axios
          .get(import.meta.env.VITE_BACKEND_USER_VERIFICATIONS_API, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    approve(id: number) {
        return axios.put(import.meta.env.VITE_BACKEND_USER_APPROVE_API + "/" + id)
    }

    reject(id: number) {
        return axios.put(import.meta.env.VITE_BACKEND_USER_REJECT_API + "/" + id)
    }

}
    
const verificationService = new VerificationService()
    
export default verificationService;
