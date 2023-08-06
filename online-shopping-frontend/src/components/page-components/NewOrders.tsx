import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OrderDTO from "../../DTO/OrderDTO";
import { CanceledError } from "../../services/api-client";
import authGuardService from "../../services/auth-guard-service";
import orderService, { orderHelpService } from "../../services/order-service";
import Orders from "../Orders";

const NewOrders = () => {
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
        Swal.fire({
          icon: "success",
          title: "Your order has been cancelled.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div>
      <Orders orders={orders} cancelOrder={cancelOrder} ordersType="new" />
    </div>
  );
};

export default NewOrders;
