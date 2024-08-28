import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx"; // eslint-disable-line
import Shipments from "./pages/Shipments/Shipments.jsx"; // eslint-disable-line
import Product from "./pages/product/Product.jsx"; // eslint-disable-line
import Layout from "./common/layout/Layout.jsx";
import routes from "./pages/routes/index.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Layout>{route.component}</Layout>}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
