import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDTO from "../../DTO/OrderDTO";
import { CanceledError } from "../../services/api-client";
import authGuardService from "../../services/auth-guard-service";
import orderService from "../../services/order-service";
import Orders from "../Orders";

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!authGuardService.isUserLoggedIn()) navigate("/login");
    if (!authGuardService.isAdmin()) navigate("/profile");
    const { request, cancel } = orderService.getAll<OrderDTO>();
    request
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return () => cancel;
      });
  }, []);

  return (
    <div>
      <Orders orders={orders} ordersType="all" />
    </div>
  );
};

export default AllOrders;
