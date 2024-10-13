import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { getCartById, updateCartItem } from "../../redux/cartAction";
import { BASEURL } from "../../apis/BaseApi";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedItems, setSelectedItems] = useState({}); // State to track selected items
  const [checkAll, setCheckAll] = useState(false); // State for "Check All" checkbox

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(getCartById());
  }, [dispatch]);

  // Handle increasing the quantity
  const handleIncreaseQuantity = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateCartItem(updatedItem));
  };

  // Handle decreasing the quantity
  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateCartItem(updatedItem));
    }
  };

  // Handle removing the item by setting status to false
  const handleRemoveItem = (item) => {
    const updatedItem = { ...item, status: false };
    dispatch(updateCartItem(updatedItem));
  };

  // Handle checkbox change for individual items
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle selection
    }));
  };

  // Handle "Check All" checkbox change
  const handleCheckAllChange = () => {
    setCheckAll((prev) => !prev);
    const newSelectedItems = {};
    cartItems.forEach((item) => {
      newSelectedItems[item.id] = !checkAll; // Set to true if unchecking, false if checking
    });
    setSelectedItems(newSelectedItems); // Update selected items based on "Check All"
  };

  // Calculate total price based on selected items
  const totalSelectedPrice = cartItems.reduce((total, item) => {
    return selectedItems[item.id]
      ? total + item.product.price * item.quantity
      : total;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Giỏ Hàng Của Bạn</h1>
          <button type="button" className="text-blue-500 hover:underline">
            Đơn hàng
          </button>
        </div>

        <table className="min-w-full bg-white border align-middle">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                <Input
                  type="checkbox"
                  id="checkAll"
                  checked={checkAll}
                  onChange={handleCheckAllChange} // Handle "Check All" change
                />
              </th>
              <th className="py-3 px-6 text-left">Sản Phẩm</th>
              <th className="py-3 px-6 text-left">Giá</th>
              <th className="py-3 px-6 text-center">Số Lượng</th>
              <th className="py-3 px-6 text-right">Tổng</th>
              <th className="py-3 px-6 text-right">Xóa</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    <Input
                      type="checkbox"
                      checked={!!selectedItems[item.id]} // Set checked state
                      onChange={() => handleCheckboxChange(item.id)} // Handle checkbox change
                    />
                  </td>
                  <td className="py-3 px-6 text-left flex items-center">
                    <img
                      src={`${BASEURL}${item?.product?.images[0]?.imageUrl}`}
                      alt={item?.product?.name}
                      className="w-12 h-12 object-cover mr-4"
                    />
                    <span>{item.product.name}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {item.product.price} VND
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Button onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </Button>
                  </td>
                  <td className="py-3 px-6 text-right">
                    {item.product.price * item.quantity} VND
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Giỏ hàng của bạn trống.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Tổng tiền:</span>
          <span>{totalSelectedPrice.toLocaleString()} VND</span>
          {/* Display total for selected items */}
        </div>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Thanh Toán
        </button>
      </div>
    </div>
  );
}

export default Cart;
