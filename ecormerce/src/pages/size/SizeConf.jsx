import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNotification } from "../catalog/CatalogConf";
import {
  createSize,
  getSizes,
  removeSize,
  updateSize,
} from "../../redux/sizeAtion";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

function SizeConf() {
  const [action, setAction] = useState(false);
  const [mode, setMode] = useState(true);
  const [sizeSelector, setSizeSelector] = useState([]);
  const [size, setSize] = useState([]);

  const dispatch = useDispatch();

  const { sizes } = useSelector((state) => state.size);

  const deleteSize = () => {
    const ids = [];
    sizeSelector.forEach((s) => {
      ids.push(s.id);
    });
    dispatch(removeSize(ids));
    setIsModalDelete(false);
  };

  //form
  const onFinish = (values) => {
    mode ? dispatch(createSize(values)) : dispatch(updateSize(values));
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        const sz = selectedRows.map((row) => row?.name);
        setSizeSelector(selectedRows);
        setSize(sz);
        setAction(true);
      } else {
        setAction(false);
      }
    },
    getCheckboxProps: (record) => ({
      disabled: record?.name === "Disabled User",
      name: record?.name,
    }),
  };

  //Modal dialog shows hide

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
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
    dispatch(getSizes());
  }, [dispatch]);

  return (
    <div className="container m-auto">
      <Modal
        title={`Bạn có muốn xóa kích cỡ [ ${size} ] không`}
        open={isModalDelete}
        onOk={deleteSize}
        onCancel={() => setIsModalDelete(false)}
      ></Modal>
      <Modal
        title={`${mode ? "Tạo size" : "Cập nhật size"}`}
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
              initialValue={mode ? "" : sizeSelector[0]?.id}
            >
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item
            label="Tên kích cỡ"
            initialValue={mode ? "" : sizeSelector[0]?.name}
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên kích cỡ",
              },
            ]}
          >
            <Input placeholder="Tên kích cỡ" />
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
        <Button onClick={showModal}>Thêm kích cỡ</Button>
        {action && (
          <>
            <Button
              onClick={() => {
                if (setSizeSelector.length !== 1) {
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
        dataSource={sizes}
      />
    </div>
  );
}

export default SizeConf;
