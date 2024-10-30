import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch, Select, Upload, message } from "antd";
import vnApi from "../../apis/vnApi";
import { UploadOutlined } from "@ant-design/icons";

const UserUpdateForm = () => {
  // Initial data for user
  const [user, setUser] = useState({
    id: 1,
    username: "admin",
    password: "$2a$10$Ox8dSEk260HKsziVyCBWJeCv4nOfauEOf7722PdGf.cUrbji59ULm",
    fullName: "Phạm Ngọc Bình",
    phone: null,
    district: null,
    province: null,
    addressDetail: null,
    avatar: null,
    role: "USER",
    active: false,
  });

  const [province, setprovince] = useState([]);
  const [district, setDistrict] = useState([]);

  // Fetch data from Vietnam province API
  useEffect(() => {
    const fetchData = async () => {
      const province = await vnApi.getLocation();
      setprovince(province);
    };
    fetchData();
  }, []);
  const provinceChange = (code) => {
    const data = province.find((p) => {
      return p.code === code;
    });
    setDistrict(data.districts);
  };

  const handleUpdate = (values) => {
    console.log("🚀 ~ handleUpdate ~ values:", values);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Handle uploaded file here, e.g., update user avatar state
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Form
      initialValues={user}
      onFinish={handleUpdate}
      layout="vertical"
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Form.Item label="Username" name="username">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Full Name" name="fullName">
        <Input />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>

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

      <Form.Item label="Address Detail" name="addressDetail">
        <Input />
      </Form.Item>

      <Form.Item label="Role" name="role">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Avatar" name="avatar">
        <Upload
          name="avatar"
          accept="image/*"
          showUploadList={true}
          onChange={handleAvatarChange}
          beforeUpload={() => false}
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>Upload Avatar</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Active Status" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserUpdateForm;
