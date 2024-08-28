import { Col, Row, Select } from "antd";
import React from "react";
import Filter from "../../components/Filter";
import ProductCard from "../../components/ProductCard";

function Catalog() {
  const handleChange = () => {};
  return (
    <div className="container m-auto mt-10">
      <Row gutter={[24, 24]}>
        <Col sx={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
          <Filter />
        </Col>
        <Col sx={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
          <div className="flex justify-between items-center bg-gray-100 mb-3 p-3 rounded-sm">
            <div className="flex gap-2">
              <p>Bạn đang xem: </p>
              <h4 className="text-[#712258] font-bold">SẢN PHẨM</h4>
            </div>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </div>
          <Row gutter={[24, 24]}>
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
            <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Catalog;
