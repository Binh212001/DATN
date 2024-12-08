import React, { useState } from "react";
import { BaseApi } from "../../apis/BaseApi";
import Content from "./Content";

const PaymentConfirm = ({ items, method, totalSelectedPrice, modal }) => {
  const [user, setUser] = useState({});

  const openNotification = (message, description) => {
    alert(`${message}: ${description}`);
  };

  const setUserInformation = (data) => {
    setUser(data);
  };

  const onOk = async () => {
    const ids = items.map((item) => item.id); // Use map to create an array of ids

    try {
      const res = await BaseApi.post("/api/invoices", {
        totalAmount: totalSelectedPrice,
        status: "PENDING",
        userId: items[0]?.user?.id, // Safe access using optional chaining
        cartId: ids,
        payment: method,
        ...user,
        receiver: user.fullName,
      });

      if (res?.status === 200) {
        openNotification(
          "Thanh toán",
          `Thanh toán thành công. Mã hóa đơn: ${res.data?.id}`
        );
      }
      modal(false);
    } catch (err) {
      openNotification("Lỗi thanh toán", "Đã xảy ra lỗi khi thanh toán.");
      console.error(err);
    }
  };

  const onCancel = () => {
    modal(false);
  };

  // Render custom modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg shadow-lg">
        <div className="modal-header mb-4">
          <h3 className="text-xl font-semibold">Xác nhận thanh toán</h3>
        </div>
        <div className="modal-body mb-6">
          <Content
            items={items}
            method={method}
            totalSelectedPrice={totalSelectedPrice}
            setUserInformation={setUserInformation}
          />
        </div>
        <div className="modal-footer flex justify-between">
          <button
            onClick={onOk}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Đồng ý
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirm;
