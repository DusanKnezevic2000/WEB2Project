import axios from "axios";
import create from "./http-service";

export default create("/order");

class OrderHelpService {

    constructor(){}

    backendApi = 'http://localhost:5000/api/order';

    getCustomerOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(this.backendApi + "/customer/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    getSalesmanOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(this.backendApi + "/salesman/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    getCustomerNewOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(this.backendApi + "/customerNew/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    getSalesmanNewOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(this.backendApi + "/salesmanNew/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }
}
    
const orderHelpService = new OrderHelpService()
    
export { orderHelpService };