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
      <button>
        <CarOutlined />
        Ship
      </button>
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
      <button>
        <LogoutOutlined /> Log out
      </button>
    ),
  },
];
function UserDropdown() {
  return (
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
  );
}

export default UserDropdown;
