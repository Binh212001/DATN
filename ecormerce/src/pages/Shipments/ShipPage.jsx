import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dữ liệu mẫu cho các đơn hàng giao hàng
const orderData = [
  {
    key: "1",
    orderNumber: "1001",
    customerName: "John Doe",
    address: "123 Main St, Springfield",
    phone: "+1 234 567 890",
    status: "Đang giao hàng",
    estimatedDelivery: "2024-10-22",
  },
  {
    key: "2",
    orderNumber: "1002",
    customerName: "Jane Smith",
    address: "456 Oak St, Riverdale",
    phone: "+1 345 678 901",
    status: "Đã giao hàng",
    estimatedDelivery: "2024-10-21",
  },
  {
    key: "3",
    orderNumber: "1003",
    customerName: "Alice Brown",
    address: "789 Pine St, Lakeview",
    phone: "+1 456 789 012",
    status: "Đang giao hàng",
    estimatedDelivery: "2024-10-23",
  },
];

const ShipPage = () => {
  const [filteredData, setFilteredData] = useState(orderData);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const result = orderData.filter((order) =>
      order.customerName.toLowerCase().includes(value)
    );
    setFilteredData(result);
  };

  const openOrder = (id) => {
    navigate("/order/info/1");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Trang giao hàng</h1>

      {/* Tìm kiếm */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Tìm theo tên khách hàng"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Danh sách đơn hàng giao hàng */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-4 py-2 border-b">Số đơn hàng</th>
              <th className="px-4 py-2 border-b">Tên khách hàng</th>
              <th className="px-4 py-2 border-b">Địa chỉ</th>
              <th className="px-4 py-2 border-b">Số điện thoại</th>
              <th className="px-4 py-2 border-b">Trạng thái</th>
              <th className="px-4 py-2 border-b">Ngày giao dự kiến</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((order) => (
              <tr key={order.key} onClick={() => openOrder()}>
                <td className="px-4 py-2">{order.orderNumber}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">{order.address}</td>
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Đang giao hàng"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.estimatedDelivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipPage;
