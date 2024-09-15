import { ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { getColors } from "../../redux/colorAtion";
import { getSizes } from "../../redux/sizeAtion";
import { getCatalogs } from "../../redux/catalogAtion";
import { useDispatch, useSelector } from "react-redux";
import { BaseApi } from "../../apis/BaseApi";

function ProductDetail() {
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { sizes } = useSelector((state) => state.size);
  const { colors } = useSelector((state) => state.color);
  const { catalog } = useSelector((state) => state.catalog);

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    values.colors.forEach((colorId) => formData.append("colors", colorId));
    values.sizes.forEach((sizeId) => formData.append("sizes", sizeId));
    values.images.fileList.forEach((file) =>
      formData.append("images", file.originFileObj)
    );

    try {
      await BaseApi.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  useEffect(() => {
    dispatch(getColors());
    dispatch(getSizes());
    dispatch(getCatalogs());
  }, [dispatch]);
  return (
    <div className="container m-auto mt-5">
      <Row>
        <Col sx={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div>
            <img src="" alt="" />
          </div>
          <div>Img</div>
        </Col>
        <Col sx={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <div>
              {update ? (
                <div>
                  <Button type="primary" htmlType="submit" className="mr-3">
                    Lưu
                  </Button>
                  <ReloadOutlined onClick={() => setUpdate(false)} />
                </div>
              ) : (
                <Button onClick={() => setUpdate(true)}>Cập nhật</Button>
              )}
            </div>
            <Form.Item
              label="Product Name"
              name="id"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input disabled={!update} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input.TextArea disabled={!update} />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <Input disabled={!update} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true }]}
            >
              <Select disabled={!update}>
                {catalog.map((catalog) => (
                  <Select.Option key={catalog.id} value={catalog.id}>
                    {catalog.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Colors"
              name="colors"
              rules={[{ required: true }]}
            >
              <Select disabled={!update} mode="multiple">
                {colors.map((color) => (
                  <Select.Option key={color.id} value={color.id}>
                    {color.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Colors"
              name="colors"
              rules={[{ required: true }]}
            >
              <Select disabled={!update} mode="multiple">
                {}
              </Select>
            </Form.Item>
            <Form.Item label="Sizes" name="sizes" rules={[{ required: true }]}>
              <Select disabled={!update} mode="multiple">
                {sizes.map((size) => (
                  <Select.Option key={size.id} value={size.id}>
                    {size.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {update && (
              <Form.Item
                label="Images"
                name="images"
                rules={[{ required: true }]}
              >
                <Upload disabled={!update} multiple>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
