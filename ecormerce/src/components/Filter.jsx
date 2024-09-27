import { Collapse, Typography } from "antd";
import React from "react";
import PriceRange from "./PriceRange";
import CatalogList from "./CatalogList";
import SizeList from "./SizeList";

function Filter({ handleCategoryChange, handleSizeChange, handleChangePrice }) {
  const items = [
    {
      key: "1",
      label: (
        <Typography.Title type="danger" level={5}>
          DANH MỤC
        </Typography.Title>
      ),
      children: <CatalogList handleCategoryChange={handleCategoryChange} />,
      showArrow: false,
    },
    {
      key: "2",
      label: (
        <Typography.Title type="danger" level={5}>
          GIÁ
        </Typography.Title>
      ),
      children: <PriceRange handleChangePrice={handleChangePrice} />,
      showArrow: false,
    },
    {
      key: "3",
      label: (
        <Typography.Title type="danger" level={5}>
          KÍCH THƯỚC
        </Typography.Title>
      ),
      children: <SizeList handleSizeChange={handleSizeChange} />,
      showArrow: false,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse
      className="bg-transparent"
      bordered={false}
      items={items}
      defaultActiveKey={["1", "2", "3"]}
      onChange={onChange}
    />
  );
}

export default Filter;
