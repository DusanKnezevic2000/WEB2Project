import axios from 'axios';

class AuthenticationService {

    constructor(){}

    backendApi = 'http://localhost:5000/api/user'

    login(data: any) {
        return axios.post(this.backendApi + "/authenticate", data)
    }

}
    
const authService = new AuthenticationService()
    
export default authService;
