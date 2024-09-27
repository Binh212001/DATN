import { Card, Col } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../apis/BaseApi";

function ProductCard({ xs, sm, md, lg, xl, xxl, item }) {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
      <Link to={`/product/item/${item?.id}`}>
        <Card
          className="relative overflow-hidden"
          hoverable
          cover={
            <img
              alt="example"
              src={`${BASEURL}/images/${
                item.images.length > 0 ? item.images[0].imageUrl : ""
              }`}
            />
          }
        >
          <Meta title="Europe Street beat" />
          <div className="flex  flex-wrap mt-2">
            {item.colors.map((c) => (
              <span
                className="size-7   rounded-full"
                style={{
                  backgroundColor: c.name,
                }}
              ></span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600 text-red-500 font-bold">
              {item.price}
            </span>
            <span className="text-gray-500 font-bold">200 đã bán</span>
          </div>
          <span className="absolute bg-red-700 text-white font-bold top-2 right-2 px-1 rounded-full">
            - 50%
          </span>
        </Card>
      </Link>
    </Col>
  );
}

export default ProductCard;
