import React, { useState } from "react";
import Cart from "./components/Cart";
import Layout from "./components/Layout";
import Message from "./components/Message";
import RegistrationForm from "./components/RegistrationForm";
import AddArticle from "./components/page-components/AddArticle";
import AllOrders from "./components/page-components/AllOrders";
import Login from "./components/page-components/Login";
import PreviousOrders from "./components/page-components/PreviousOrders";
import NewOrder from "./components/page-components/NewOrder";
import NewOrders from "./components/page-components/NewOrders";
import Profile from "./components/page-components/Profile";
import Verification from "./components/page-components/Verification";
import Alert from "./components/Alert";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const [expenses, setExpenses] = useState([
    { id: 1, description: "desc1", amount: 10, category: "categ1" },
    { id: 2, description: "desc2", amount: 20, category: "categ2" },
    { id: 3, description: "desc3", amount: 30, category: "categ3" },
    { id: 4, description: "desc4", amount: 40, category: "categ4" },
  ]);
  let items = ["New York", "Chicago", "London"];
  const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const deleteItem = (item: string) => {
    setCartItems(cartItems.filter((i) => i !== item));
  };

  const onClear = () => {
    console.log(cartItems);
  };

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const createUser = () => {
    const newUser = { id: 0, name: "Mosh" };
    const originalUsers = [...users];
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then((response) => setUsers([response.data, ...users]))
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    userService
      .update(user)
      .then((response) => setUsers([response.data, ...users]))
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RegistrationForm />} />
            <Route path="login" element={<Login />} />
            <Route path="addArticle" element={<AddArticle />} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="newOrder" element={<NewOrder />} />
            <Route path="newOrders" element={<NewOrders />} />
            <Route path="previousOrders" element={<PreviousOrders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="verification" element={<Verification />} />
            <Route path="*" element={<Message />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
