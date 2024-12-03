import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";
import { openNotification } from "../catalog/CatalogConf";

function OrderInfo() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const [shipper, setShipper] = useState([]);
  const [shipperSelected, setShipperSelected] = useState(0);

  useEffect(() => {
    async function getOrder(id) {
      try {
        const response = await BaseApi.get(`/api/invoices/invoice`, {
          params: { id },
        });
        const shipRes = await BaseApi.get(
          "/api/user/role/SHIPPER/" + response.data.id
        );
        console.log("🚀 ~ getOrder ~ shipRes:", shipRes);
        setShipper(shipRes);
        setOrder(response.data);
        setShipperSelected(response.data.shipper?.id);
      } catch (err) {
        console.error(err);
      }
    }
    getOrder(id);
  }, [id]);

  const action = async (status) => {
    try {
      if (shipperSelected === undefined) {
        openNotification("Vui lòng chọn Shipper.");
        return;
      }
      await BaseApi.put(
        `/api/invoices/invoice/${id}/transfer/${shipperSelected}/status/${status}`
      );
      setOrder((prevOrder) => ({ ...prevOrder, status }));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Thông tin Đơn hàng
        </h1>
        <div className="flex justify-between align-middle">
          <div className="List-btn flex justify-start gap-2 align-middle">
            {user?.role === "ADMIN" && order?.status === "PENDING" && (
              <button
                onClick={() => action("DELIVERED")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Vận chuyển
              </button>
            )}
            {user?.role === "SHIPPER" && order?.status === "DELIVERED" && (
              <div>
                <button
                  onClick={() => action("COMPLETED")}
                  className="px-4 py-2 bg-green-500 mr-3 text-white rounded hover:bg-green-600"
                >
                  Giao xong
                </button>
                <button
                  onClick={() => action("RETURNED")}
                  className="px-4 py-2 bg-yellow-500-500 bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Trả về
                </button>
              </div>
            )}
            <button
              onClick={() => action("CANCELLED")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Đơn hàng #{order?.id}
            </h2>
            <p className="text-sm text-gray-500">
              Ngày đặt: {order?.createdDate}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Thông tin Khách hàng
              </h3>
              <p className="text-sm text-gray-900">{order?.receiver}</p>
              <p className="text-sm text-gray-500">
                Điện thoại: {order?.phone}
              </p>
              <p className="text-sm text-gray-500">
                Địa chỉ: {order?.address} - {order?.districtName} -
                {order?.provinceName}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Thông tin Vận chuyển
              </h3>
              <p className="text-sm text-gray-900">
                Người giao hàng : {order?.shipper?.fullName}
              </p>
              <p className="text-sm text-gray-500">
                Ngày dự kiến giao: {order?.createdDate?.split("T")[0]}
              </p>
              <p className="text-sm text-gray-500">
                Phương thức vận chuyển: Giao hàng tiêu chuẩn
              </p>
            </div>
            {user.role == "ADMIN" && (
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <span>Chọn Người giao hàng</span>
                <select
                  name="shipper"
                  value={shipperSelected}
                  onChange={(e) => setShipperSelected(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value={0}></option>
                  {shipper.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-medium text-gray-700">
                Trạng thái Đơn hàng
              </h3>
              <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {order?.status}
              </span>
            </div>

            <div className="text-right">
              <h3 className="text-md font-medium text-gray-700">
                Tổng số tiền
              </h3>
              <p className="text-xl font-bold text-gray-900">
                {order?.totalAmount} đ
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
                {order?.invoiceItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item?.product?.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item?.quantity}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item?.size}
                      </td>
                      <td
                        className="px-4 py-2 text-sm text-gray-900"
                        style={{
                          background: item?.color,
                        }}
                      >
                        {item?.color}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">
                        {item.totalPrice}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900">
                        {item?.totalPrice * item?.quantity}
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
