import { Button, Form, Input } from "antd";
import React, { useState } from "react";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function LoginForm() {
  const [type, setType] = useState(true);

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
          name="name"
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
