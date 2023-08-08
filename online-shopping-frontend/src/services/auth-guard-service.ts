
class AuthGuadService {

    constructor(){}

    isUserLoggedIn = () => {
        if (
          localStorage.getItem("id") !== null &&
          localStorage.getItem("username") !== null &&
          localStorage.getItem("role") !== null &&
          localStorage.getItem("token") !== null &&
          localStorage.getItem("status") !== null
        ) {
          return true;
        } else {
          return false;        }
    };
    
    isCustomer = () => {
        if (localStorage.getItem("role") == "Customer") {
          return true;
        } else {
          return false;
        }
    };
    
    isAdmin = () => {
        if (localStorage.getItem("role") == "Admin") {
          return true;
        } else {
          return false;
        }
    };
    
    isSalesman = () => {
        if (localStorage.getItem("role") == "Salesman") {
          return true;
        } else {
          return false;
        }
    };
    
    isApproved = () => {
        if (localStorage.getItem("status") == "Approved") {
          return true;
        } else {
          return false;
        }
    };

}
    
const authGuardService = new AuthGuadService()
    
export default authGuardService;