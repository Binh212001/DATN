import React from "react";
import "./catalog.css";
import { CheckOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function CatalogList({ handleCategoryChange }) {
  const { catalog } = useSelector((state) => state.catalog);
  const handleClick = (id) => {
    handleCategoryChange(id);
  };
  return (
    <ul>
      {catalog.map((item) => (
        <li
          key={item.id}
          className="flex items-center list-none  gap-3 catalog-item  "
          onClick={() => handleClick(item.id)}
        >
          <span className="size-5 border text-center border-gray-500 rounded-sm ">
            <CheckOutlined className="check-icon hidden text-red-400 font-bold" />
          </span>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default CatalogList;
