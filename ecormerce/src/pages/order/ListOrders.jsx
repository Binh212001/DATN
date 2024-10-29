import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const orderData = [
  {
    key: "1",
    orderNumber: "1001",
    customerName: "John Doe",
    status: "Hoàn thành",
    total: 199.99,
  },
  {
    key: "2",
    orderNumber: "1002",
    customerName: "Jane Smith",
    status: "Đang chờ",
    total: 299.99,
  },
  {
    key: "3",
    orderNumber: "1003",
    customerName: "Alice Brown",
    status: "Đã giao",
    total: 399.99,
  },
  // Thêm dữ liệu nếu cần
];

const ListOrders = () => {
  const [filteredData, setFilteredData] = useState(orderData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterData(value, statusFilter);
  };

  // Hàm lọc
  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    filterData(searchTerm, value);
  };

  // Hàm lọc và tìm kiếm dữ liệu
  const filterData = (searchValue, statusValue) => {
    let result = orderData;

    if (searchValue) {
      result = result.filter((order) =>
        order.customerName.toLowerCase().includes(searchValue)
      );
    }

    if (statusValue) {
      result = result.filter((order) => order.status === statusValue);
    }

    setFilteredData(result);
  };

  //Open Order
  const openOrder = (id) => {
    navigate("/order/info/1");
  };
  return (
    <div className="container mx-auto p-6">
      {/* Tìm kiếm và Lọc */}
      <div className="mb-6 flex space-x-4">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm theo tên khách hàng"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Bộ lọc trạng thái */}
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Lọc theo trạng thái</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đang chờ">Đang chờ</option>
          <option value="Đã giao">Đã giao</option>
        </select>

        {/* Nút đặt lại */}
        <button
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("");
            setFilteredData(orderData);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Đặt lại
        </button>
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-4 py-2 border-b">Số đơn hàng</th>
              <th className="px-4 py-2 border-b">Tên khách hàng</th>
              <th className="px-4 py-2 border-b">Trạng thái</th>
              <th className="px-4 py-2 border-b">Tổng cộng ($)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((order) => (
              <tr key={order.key} onClick={() => openOrder()}>
                <td className="px-4 py-2">{order.orderNumber}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Hoàn thành"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Đang chờ"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
