import { Col, Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../apis/BaseApi";

function ProductKaban({ item }) {
  return (
    <Col xs={12} md={6} lg={4}>
      <Link to={`/product/detail/${item.id}`}>
        <Tooltip title="prompt text" color="#2db7f5">
          <div className="flex border hover:shadow-md relative">
            <p className="absolute "></p>
            <img
              className="h-20"
              src={`${BASEURL}${item.images[0]?.imageUrl}`}
              alt={item.images[0]?.imageUrl}
            />
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p>Giá: {item.price} đ</p>
              <p>Số lượng: {item.quantity}</p>
            </div>
          </div>
        </Tooltip>
      </Link>
    </Col>
  );
}

export default ProductKaban;
