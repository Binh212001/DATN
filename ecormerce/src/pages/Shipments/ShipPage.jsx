import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";

const ShipPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("user"));

  // Hàm tìm kiếm
  const handleSearch = (e) => {};

  useEffect(() => {
    const getOrder = async () => {
      const res = await BaseApi.get("/api/invoices/ship", {
        params: {
          status: "DELIVERED",
          shipId: id,
          // customerName: searchTerm,
        },
      });
      console.log("🚀 ~ getOrder ~ res:", res);
      setFilteredData(res.data);
    };
    getOrder();
  }, [searchTerm]);

  const openOrder = (id) => {
    navigate("/order/info/" + id);
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
              <tr key={order.key} onClick={() => openOrder(order?.id)}>
                <td className="px-4 py-2">#{order?.id}</td>
                <td className="px-4 py-2">{order?.user?.fullName}</td>
                <td className="px-4 py-2">{order?.user?.addressDetail}</td>
                <td className="px-4 py-2">{order?.user?.phone}</td>
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
