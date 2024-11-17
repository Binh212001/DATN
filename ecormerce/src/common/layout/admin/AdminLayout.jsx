import { HomeFilled } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;
const items1 = [
  { key: "1", label: <Link to="">Trang chủ</Link> },
  { key: "2", label: <Link to="/products">Sản phẩm</Link> },
  { key: "3", label: <Link to="/order/list">Đơn hàng</Link> },
  { key: "4", label: <Link to="/user/kanban">Người dùng</Link> },
  { key: "5", label: <Link to="/product/config/catalog">Danh mục</Link> },
  { key: "6", label: <Link to="/product/config/color">Màu sắc</Link> },
  { key: "7", label: <Link to="/product/config/size">Kích cỡ</Link> },
];

const AdminLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <HomeFilled className="text-white" />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
