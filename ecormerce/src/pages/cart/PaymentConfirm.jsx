import { Modal } from "antd";
import { BaseApi } from "../../apis/BaseApi";
import { openNotification } from "../catalog/CatalogConf";

const PaymentConfirm = (items, method) => {
  const totalSelectedPrice = items.reduce((total, item) => {
    return total + item.totalPrice * 2;
  }, 0);
  const onOk = async () => {
    let ids = [];
    items.forEach((item) => {
      ids.push(item.id);
    });
    try {
      const res = await BaseApi.post("/api/invoices", {
        totalAmount: totalSelectedPrice,
        status: "PENDING",
        userId: items[0].user.id,
        cartId: ids,
        payment: method,
      });
      if (res.status === 200) {
        openNotification(
          "Thanh toan",
          " Thanh toán thành công. Mã hóa đơn: " + res.data.id
        );
      }
    } catch (err) {}
  };

  const onCancel = () => {
    console.log("Payment cancelled");
  };

  return Modal.confirm({
    title: "Xác nhận thanh toán",
    content: "Bạn có chắc chắn muốn thanh toán không?",
    okText: "Đồng ý",
    cancelText: "Hủy",
    onOk,
    onCancel,
  });
};

export default PaymentConfirm;
