import { Carousel, Row } from "antd";
import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../redux/productAction";
import { useDispatch, useSelector } from "react-redux";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
function Home() {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container m-auto">
      <div>
        <Carousel autoplay arrows>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
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
          Sản phẩm mới
        </h4>
        <Row gutter={[24, 24]}>
          {/* <ProductCard xs={24} sm={24} md={8} lg={6} xl={6} xxl={4} /> */}
        </Row>
      </div>
    </div>
  );
}

export default Home;
