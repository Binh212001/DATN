import { Button, Input } from "antd";
import React from "react";

function Cart() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Giỏ Hàng Của Bạn</h1>
          <button type="button" className="text-blue-500 hover:underline">
            Hóa đơn
          </button>
        </div>

        <table className="min-w-full bg-white border align-middle">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                <Input type="checkbox" />
              </th>
              <th className="py-3 px-6 text-left">Sản Phẩm</th>
              <th className="py-3 px-6 text-left">Giá</th>
              <th className="py-3 px-6 text-center">Số Lượng</th>
              <th className="py-3 px-6 text-right">Tổng</th>
              <th className="py-3 px-6 text-right">Xóa</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">
                <Input type="checkbox" />
              </td>
              <td className="py-3 px-6 text-left flex items-center">
                <img
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  alt="Product Image"
                  className="w-12 h-12 object-cover mr-4"
                />
                <span>Tên Sản Phẩm</span>
              </td>
              <td className="py-3 px-6 text-left">500,000 VND</td>
              <td className="py-3 px-6 text-center">
                <Button>-</Button>
                <span>1</span>
                <Button>+</Button>
              </td>
              <td className="py-3 px-6 text-right">500,000 VND</td>
              <td className="py-3 px-6 text-right">
                <button className="text-red-600 hover:text-red-800">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Tổng tiền:</span>
          <span>1,500,000 VND</span>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Thanh Toán
        </button>
      </div>
    </div>
  );
}

export default Cart;
