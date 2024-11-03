import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    // API hoặc dữ liệu m��u
    async function callApi() {
      const res = await BaseApi.get("/api/invoices/user", {
        params: {
          userId: id,
        },
      });
      setOrder(res.data);
    }
    callApi();
  }, [id]);

  const navigate = useNavigate(id);
  const openOrder = () => {
    navigate("/order/info/" + id);
  };

  return (
    <div className="bg-white container  m-auto mt-5 shadow-md rounded-lg overflow-hidden">
      <h2 className="text-center ">Đơn hàng của bạn.</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Tên khách hàng
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Ngày
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Tổng
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {order.map((item) => {
            return (
              <tr key={item.id} onClick={() => openOrder(item.id)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.createdDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {item.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
