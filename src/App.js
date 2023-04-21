import "./App.css";
import ListShoes from "./components/shoes/List";
import CreateOrder from "./components/orders/Create";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Above Shoes Listing
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/orders"} className="nav-link">
              Create Order
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ListShoes />} />
          <Route path="/shoes" element={<ListShoes />} />
          <Route path="/orders" element={<CreateOrder />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
