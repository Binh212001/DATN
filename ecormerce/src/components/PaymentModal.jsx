import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Springfield",
  });

  // Xử lý chọn phương thức thanh toán
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Gửi thanh toán (giả lập)
  const handlePaymentSubmit = () => {
    if (paymentMethod) {
      alert(`Phương thức thanh toán: ${paymentMethod}`);
      onClose(); // Đóng modal sau khi gửi
    } else {
      alert("Vui lòng chọn phương thức thanh toán.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Thanh Toán</h2>

        {/* Thông tin khách hàng */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Thông tin khách hàng
          </h3>
          <p className="text-sm text-gray-900">Tên: {customerInfo.name}</p>
          <p className="text-sm text-gray-900">Email: {customerInfo.email}</p>
          <p className="text-sm text-gray-900">
            Điện thoại: {customerInfo.phone}
          </p>
          <p className="text-sm text-gray-900">
            Địa chỉ: {customerInfo.address}
          </p>
        </div>

        {/* Chọn phương thức thanh toán */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn phương thức thanh toán:
          </label>
          <select
            value={paymentMethod}
            onChange={handlePaymentChange}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Chọn phương thức</option>
            <option value="Thanh toán khi nhận hàng">
              Thanh toán khi nhận hàng
            </option>
            <option value="Chuyển khoản ngân hàng">
              Chuyển khoản ngân hàng
            </option>
            <option value="Thẻ tín dụng">Thẻ tín dụng</option>
          </select>
        </div>

        {/* Nút xác nhận thanh toán */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handlePaymentSubmit}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
