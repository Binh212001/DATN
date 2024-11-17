import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx"; // eslint-disable-line
import Product from "./pages/product/Product.jsx"; // eslint-disable-line
import Layout from "./common/layout/Layout.jsx";
import routes from "./pages/routes/index.js";
import AdminLayout from "./common/layout/admin/AdminLayout.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => {
            let LAYOUT = Layout;
            if (route.layout === "admin") LAYOUT = AdminLayout; // eslint-disable-line
            return (
              <Route
                key={index}
                path={route.path}
                element={<LAYOUT>{route.component}</LAYOUT>}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
