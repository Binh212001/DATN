import { ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { getColors } from "../../redux/colorAtion";
import { getSizes } from "../../redux/sizeAtion";
import { getCatalogs } from "../../redux/catalogAtion";
import { useDispatch, useSelector } from "react-redux";
import { BaseApi, BASEURL } from "../../apis/BaseApi";
import { useParams } from "react-router-dom";
import { openNotification } from "../catalog/CatalogConf";

function ProductDetail() {
  const [update, setUpdate] = useState(false);
  const [product, setProduct] = useState({});
  const [imgActive, setImgActive] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { sizes } = useSelector((state) => state.size);
  const { colors } = useSelector((state) => state.color);
  const { catalog } = useSelector((state) => state.catalog);
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("gender", values.gender);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("category", values.category);
    values.colors.forEach((colorId) => formData.append("colors", colorId));
    values.sizes.forEach((sizeId) => formData.append("sizes", sizeId));
    fileList.forEach((file) => formData.append("images", file.originFileObj));

    try {
      await BaseApi.put("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      openNotification("Cập nhật sản phẩm", "Cập nhật thành công.");
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  const handleStatus = async (id) => {
    BaseApi.put("/api/products/stop/" + id)
      .then(() => {
        openNotification(
          "Thay đổi trạng thái",
          "Thay đổi trạng thái thành công."
        );
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        openNotification("Thay đổi trạng thái", error.message);
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, status } = await BaseApi.get("/api/products/" + id);
        setImgActive(data.images[0].imageUrl);
        if (status !== 200) {
          throw new Error("Không tìm thấy");
        }
        setProduct(data);
        form.setFieldsValue({
          name: data.name,
          id: data.id,
          description: data.description,
          price: data.price,
          gender: data.gender,
          quantity: data.quantity,
          colors: data.colors.map((color) => color.id),
          category: data.categories.id,
          sizes: data.sizes.map((size) => size.id),
          images: data.images,
        });
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProducts();
    dispatch(getColors());
    dispatch(getSizes());
    dispatch(getCatalogs());
  }, [dispatch, id, form]);
  return (
    <div className="container m-auto mt-5">
      <Row>
        <Col sx={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="mb-5">
            <img src={`${BASEURL}/images/${imgActive}`} alt="img" />
          </div>
          <div>
            <Row gutter={[12, 12]}>
              {product.images &&
                product.images.map((image) => (
                  <Col
                    span={8}
                    key={image.id}
                    onClick={() => setImgActive(image.imageUrl)}
                  >
                    <img
                      className="w-full"
                      src={`${BASEURL}/images/${image.imageUrl}`}
                      alt="img"
                    />
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col sx={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <div className="flex justify-between align-middle">
              {update ? (
                <div>
                  <Button type="primary" htmlType="submit" className="mr-3">
                    Lưu
                  </Button>
                  <ReloadOutlined onClick={() => setUpdate(false)} />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setUpdate(true)}>Cập nhật</Button>
                  <Button onClick={() => handleStatus(product.id)}>
                    Thay đổi trạng thái
                  </Button>
                </div>
              )}

              <div>
                <Tag color={product.status ? "#87d068" : "#cd201f"}>
                  {product.status ? "Đang hoạt động" : "Ngừng kinh doanh"}
                </Tag>
              </div>
            </div>
            <div></div>
            <Form.Item
              label="Product ID"
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
              label="Giới tính"
              name="gender"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={true}>Nam</Select.Option>
                <Select.Option value={false}>Nữ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true }]}
            >
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
            <Form.Item label="Sizes" name="sizes" rules={[{ required: true }]}>
              <Select disabled={!update} mode="multiple">
                {sizes.map((size) => (
                  <Select.Option key={size.id} value={size.id}>
                    {size.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Images"
              name="images"
              rules={[{ required: true }]}
            >
              <Upload
                fileList={fileList}
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFileChange}
                disabled={!update}
                multiple
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
