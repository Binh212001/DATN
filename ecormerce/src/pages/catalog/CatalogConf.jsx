import { SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Table,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCatalog,
  getCatalogs,
  removeCatalog,
  updateCatalog,
} from "../../redux/catalogAtion";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

function CatalogConf() {
  const [action, setAction] = useState(false);
  const [mode, setMode] = useState(true);
  const [categorySelector, setCategorySelector] = useState([]);
  const dispatch = useDispatch();

  const { catalog } = useSelector((state) => state.color);

  //action
  const items = [
    {
      key: "1",
      label: (
        <button
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
        </button>
      ),
    },
    {
      key: "2",
      label: <button onClick={() => deleteCatalog()}>Xóa</button>,
    },
  ];

  const deleteCatalog = () => {
    const ids = [];
    categorySelector.forEach((catalog) => {
      ids.push(catalog.id);
    });
    dispatch(removeCatalog(ids));
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
        setCategorySelector(selectedRows);
        setAction(true);
      } else {
        setAction(false);
      }
    },
  };

  //Modal dialog shows hide

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

  return (
    <div className="container m-auto">
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
          <Dropdown
            menu={{
              items,
            }}
          >
            <SettingOutlined />
          </Dropdown>
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
