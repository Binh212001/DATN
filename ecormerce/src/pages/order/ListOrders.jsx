import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";
import { Button, Input, Pagination, Select, Table } from "antd";

const ListOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State to manage selected rows
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(80);
  const [totalElements, setTotalElements] = useState(80);

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    async function fetchOrder() {
      const response = await BaseApi.get("/api/invoices", {
        params: {
          page: currentPage - 1,
          size: pageSize,
        },
      });
      setOrders(response.data);
      setTotalElements(response.totalElements);
    }
    fetchOrder();
  }, [currentPage, pageSize]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleStatusFilter = async (value) => {
    setStatusFilter(value);
  };

  const filterInv = async () => {
    const response = await BaseApi.get("/api/invoices/filter", {
      params: {
        status: statusFilter,
        receiver: searchTerm,
      },
    });
    setOrders(response.data);
  };
  const reset = async () => {
    setSearchTerm("");
    setStatusFilter("");
    const response = await BaseApi.get("/api/invoices", {
      params: {
        page: currentPage - 1,
        size: pageSize,
      },
    });
    setOrders(response.data);
    setTotalElements(response.totalElements);
  };

  const openOrder = (id) => {
    navigate("/order/info/" + id);
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = async () => {
    // Call API to delete selected orders
    await BaseApi.delete("/api/invoices", { data: selectedRowKeys });
    setSelectedRowKeys([]);
    // Refresh the order list
    const response = await BaseApi.get("/api/invoices", {
      params: {
        page: currentPage - 1,
        size: pageSize,
      },
    });
    setOrders(response.data);
    setTotalElements(response.totalElements);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Người giao hàng",
      dataIndex: "shipper",
      key: "shipper",
      render: (shipper) => shipper?.fullName || "N/A",
    },

    {
      title: "Tổng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => `$${totalAmount.toFixed(2)}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const shareOrder = async () => {
    try {
      const res = await BaseApi.post("api/invoices/auto-share-invoice");
      console.log("🚀 ~ shareOrder ~ res:", res);
      if (res.status === 200) {
        alert("Chia đơn hàng thành công!");
        window.location.reload();
      }
    } catch (error) {
      alert("Chia đơn hàng thất bại!");
    }
  };
  return (
    <div className="container mx-auto p-6">
      {/* Tìm kiếm và Lọc */}
      <div className="mb-6 flex space-x-4">
        <Input
          placeholder="Tìm theo tên khách hàng"
          value={searchTerm}
          onChange={handleSearch}
          className="w-60"
        />

        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="w-48"
          placeholder="Lọc theo trạng thái"
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="PENDING">Hoàn thành</Select.Option>
          <Select.Option value="CANCELLED">Đang chờ</Select.Option>
          <Select.Option value="DELIVERED">Đã giao</Select.Option>
          <Select.Option value="RETURNED">Đã giao</Select.Option>
          <Select.Option value="COMPLETED">Đã giao</Select.Option>
        </Select>

        <Button type="primary" onClick={() => filterInv()}>
          Lọc
        </Button>
        <Button onClick={reset} type="danger">
          Đặt lại
        </Button>
        <Button onClick={() => shareOrder()}>Chia đơn cho ship</Button>
      </div>

      {/* Bảng danh sách đơn hàng */}
      <Table
        rowSelection={rowSelection} // Enable row selection
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={false}
        onRow={(record) => ({
          onClick: () => openOrder(record.id),
        })}
        className="overflow-x-auto"
      />

      {/* Delete Button and Pagination */}
      <div className="flex  mt-4">
        {selectedRowKeys?.length > 0 && (
          <Button type="danger" onClick={handleDelete}>
            Xóa ({selectedRowKeys?.length})
          </Button>
        )}
        {selectedRowKeys?.length === 1 && (
          <Button
            type="danger"
            onClick={() => navigate("/order/show/" + selectedRowKeys[0])}
          >
            Cập nhật ({selectedRowKeys?.length})
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListOrders;
