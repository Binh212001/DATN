import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { BaseApi, BASEURL } from "../../apis/BaseApi";
import { getCatalogs } from "../../redux/catalogAtion";
import { getColors } from "../../redux/colorAtion";
import { getProducts } from "../../redux/productAction";
import { getSizes } from "../../redux/sizeAtion";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../catalog/CatalogConf";

function Product() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { sizes } = useSelector((state) => state.size);
  const { colors } = useSelector((state) => state.color);
  const { catalog } = useSelector((state) => state.catalog);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await BaseApi.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleRowClick = (record) => {
    navigate(`/product/detail/${record.id}`);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("gender", values.gender);
    formData.append("quantity", values.quantity);
    formData.append("category", values.category);
    formData.append("salePercentage", values.salePercentage && 0);
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
      openNotification("Vui lòng đăng nhập đầy dủ thông tin.");
    }
  };

  useEffect(() => {
    dispatch(getColors());
    dispatch(getSizes());
    dispatch(getCatalogs());
    dispatch(getProducts());
  }, [dispatch]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên", // Name
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá", // Price
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng", // Quantity
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái", // Status
      dataIndex: "status",
      filters: [
        {
          text: "Hoạt động", // Active
          value: true,
        },
        {
          text: "Không hoạt động", // Unactive
          value: false,
        },
      ],
      key: "status",
    },
    {
      title: "Hình ảnh", // Images
      dataIndex: "images",
      key: "images",
      render: (images) =>
        images ? (
          <img
            src={`${BASEURL}images/${images[0].imageUrl}`}
            alt="Hình ảnh"
            style={{ width: 50 }}
          />
        ) : (
          <></>
        ),
    },
  ];

  return (
    <div className="container m-auto">
      <div className="flex gap-3 mt-3">
        <Button onClick={showModal}>Thêm sản phẩm</Button>
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
          <Form.Item label="Giảm giá" name="salePercentage">
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
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
}

export default Product;
