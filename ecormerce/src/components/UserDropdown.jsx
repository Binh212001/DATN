import {
  CarOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React from "react";
import avatar from "../assets/images/default-avatar.png";
import { Link } from "react-router-dom";

function UserDropdown({ user }) {
  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("asscessToken");
    window.location.href = "/";
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to={"/user"}>
          <UserOutlined />
          Thông tin
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/cart"}>
          <ShoppingCartOutlined />
          Giỏ hàng
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to={"/ship"}>
          <CarOutlined />
          Ship
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link to={"/products"}>
          <HomeOutlined />
          Kho hàng
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link to={"/user/kanban"}>
          <UserOutlined />
          Người dùng
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <button onClick={() => logout()}>
          <LogoutOutlined /> Log out
        </button>
      ),
    },
  ];
  return (
    <div className="flex gap-2 items-center">
      <p>{user.fullname}</p>
      <Dropdown
        menu={{
          items,
        }}
      >
        <Space>
          <div>
            <img
              src={avatar}
              alt="User"
              height={30}
              width={30}
              style={{
                borderRadius: "4px",
              }}
            />
          </div>
        </Space>
      </Dropdown>
    </div>
  );
}

export default UserDropdown;
