import { useEffect, useState } from "react";
import vnApi from "../../apis/vnApi";

const Content = ({ setUserInformation, items, method, totalSelectedPrice }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [userData, setUserData] = useState({
    fullName: items[0]?.user?.fullName,
    phone: items[0]?.user?.phone,
    province: items[0]?.user?.province,
    district: items[0]?.user?.district,
    provinceName: items[0]?.user?.provinceName,
    districtName: items[0]?.user?.districtName,
  });

  const provinceChange = (e) => {
    const code = Number(e.target.value);
    const province = provinces.find((p) => p.code === code);
    setDistricts(province ? province.districts : []);
    setUserData((prev) => ({
      ...prev,
      province: code,
      provinceName: province.name,
    }));
    setUserInformation(userData);
  };

  const handleChangeDistrict = (e) => {
    const code = Number(e.target.value);
    const district = districts.find((p) => p.code === code);
    setUserData((prev) => ({
      ...prev,
      district: code,
      districtName: district.name,
    }));
    setUserInformation(userData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provinceData = await vnApi.getLocation();
        setProvinces(provinceData);
        const districtData = provinceData.find(
          (d) => d.code === Number(items[0].user.province)
        );
        setDistricts(districtData.districts);
        setUserInformation(userData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Tổng tiền đã chọn: {totalSelectedPrice} đ</h3>
      <p>Phương thức thanh toán: {method}</p>
      <p>Vui lòng kiểm tra thông tin và đặt hàng.</p>
      <p>Thông tin sản phẩm</p>
      <div className="grid grid-cols-1 font-bold sm:grid-cols-5 gap-4">
        <p>Tên sản phẩm</p>
        <p>Số lượng</p>
        <p>Màu săc</p>
        <p>Kích cỡ</p>
        <p>Giá</p>
      </div>
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <p>{item.product.name}</p>
          <p>{item.quantity}</p>
          <p>{item.color}</p>
          <p>{item.size}</p>
          <p>{item.totalPrice}</p>
        </div>
      ))}
      <h4 className="text-lg font-semibold mb-4">Thông tin người nhận</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Tên người nhận
          </label>
          <input
            type="text"
            value={items[0]?.user?.fullName}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            value={items[0]?.user?.phone}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Tỉnh</label>
          <select
            name="province"
            value={items[0]?.user?.province}
            onChange={(e) => provinceChange(e)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Quận/Huyện</label>
          <select
            name="district"
            value={items[0]?.user?.district}
            onChange={(e) => handleChangeDistrict(e)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-700 font-medium mb-1">
            Địa chỉ chi tiết
          </label>
          <input
            type="text"
            value={items[0]?.user?.addressDetail}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
