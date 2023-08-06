import Layout from "./components/Layout";
import Message from "./components/Message";
import AddArticle from "./components/page-components/AddArticle";
import AllOrders from "./components/page-components/AllOrders";
import Login from "./components/page-components/Login";
import PreviousOrders from "./components/page-components/PreviousOrders";
import NewOrder from "./components/page-components/NewOrder";
import NewOrders from "./components/page-components/NewOrders";
import Profile from "./components/page-components/Profile";
import Registration from "./components/page-components/Registration";
import Verification from "./components/page-components/Verification";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Registration />} />
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
