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
  { path: "/", component: <Home />, linkName: "Home", layout: "common" },
  {
    path: "/products",
    component: <Product />,
    linkName: "Product",
    layout: "admin",
  },
  { path: "/user/:id", component: <UserUpdateForm />, layout: "common" },
  { path: "/cart", component: <Cart />, layout: "common" },
  { path: "/ship", component: <ShipPage />, layout: "common" },
  { path: "/order/user/:id", component: <Order />, layout: "common" },
  { path: "/order/list", component: <ListOrders />, layout: "admin" },
  { path: "/order/info/:id", component: <OrderInfo />, layout: "common" },
  { path: "/catalog/:id", component: <Catalog />, linkName: "Catalog" },
  {
    path: "/product/detail/:id",
    component: <ProductDetail />,
    layout: "common",
  },
  { path: "/product/item/:id", component: <ProductItem />, layout: "common" },
  {
    path: "/product/config/catalog",
    component: <CatalogConf />,
    layout: "admin",
  },
  { path: "/product/config/color", component: <ColorConf />, layout: "admin" },
  { path: "/product/config/size", component: <SizeConf />, layout: "admin" },
  { path: "/user/kanban", component: <KanbanBoard />, layout: "admin" },
];

export default routes;
