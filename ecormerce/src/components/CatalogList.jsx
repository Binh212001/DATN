import React from "react";
import "./catalog.css";
import { CheckOutlined } from "@ant-design/icons";

function CatalogList() {
  return (
    <ul>
      <li className="flex items-center list-none  gap-3 catalog-item  ">
        <span className="size-5 border text-center border-gray-500 rounded-sm ">
          <CheckOutlined className="check-icon hidden text-red-400 font-bold" />
        </span>
        <span> ÁO SƠ MI</span>
      </li>
    </ul>
  );
}

export default CatalogList;
