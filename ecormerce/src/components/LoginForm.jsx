import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginForm = () => (
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

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <div className="flex justify-around  items-center ">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button type="primary" danger htmlType="button">
        Submit
      </Button>
    </div>
  </Form>
);
export default LoginForm;
