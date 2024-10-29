import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Slider,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import ProductKaban from "../../components/ProductKaban";
import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../redux/colorAtion";
import { getSizes } from "../../redux/sizeAtion";
import { getCatalogs } from "../../redux/catalogAtion";
import { getProducts } from "../../redux/productAction";

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
  {
    key: "4",
    label: <Link to="/order/list">Đơn hàng</Link>,
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
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { sizes } = useSelector((state) => state.size);
  const { colors } = useSelector((state) => state.color);
  const { catalog } = useSelector((state) => state.catalog);
  const { products } = useSelector((state) => state.product);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

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
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("gender", values.gender);
    formData.append("quantity", values.quantity);
    formData.append("category", values.category);
    values.colors.forEach((colorId) => formData.append("colors", colorId));
    values.sizes.forEach((sizeId) => formData.append("sizes", sizeId));
    fileList.forEach((file) => formData.append("images", file.originFileObj));

    try {
      await BaseApi.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    dispatch(getSizes());
    dispatch(getCatalogs());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container m-auto">
      <div className="flex gap-3 mt-3">
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
          <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Giá" name="price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value={true}>Nam</Select.Option>
              <Select.Option value={false}>Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Loại" name="category" rules={[{ required: true }]}>
            <Select>
              {catalog.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Màu sắc" name="colors" rules={[{ required: true }]}>
            <Select mode="multiple">
              {colors.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Kích cỡ" name="sizes" rules={[{ required: true }]}>
            <Select mode="multiple">
              {sizes.map((size) => (
                <Select.Option key={size.id} value={size.id}>
                  {size.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Ảnh" name="images" rules={[{ required: true }]}>
            <Upload
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
              multiple
            >
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
        {products.map((p) => {
          return <ProductKaban item={p} key={p.id} />;
        })}
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
