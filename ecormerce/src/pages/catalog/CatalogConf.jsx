import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Space,
  Table,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCatalog,
  getCatalogs,
  removeCatalog,
  updateCatalog,
} from "../../redux/catalogAtion";
import Highlighter from "react-highlight-words";

function CatalogConf() {
  const [action, setAction] = useState(false);
  const [mode, setMode] = useState(true);
  const [categorySelector, setCategorySelector] = useState([]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { catalog } = useSelector((state) => state.catalog);
  const [cat, setCat] = useState([]);

  const deleteCatalog = () => {
    const ids = [];
    categorySelector.forEach((catalog) => {
      ids.push(catalog.id);
    });
    dispatch(removeCatalog(ids));
    setIsModalDelete(false);
  };
  //form
  const onFinish = (values) => {
    mode ? dispatch(createCatalog(values)) : dispatch(updateCatalog(values));
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        const c = selectedRows.map((c) => c?.name);
        setCategorySelector(selectedRows);
        setCat(c);
        setAction(true);
      } else {
        setAction(false);
      }
    },
  };

  //Modal dialog shows hide
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setMode(true);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getCatalogs());
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
  ];
  return (
    <div className="container m-auto">
      <Modal
        title={`Bạn có muốn xóa danh mục [ ${cat} ] không`}
        open={isModalDelete}
        onOk={deleteCatalog}
        onCancel={() => setIsModalDelete(false)}
      ></Modal>
      <Modal
        title={`${mode ? "Tạo danh mục" : "Cập nhật danh mục"}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {!mode && (
            <Form.Item
              label="ID"
              name="id"
              initialValue={mode ? "" : categorySelector[0]?.id}
            >
              <Input disabled />
            </Form.Item>
          )}

          <Form.Item
            label="Tên danh mục"
            name="name"
            initialValue={mode ? "" : categorySelector[0]?.name}
            rules={[
              {
                required: true,
                message: "Nhập tên danh mục",
              },
            ]}
          >
            <Input placeholder="Tên danh mục" />
          </Form.Item>
          <div className="flex  justify-around">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => setIsModalOpen(false)}
              htmlType="button"
            >
              Hủy bỏ
            </Button>
          </div>
        </Form>
      </Modal>
      <div className="my-3 flex gap-3">
        <Button onClick={showModal}>Thêm danh muc</Button>
        {action && (
          <>
            <Button
              onClick={() => {
                if (categorySelector.length !== 1) {
                  openNotification(
                    "Cập nhật sản phẩm",
                    "Chỉ cho phép update 1 item."
                  );
                  return;
                }
                showModal();
                setMode(false);
              }}
            >
              Sửa
            </Button>
            <Button onClick={() => setIsModalDelete(true)}>Xóa</Button>
          </>
        )}
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        rowKey={(record) => record?.id}
        dataSource={catalog}
      />
    </div>
  );
}

export const openNotification = (title, description) => {
  const args = {
    message: title,
    description: description,
    duration: 300,
  };
  notification.open(args);
};

export default CatalogConf;
