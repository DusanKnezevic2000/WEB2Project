import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDTO from "../../DTO/OrderDTO";
import { CanceledError } from "../../services/api-client";
import authGuardService from "../../services/auth-guard-service";
import { orderHelpService } from "../../services/order-service";
import Orders from "../Orders";

const PreviousOrders = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!authGuardService.isUserLoggedIn()) navigate("/login");
    if (
      (!authGuardService.isSalesman() && !authGuardService.isCustomer()) ||
      !authGuardService.isApproved()
    )
      navigate("/profile");
    if (localStorage.getItem("role") === "Customer") {
      const { request, cancel } = orderHelpService.getCustomerOrders(
        parseInt(localStorage.getItem("id"))
      );
      request
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return () => cancel;
        });
    } else if (localStorage.getItem("role") === "Salesman") {
      const { request, cancel } = orderHelpService.getSalesmanOrders(
        parseInt(localStorage.getItem("id"))
      );
      request
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return () => cancel;
        });
    }
  }, []);

  return (
    <div>
      <Orders orders={orders} ordersType="previous" />
    </div>
  );
};

export default PreviousOrders;
