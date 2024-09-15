import { Button, Dropdown, Form, Input, Modal, Pagination, Row, Select, Slider, Upload } from "antd";
import React, { useEffect, useState } from "react";
import ProductKaban from "../../components/ProductKaban";
import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../redux/colorAtion";
import { getSizes } from "../../redux/sizeAtion";
import { getCatalogs } from "../../redux/catalogAtion";

const items = [
  {
    key: "1",
    label: <Link to="/product/config/catalog">Danh mục</Link>,
  },
  {
    key: "2",
    label: <Link to="/product/config/size">Kích cỡ</Link>,
  },
  {
    key: "3",
    label: <Link to="/product/config/color">Màu sắc</Link>,
  },
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onChange = (value) => {
  console.log("onChange: ", value);
};

const onChangeComplete = (value) => {
  console.log("onChangeComplete: ", value);
};
function Product() {
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
    const { sizes } = useSelector((state) => state.size);
      const { colors } = useSelector((state) => state.color);
  const { catalog } = useSelector((state) => state.catalog);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

   const handleFinish = async (values) => {
    console.log("🚀 ~ handleFinish ~ values:", values)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    values.colors.forEach((colorId) => formData.append("colors", colorId));
    values.sizes.forEach((sizeId) => formData.append("sizes", sizeId));
    values.images.fileList.forEach((file) => formData.append("images", file.originFileObj));
    
    try {
      await BaseApi.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

    useEffect(() => {
    dispatch(getColors());
    dispatch(getSizes())
    dispatch(getCatalogs())
  }, [dispatch]);
   
  return (
    <div className="container m-auto">
      <div className="flex gap-3">
        <Button onClick={showModal}>Thêm sản phẩm</Button>
        <Dropdown
          menu={{
            items,
          }}
        >
          <SettingOutlined />
        </Dropdown>
      </div>
      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select>
              {
                catalog.map((catalog) => (
                  <Select.Option key={catalog.id} value={catalog.id}>
                    {catalog.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="Colors" name="colors" rules={[{ required: true }]}>
            <Select mode="multiple">
        {
          colors.map((color) => (
                  <Select.Option key={color.id} value={color.id}>
                    {color.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="Colors" name="colors" rules={[{ required: true }]}>
            <Select mode="multiple">
              {
        }
            </Select>
          </Form.Item>
          <Form.Item label="Sizes" name="sizes" rules={[{ required: true }]}>
            <Select mode="multiple">
              {
                sizes.map((size) => (
                  <Select.Option key={size.id} value={size.id}>
                    {size.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="Images" name="images" rules={[{ required: true }]}>
            <Upload multiple>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <h4 className="text-center text-main font-bold text-xl m-3">Sản phẩm</h4>
      <div className="filter flex justify-between items-center mb-3">
        <div className="flex  items-center  gap-3">
          <div>
            <span>Danh mục: </span>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
              ]}
            />
          </div>
          <div>
            <span>Sắp xếp: </span>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
              ]}
            />
          </div>
          <div className="flex  items-center gap-3 ">
            <span>Giá: </span>
            <Slider
              className="w-[210px]"
              defaultValue={0}
              step={50000}
              max={5000000}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
          </div>
        </div>
        <Button>Lọc</Button>
      </div>
      <Row gutter={[16, 16]} className="overflow-hidden">
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
      </Row>
      <br />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
    </div>
  );
}

export default Product;
