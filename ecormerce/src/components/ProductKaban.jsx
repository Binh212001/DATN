import { Col, Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function ProductKaban() {
  return (
    <Col xs={12} md={6} lg={4}>
      <Link to="/">
        <Tooltip title="prompt text" color="#2db7f5">
          <div className="flex border hover:shadow-md relative">
            <p className="absolute "></p>
            <img
              className="h-20"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              alt=""
            />
            <div>
              <h3 className="font-bold">San pHam</h3>
              <p>Giá: 10000 đ</p>
              <p>Số lượng: 1000</p>
            </div>
          </div>
        </Tooltip>
      </Link>
    </Col>
  );
}

export default ProductKaban;
