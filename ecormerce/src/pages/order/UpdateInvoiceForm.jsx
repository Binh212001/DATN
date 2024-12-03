import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, Form, Select } from "antd";
import { BaseApi } from "../../apis/BaseApi";
import vnApi from "../../apis/vnApi";
import { openNotification } from "../catalog/CatalogConf";

const UpdateInvoiceForm = () => {
  const { id } = useParams(); // Lấy ID hóa đơn từ route
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    // Lấy chi tiết hóa đơn và danh sách tỉnh thành
    const fetchInvoiceDetails = async () => {
      try {
        const provinceData = await vnApi.getLocation();
        setProvinces(provinceData);
        const response = await BaseApi.get(`/api/invoices/invoice?id=${id}`);
        setInvoiceDetails(response.data);
        form.setFieldsValue(response.data); // Điền thông tin hóa đơn vào form
        const districtData = provinceData.find(
          (d) => d.code === Number(response.data.province)
        );
        setDistricts(districtData.districts);
        setSelectedProvince(response.data.province); // Đặt tỉnh thành đã chọn
      } catch (error) {
        openNotification("Lỗi khi lấy thông tin hóa đơn:", error);
      }
    };

    fetchInvoiceDetails();
  }, [id, form]);

  // Xử lý thay đổi tỉnh thành để cập nhật danh sách quận huyện
  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    const province = provinces.find((p) => p.code === value);
    setDistricts(province ? province.districts : []);
    form.setFieldsValue({ district: undefined }); // Xóa quận khi thay đổi tỉnh
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await BaseApi.put(`/api/invoices/${id}`, values);
      if (response.data) {
        openNotification("Cập nhật hóa đơn thành công!");
        navigate("/order/list");
      } else {
        openNotification("Cập nhật hóa đơn thất bại!");
        form.resetFields();
      }
    } catch (error) {
      openNotification(
        "Lỗi khi cập nhật hóa đơn:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Cập nhật hóa đơn</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="bg-white p-6 shadow rounded-md"
      >
        <Form.Item
          name="receiver"
          label="Tên người nhận"
          rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
        >
          <Input placeholder="Tên người nhận" />
        </Form.Item>

        <Form.Item
          name="province"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
        >
          <Select
            placeholder="Chọn tỉnh/thành phố"
            onChange={handleProvinceChange}
            value={selectedProvince}
          >
            {provinces.map((province) => (
              <Select.Option key={province.code} value={province.code}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="provinceName"
          className="hidden"
          label="Tên tỉnh/thành phố"
        >
          <Input placeholder="Tên tỉnh/thành phố" disabled />
        </Form.Item>

        <Form.Item
          name="district"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
        >
          <Select placeholder="Chọn quận/huyện">
            {districts.map((district) => (
              <Select.Option key={district.code} value={district.code}>
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="hidden"
          name="districtName"
          label="Tên quận/huyện"
        >
          <Input placeholder="Tên quận/huyện" disabled />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật hóa đơn
          </Button>
          <Button
            type="default"
            className="ml-4"
            onClick={() => navigate("/invoices")}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateInvoiceForm;
