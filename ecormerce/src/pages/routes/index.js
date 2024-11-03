import Cart from "../cart/Cart";
import Catalog from "../catalog/Catalog";
import CatalogConf from "../catalog/CatalogConf";
import ColorConf from "../color/ColorConf";
import Home from "../home/Home";
import ProductItem from "../item/ProductItem";
import ListOrders from "../order/ListOrders";
import Order from "../order/Order";
import OrderInfo from "../order/OrderInfo";
import Product from "../product/Product";
import ProductDetail from "../product/ProductDetail";
import ShipPage from "../Shipments/ShipPage";
import SizeConf from "../size/SizeConf";
import KanbanBoard from "../user/KanbanBoard";
import UserUpdateForm from "../user/UserUpdateForm";

const routes = [
  { path: "/", component: <Home />, linkName: "Home" },
  { path: "/products", component: <Product />, linkName: "Product" },
  { path: "/user/:id", component: <UserUpdateForm /> },
  { path: "/cart", component: <Cart /> },
  { path: "/ship", component: <ShipPage /> },
  { path: "/order/user/:id", component: <Order /> },
  { path: "/order/list", component: <ListOrders /> },
  { path: "/order/info/:id", component: <OrderInfo /> },
  { path: "/catalog/:id", component: <Catalog />, linkName: "Catalog" },
  { path: "/product/item/:id", component: <ProductItem /> },
  { path: "/product/detail/:id", component: <ProductDetail /> },
  { path: "/product/config/catalog", component: <CatalogConf /> },
  { path: "/product/config/color", component: <ColorConf /> },
  { path: "/product/config/size", component: <SizeConf /> },
  { path: "/user/kanban", component: <KanbanBoard /> },
];

export default routes;
