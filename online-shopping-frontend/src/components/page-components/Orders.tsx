import OrderDTO from "../../DTO/OrderDTO";
import Articles from "../Articles";

interface Props {
  orders: OrderDTO[];
  cancelOrder: (id: number) => void;
}

const Orders = ({ orders, cancelOrder }: Props) => {
  const isCancellable = (date: string) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 1);
    if (new Date() < newDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="container-fluid text-center">
        <br />
        <div className="row">
          <div className="col-sm-3">
            <div className="container-fluid">
              <h3>Orders</h3>
              <hr />
              <div
                id="list-example"
                className="list-group"
                style={{ overflowY: "scroll", height: "750px" }}
              >
                {orders.map((order) => (
                  <a
                    key={order.id}
                    className="list-group-item list-group-item-action"
                    href={"#list-item-" + order.id}
                  >
                    <p>
                      Customer: {order.customer.name} -{" "}
                      {order.customer.username}
                    </p>
                    <p>
                      Creation time: {order.startTime} - Delivery time:{" "}
                      {order.endTime}
                    </p>
                    <p>
                      Address: {order.address} {" - Price: $"}
                      {order.price}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-9 text-center">
            <h3>Order Articles</h3>
            <hr />
            <div
              data-bs-spy="scroll"
              data-bs-target="#list-example"
              data-bs-smooth-scroll="true"
              className="overflow-auto"
              style={{ overflowY: "scroll", height: "750px" }}
            >
              {orders.map((order) => (
                <div key={order.id}>
                  <h4 id={"list-item-" + order.id}>
                    <p>
                      Customer: {order.customer.name} -{" "}
                      {order.customer.username}
                    </p>
                    <p>
                      Creation time: {order.startTime} - Delivery time:{" "}
                      {order.endTime}
                    </p>
                    <p>
                      Address: {order.address} {" - Price: $"}
                      {order.price}
                    </p>
                    {order.status}
                    {isCancellable(order.startTime) && (
                      <p>
                        <button
                          className="btn btn-lg btn-danger"
                          style={{ marginTop: "2%" }}
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      </p>
                    )}
                  </h4>
                  <Articles articles={order.articles} articleButtons="none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
