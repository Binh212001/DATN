import { Carousel, Row } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts, getProductSale } from "../../redux/productAction";
import { useDispatch, useSelector } from "react-redux";

import ao_gio_thong_minh from "../../assets/images/ao_gio_thong_minh.webp";
import ao_phao from "../../assets/images/ao_phao.webp";
const contentStyle = {
  height: "500px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  background: "#364d79",
};
const slide = [
  {
    image: ao_gio_thong_minh,
  },
  {
    image: ao_phao,
  },
];
function Home() {
  const { products } = useSelector((state) => state.product);
  const { productSale } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductSale());
  }, [dispatch]);

  return (
    <div className="container m-auto">
      <div>
        <Carousel autoplay arrows>
          {slide.map((item) => (
            <div>
              <h3
                style={{
                  ...contentStyle,
                  backgroundSize: "cover",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    backgroundSize: "cover",
                  }}
                />
              </h3>
            </div>
          ))}
        </Carousel>
      </div>
      <div>
        <h4 className="text-center text-main font-bold text-xl m-3">
          Sản phẩm khuyến mãi
        </h4>
        <Row gutter={[24, 24]}>
          {products &&
            products.map((p) => {
              return (
                <ProductCard
                  key={p.id}
                  xs={24}
                  sm={24}
                  md={8}
                  lg={6}
                  xl={6}
                  xxl={4}
                  item={p}
                />
              );
            })}
        </Row>
      </div>

      <div className="sale ">
        <h4 className="text-center text-main font-bold text-xl m-3">
          {/* Sản phẩm mới */}
        </h4>
        <Row gutter={[24, 24]}>
          <Row gutter={[24, 24]}>
            {productSale &&
              productSale.map((p) => {
                return (
                  <ProductCard
                    key={p.id}
                    xs={24}
                    sm={24}
                    md={8}
                    lg={6}
                    xl={6}
                    xxl={4}
                    item={p}
                  />
                );
              })}
          </Row>
        </Row>
      </div>
    </div>
  );
}

export default Home;
