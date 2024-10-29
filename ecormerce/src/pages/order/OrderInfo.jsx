import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";

function OrderInfo() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  console.log("🚀 ~ OrderInfo ~ order:", order);
  useEffect(() => {
    async function getOrder(id) {
      try {
        const response = await BaseApi.get(`/api/invoices/invoice`, {
          params: { id },
        });
        setOrder(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getOrder(id);
  }, [id]);
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Thông tin Đơn hàng
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Đơn hàng #{order.id}
            </h2>
            <p className="text-sm text-gray-500">
              Ngày đặt: {order.createdDate}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Thông tin Khách hàng
              </h3>
              <p className="text-sm text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
              <p className="text-sm text-gray-500">
                Điện thoại: +1 234 567 890
              </p>
              <p className="text-sm text-gray-500">
                Địa chỉ: 123 Main St, Springfield
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Thông tin Vận chuyển
              </h3>
              <p className="text-sm text-gray-900">123 Main St, Springfield</p>
              <p className="text-sm text-gray-500">
                Ngày dự kiến giao: 25-10-2024
              </p>
              <p className="text-sm text-gray-500">
                Phương thức vận chuyển: Giao hàng tiêu chuẩn
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-medium text-gray-700">
                Trạng thái Đơn hàng
              </h3>
              <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {order.status}
              </span>
            </div>

            <div className="text-right">
              <h3 className="text-md font-medium text-gray-700">
                Tổng số tiền
              </h3>
              <p className="text-xl font-bold text-gray-900">
                {order.totalAmount} đ
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">
              Sản phẩm đã đặt
            </h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Tên Sản phẩm
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Số lượng
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Kich cỡ
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Màu sắc
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                    Giá
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.invoiceItems.map((item) => {
                  return (
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item?.product?.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item?.quantity}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">XXL</td>
                      <td className="px-4 py-2 text-sm text-gray-900">READ</td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">
                        {item.totalPrice}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900">
                        {item.totalPrice * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
