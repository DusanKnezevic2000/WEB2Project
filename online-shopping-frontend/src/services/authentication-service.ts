import axios from 'axios';

class AuthenticationService {

    constructor(){}

    backendApi = import.meta.env.VITE_BACKEND_USER_API;

    login(data: any) {
        return axios.post(import.meta.env.VITE_BACKEND_USER_AUTHENTICATE_API, data)
    }

    googleLogin(data: any) {
        return axios.post(import.meta.env.VITE_BACKEND_USER_GOOGLE_API, data)
    }

}
    
const authService = new AuthenticationService()
    
export default authService;
