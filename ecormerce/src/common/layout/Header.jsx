import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";

import { Link, NavLink } from "react-router-dom";
import routes from "../../pages/routes";
import "./header.css";
import UserDropdown from "../../components/UserDropdown";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, Modal } from "antd";
import LoginForm from "../../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogs } from "../../redux/catalogAtion";

function Header() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { catalog } = useSelector((state) => state.catalog);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getCatalogs());
  }, [dispatch]);

  return (
    <div
      className="border border-spacing-1 border-gray-300 border-solid px-3
      m-auto"
    >
      <nav className="nav flex justify-between items-center">
        <div className="flex">
          <div className="logo xs:hidden sm:hidden md:block ">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="logo xs:block sm:block md:hidden ">
            <button className="p-3 font-bold" onClick={showDrawer}>
              <MenuOutlined />
            </button>
            <Drawer
              placement="left"
              onClose={onClose}
              open={open}
              closeIcon={null}
            >
              <div className="hover:bg-slate-300 h-auto">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "block active p-2" : "block p-2"
                  }
                  to="/"
                >
                  HOME
                </NavLink>
              </div>
            </Drawer>
          </div>

          <ul className=" justify-start items-center xs:hidden sm:hidden md:flex">
            {catalog.map((c, index) => {
              if (index < 7) {
                return (
                  <li
                    key={index}
                    style={{
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to={`/catalog/${c.id}`}
                      style={{
                        display: "inline-block",
                        height: "inherit",
                        padding: "9px 10px",
                      }}
                    >
                      {c.name}
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div className="flex ">
          <div className="flex mr-4">
            <Input placeholder="Tìm kiếm" className="block mr-2" />
            <SearchOutlined />
          </div>
          <Button className="mr-4" onClick={showModal}>
            Login
          </Button>
          <UserDropdown />
        </div>
      </nav>
      <Modal
        title="Đang nhập"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm />
      </Modal>
    </div>
  );
}

export default Header;
