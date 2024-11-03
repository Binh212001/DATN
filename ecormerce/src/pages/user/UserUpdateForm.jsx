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
    province: "",
    district: "",
    addressDetail: "",
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
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [id]);

  const provinceChange = (code) => {
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
  // Update user data including the avatar if provided

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      if (key === "avatar" && formData.avatar) {
        updatedData.append(key, formData.avatar);
      } else {
        updatedData.append(key, formData[key]);
      }
    }

    try {
      await BaseApi.put(`/api/user/${user.id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });
      openNotification("Cập nhật thành công");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-6">Update User</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Username:</label>
        <input
          type="text"
          name="username"
          value={user.username || ""}
          disabled
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={role === "ADMIN"}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          disabled={role === "ADMIN"}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tỉnh:</label>
        <select
          name="province"
          value={formData.province}
          disabled={role === "ADMIN"}
          onChange={(e) => provinceChange(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Province</option>
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Quận/Huyện:</label>
        <select
          name="district"
          disabled={role === "ADMIN"}
          value={formData.district}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Address Detail:</label>
        <input
          type="text"
          name="addressDetail"
          disabled={role === "ADMIN"}
          value={formData.addressDetail}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {role === "ADMIN" && (
        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <select
            type="text"
            selected={formData.role}
            name="role"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="SHIPPER">SHIPPER</option>
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Avatar:</label>
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          disabled={role === "ADMIN"}
          accept="image/*"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {role === "ADMIN" && (
        <div className="mb-4">
          <label className="inline-flex items-center text-gray-700">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="mr-2"
            />
            Active Status
          </label>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update User
        </button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
