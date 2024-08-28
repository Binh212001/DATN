import Cart from "../cart/Cart";
import Catalog from "../catalog/Catalog";
import Home from "../home/Home";
import ProductItem from "../item/ProductItem";
import Product from "../product/Product";
import User from "../user/User";

const routes = [
  { path: "/", component: <Home />, linkName: "Home" },
  { path: "/products", component: <Product />, linkName: "Product" },
  { path: "/user", component: <User /> },
  { path: "/cart", component: <Cart /> },
  { path: "/catalog/:id", component: <Catalog />, linkName: "Catalog" },
  { path: "/product/item/:id", component: <ProductItem /> },
];

export default routes;
