import React from "react";

interface Props {
  cartItems: string[];
  onClear: () => void;
  deleteItem: (item: string) => void;
}

const Cart = ({ cartItems, onClear, deleteItem }: Props) => {
  return (
    <>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item}>
            {item}{" "}
            <button
              onClick={() => deleteItem(item)}
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};

export default Cart;
