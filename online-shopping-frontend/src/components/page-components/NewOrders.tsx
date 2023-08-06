import { useEffect, useState } from "react";
import OrderDTO from "../../DTO/OrderDTO";
import { CanceledError } from "../../services/api-client";
import orderService, { orderHelpService } from "../../services/order-service";
import Orders from "./Orders";

const NewOrders = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    if (localStorage.getItem("role") === "Customer") {
      const { request, cancel } = orderHelpService.getCustomerNewOrders(
        parseInt(localStorage.getItem("id"))
      );
      request
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return () => cancel;
        });
    } else if (localStorage.getItem("role") === "Salesman") {
      const { request, cancel } = orderHelpService.getSalesmanNewOrders(
        parseInt(localStorage.getItem("id"))
      );
      request
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return () => cancel;
        });
    }
  }, []);

  const cancelOrder = (id: number) => {
    orderService
      .delete(id)
      .then((response) => {
        console.log(response.data);
        setOrders(orders.filter((order) => order.id !== id));
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div>
      <Orders orders={orders} cancelOrder={cancelOrder} />
    </div>
  );
};

export default NewOrders;
