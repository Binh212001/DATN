import { CheckOutlined } from "@ant-design/icons";
import React from "react";
import "./catalog.css";
import { useSelector } from "react-redux";

function SizeList() {
  const { sizes } = useSelector((state) => state.size);

  return (
    <ul className="flex items-center flex-wrap gap-2">
      {sizes.map((s) => {
        return (
          <li
            key={s.id}
            className="flex items-center list-none  gap-3 catalog-item  "
          >
            <span className="size-5 border text-center border-gray-500 rounded-sm ">
              <CheckOutlined className="check-icon hidden text-red-400 font-bold" />
            </span>
            <span>{s.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default SizeList;
