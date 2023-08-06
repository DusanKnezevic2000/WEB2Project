import axios from "axios";
import create from "./http-service";

export default create(import.meta.env.VITE_BACKEND_ORDER_API);

class OrderHelpService {

    constructor(){}

    backendApi = import.meta.env.VITE_BACKEND_ORDER_API;

    getCustomerOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(import.meta.env.VITE_BACKEND_ORDER_CUSTOMER_API + "/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    getSalesmanOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(import.meta.env.VITE_BACKEND_ORDER_SALESMAN_API + "/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    getCustomerNewOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(import.meta.env.VITE_BACKEND_ORDER_CUSTOMER_NEW_API + "/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }

    getSalesmanNewOrders(id: number) {
        const controller = new AbortController();
        const request = axios
          .get(import.meta.env.VITE_BACKEND_ORDER_SALESMAN_NEW_API + "/" + id, {
            signal: controller.signal,
          })
          return {request, cancel: () => controller.abort()}
    }
}
    
const orderHelpService = new OrderHelpService()
    
export { orderHelpService };