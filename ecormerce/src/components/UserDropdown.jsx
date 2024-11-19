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
  const { id, role } = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      key: "1",
      label: (
        <Link to={"/user/" + id}>
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
        <Link
          to={"/ship"}
          className={`${role === "SHIPPER" ? "hidden" : "d-block"}`}
        >
          {role === "SHIPPER" && (
            <div>
              <CarOutlined />
              Ship
            </div>
          )}
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
