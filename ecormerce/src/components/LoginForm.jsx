import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { BaseApi } from "../apis/BaseApi";
import { openNotification } from "../pages/catalog/CatalogConf";

function LoginForm({ setIsModalOpen }) {
  const [type, setType] = useState(true);
  const onFinish = async (data) => {
    try {
      if (type) {
        // Sign in with email and password
        const res = await BaseApi.post(`/api/user/login`, data);
        if (res.token) {
          localStorage.setItem("accessToken", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("isLogin", true);
        }
        openNotification("Đăng nhập thành công");
        setIsModalOpen(false);
        window.location.reload();
      } else {
        const res = await BaseApi.post(`/api/user/register`, data);
        if (res.token) {
          localStorage.setItem("accessToken", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("isLogin", true);
        }
        openNotification("Đăng ký thành công");
        setIsModalOpen(false);
      }
    } catch (error) {
      openNotification(error.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tài khoản"
        name="username"
        rules={[
          {
            required: true,
            message: "Nhập tài khoản",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {!type && (
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Nhập họ và tên",
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Nhập mật khẩu",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {!type && (
        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp."));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      )}

      {type ? (
        <div className="flex justify-around  items-center ">
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <Button
            type="primary"
            danger
            htmlType="button"
            onClick={() => setType(false)}
          >
            Đăng ký
          </Button>
        </div>
      ) : (
        <div className="flex justify-around  items-center ">
          <Button type="primary" danger htmlType="submit">
            Đăng ký
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setType(true)}
          >
            Đăng nhập
          </Button>
        </div>
      )}
    </Form>
  );
}
export default LoginForm;
