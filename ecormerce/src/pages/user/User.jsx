import { Button, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import avartar from "../../assets/images/default-avatar.png";
import vnApi from "../../apis/vnApi";

const onFinish = (values) => {
  console.log("🚀 ~ onFinish ~ data:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function User() {
  const [province, setprovince] = useState([]);
  const [district, setDistrict] = useState([]);

  const provinceChange = (code) => {
    const data = province.find((p) => {
      return p.code === code;
    });
    setDistrict(data.districts);
  };

  // Fetch data from Vietnam province API
  useEffect(() => {
    const fetchData = async () => {
      const province = await vnApi.getLocation();
      setprovince(province);
    };
    fetchData();
  }, []);

  return (
    <div className=" container mx-auto p-4  ">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Thông Tin Người Dùng
      </h1>
      {/* Form thông tin người dùng */}
      <Form
        className="w-full"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <img src={avartar} alt="avatar" className="mb-3" />
        <Form.Item name="avartar">
          <Input type="file" style={{ width: "200px" }} />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Họ và tên là bắt buộc.",
            },
          ]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item label="Số điện thoại " name="phone">
          <Input type="text" placeholder="Số điện thoại " />
        </Form.Item>

        <Form.Item label="Email " name="email">
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Row xs={24} sm={24} md={8}>
          <Form.Item label="Tỉnh" name="province">
            <Select
              style={{ width: "200px" }}
              onChange={(code) => provinceChange(code)}
            >
              {province.map((province) => (
                <Select.Option key={province.code} value={province.code}>
                  {province.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quận/Huyện" name="district">
            <Select style={{ width: "200px" }}>
              {district.map((district) => (
                <Select.Option key={district.code} value={district.code}>
                  {district.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Địa chỉ " name="address">
            <Input type="text" placeholder="Địa chỉ " />
          </Form.Item>
        </Row>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default User;
