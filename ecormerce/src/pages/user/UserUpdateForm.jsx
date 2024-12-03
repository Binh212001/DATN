import React, { useEffect, useState } from "react";
import vnApi from "../../apis/vnApi";
import { useParams } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";
import { openNotification } from "../catalog/CatalogConf";

const UserUpdateForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    province: null,
    district: null,
    addressDetail: null,
    active: false,
    avatar: null,
  });

  const userLogin = JSON.parse(localStorage.getItem("user"));
  const { role } = userLogin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provinceData = await vnApi.getLocation();
        const userData = await BaseApi.get(`/api/user/${id}`);
        setUser(userData);
        setProvinces(provinceData);
        setFormData((prev) => ({
          ...prev,
          ...userData,
        }));
        const districtData = provinceData.find(
          (d) => d.code === Number(userData.province)
        );
        setDistricts(districtData.districts);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [id]);

  const provinceChange = (e) => {
    const code = Number(e.target.value);
    const province = provinces.find((p) => p.code === code);
    setDistricts(province ? province.districts : []);
    setFormData((prev) => ({ ...prev, province: code, district: "" }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    const { avatar, province, district, ...otherFields } = formData;
    Object.entries(otherFields).forEach(([key, value]) => {
      if (key !== "role") {
        updatedData.append(key, value);
      }
    });

    if (avatar) {
      updatedData.append("avatar", avatar);
    }

    if (province) {
      const selectedProvince = provinces.find((pr) => pr.code == province);
      if (selectedProvince) {
        updatedData.append("province", selectedProvince.code);
        const { name } = selectedProvince;
        updatedData.append("provinceName", name);
      }
    }

    if (district) {
      const selectedDistrict = districts.find((d) => d.code == district);
      if (selectedDistrict) {
        const { name } = selectedDistrict;
        updatedData.append("district", selectedDistrict.code);
        updatedData.append("districtName", name);
      }
    }

    updatedData.append("role", formData.role);

    try {
      await BaseApi.put(`/api/user/${user.id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      openNotification("Cập nhật thành công");
    } catch (error) {
      openNotification("Lỗi cập nhật.");
    }
  };

  return (
    <div className=" container  h-screen  flex flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6">Cập nhật người dùng</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cột 1 */}
          <div className="mb-4">
            <label className="block text-gray-700">Tên đăng nhập:</label>
            <input
              type="text"
              name="username"
              value={user.username || ""}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Họ và tên:</label>
            <input
              type="text"
              name="fullName"
              value={formData?.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tỉnh/Thành phố:</label>
            <select
              name="province"
              value={formData?.province}
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

          {/* Cột 2 */}
          <div className="mb-4">
            <label className="block text-gray-700">Quận/Huyện:</label>
            <select
              name="district"
              value={formData?.district}
              onChange={handleChange}
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

          <div className="mb-4">
            <label className="block text-gray-700">Địa chỉ chi tiết:</label>
            <input
              type="text"
              name="addressDetail"
              value={formData?.addressDetail}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {role === "ADMIN" && (
            <div className="mb-4">
              <label className="block text-gray-700">Vai trò:</label>
              <select
                type="text"
                selected={formData?.role}
                name="role"
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="ADMIN">Quản trị viên</option>
                <option value="USER">Người dùng</option>
                <option value="SHIPPER">Người giao hàng</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Hình đại diện:</label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {role === "ADMIN" && (
            <div className="mb-4 col-span-2">
              <label className="inline-flex items-center text-gray-700">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData?.active}
                  onChange={handleChange}
                  className="mr-2"
                />
                Trạng thái hoạt động
              </label>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Cập nhật người dùng
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
