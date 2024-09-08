import Cart from "../cart/Cart";
import Catalog from "../catalog/Catalog";
import CatalogConf from "../catalog/CatalogConf";
import ColorConf from "../color/ColorConf";
import Home from "../home/Home";
import ProductItem from "../item/ProductItem";
import Product from "../product/Product";
import SizeConf from "../size/SizeConf";
import User from "../user/User";

const routes = [
  { path: "/", component: <Home />, linkName: "Home" },
  { path: "/products", component: <Product />, linkName: "Product" },
  { path: "/user", component: <User /> },
  { path: "/cart", component: <Cart /> },
  { path: "/catalog/:id", component: <Catalog />, linkName: "Catalog" },
  { path: "/product/item/:id", component: <ProductItem /> },
  { path: "/product/config/catalog", component: <CatalogConf /> },
  { path: "/product/config/color", component: <ColorConf /> },
  { path: "/product/config/size", component: <SizeConf /> },
];

export default routes;
