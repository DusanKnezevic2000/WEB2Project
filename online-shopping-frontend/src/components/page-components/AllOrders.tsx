import { useEffect, useState } from "react";
import OrderDTO from "../../DTO/OrderDTO";
import { CanceledError } from "../../services/api-client";
import orderService from "../../services/order-service";
import Orders from "./Orders";

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    const { request, cancel } = orderService.getAll<OrderDTO>();
    request
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return () => cancel;
      });
  }, []);

  return (
    <div>
      <Orders orders={orders} />
    </div>
  );
};

export default AllOrders;
