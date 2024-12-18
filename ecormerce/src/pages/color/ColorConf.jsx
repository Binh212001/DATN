import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  getColors,
  removeColor,
  updateColor,
} from "../../redux/colorAtion";
import { openNotification } from "../catalog/CatalogConf";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Màu hiển thị",
    dataIndex: "name",
    render: (name) => {
      return (
        <span className={`p-3`} style={{ backgroundColor: name }}>
          {name}
        </span>
      );
    },
  },
];

function ColorConf() {
  const [action, setAction] = useState(false);
  const [mode, setMode] = useState(true);
  const [colorSelector, setcolorSelector] = useState([]);
  const [cl, setCl] = useState([]);
  const dispatch = useDispatch();

  const { colors } = useSelector((state) => state.color);

  //form
  const onFinish = (values) => {
    mode ? dispatch(createColor(values)) : dispatch(updateColor(values));
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteColor = () => {
    const ids = [];
    colorSelector.forEach((catalog) => {
      ids.push(catalog.id);
    });
    dispatch(removeColor(ids));
    setIsModalDelete(false);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        const c = selectedRows.map((c) => c?.name);
        setcolorSelector(selectedRows);
        setCl(c);
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
    dispatch(getColors());
  }, [dispatch]);

  return (
    <div className="container m-auto">
      <Modal
        title={`Bạn có muốn xóa màu sắc [ ${cl} ] không`}
        open={isModalDelete}
        onOk={deleteColor}
        onCancel={() => setIsModalDelete(false)}
      ></Modal>
      <Modal
        title={`${mode ? "Tạo  màu sắc" : "Cập nhật  màu sắc"}`}
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
              initialValue={mode ? "" : colorSelector[0]?.id}
            >
              <Input disabled />
            </Form.Item>
          )}

          <Form.Item
            label="Tên màu sắc"
            name="name"
            initialValue={mode ? "" : colorSelector[0]?.name}
            rules={[
              {
                required: true,
                message: "Nhập tên màu sắc",
              },
            ]}
          >
            <Input type="color" placeholder="Tên màu sắc" />
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
        <Button onClick={showModal}>Thêm màu sắc</Button>
        {action && (
          <>
            <Button
              onClick={() => {
                if (colorSelector.length !== 1) {
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
        dataSource={colors}
      />
    </div>
  );
}

export default ColorConf;
