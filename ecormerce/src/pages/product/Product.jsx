import { Button, Dropdown, Pagination, Row, Select, Slider } from "antd";
import React from "react";
import ProductKaban from "../../components/ProductKaban";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: <Link to="/product/config/catalog">Danh mục</Link>,
  },
  {
    key: "2",
    label: <Link to="/product/config/size">Kích cỡ</Link>,
  },
  {
    key: "3",
    label: <Link to="/product/config/color">Màu sắc</Link>,
  },
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onChange = (value) => {
  console.log("onChange: ", value);
};

const onChangeComplete = (value) => {
  console.log("onChangeComplete: ", value);
};
function Product() {
  return (
    <div className="container m-auto">
      <div className="flex gap-3">
        <Button>Thêm sản phẩm</Button>
        <Dropdown
          menu={{
            items,
          }}
        >
          <SettingOutlined />
        </Dropdown>
      </div>
      <h4 className="text-center text-main font-bold text-xl m-3">Sản phẩm</h4>
      <div className="filter flex justify-between items-center mb-3">
        <div className="flex  items-center  gap-3">
          <div>
            <span>Danh mục: </span>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
              ]}
            />
          </div>
          <div>
            <span>Sắp xếp: </span>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
              ]}
            />
          </div>
          <div className="flex  items-center gap-3 ">
            <span>Giá: </span>
            <Slider
              className="w-[210px]"
              defaultValue={0}
              step={50000}
              max={5000000}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
          </div>
        </div>
        <Button>Lọc</Button>
      </div>
      <Row gutter={[16, 16]} className="overflow-hidden">
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
        <ProductKaban />
      </Row>
      <br />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
    </div>
  );
}

export default Product;
