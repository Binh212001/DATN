import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct, findByCatId } from "../../redux/productAction";
import { useParams } from "react-router-dom";

function Catalog() {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const [price, setPrice] = useState(5000000);
  const [category, setCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterProduct({ price, category, sizes, id }));
  }, [dispatch, price, sizes, category, id]);
  const handleChangePrice = (p) => {
    setPrice(p);
  };

  const handleCategoryChange = (value) => {
    if (category.includes(value)) {
      const index = category.indexOf(value);
      const cat = category.filter((c) => c !== category[index]);
      setCategory(cat);
    } else {
      setCategory((prev) => [...prev, parseInt(value)]);
    }
  };

  const handleSizeChange = (value) => {
    if (sizes.includes(value)) {
      const index = sizes.indexOf(value);
      const sz = sizes.filter((c) => c !== sizes[index]);
      setSizes(sz);
    } else {
      setSizes((prev) => [...prev, parseInt(value)]);
    }
  };

  return (
    <div className="container m-auto mt-10">
      <Row gutter={[24, 24]}>
        <Col sx={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
          <Filter
            category={category}
            sz={sizes}
            handleCategoryChange={handleCategoryChange}
            handleSizeChange={handleSizeChange}
            handleChangePrice={handleChangePrice}
          />
        </Col>
        <Col sx={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
          <div className="flex justify-between items-center bg-gray-100 mb-3 p-3 rounded-sm">
            <div className="flex gap-2">
              <p>Bạn đang xem: </p>
              <h4 className="text-[#712258] font-bold">SẢN PHẨM</h4>
            </div>
          </div>
          <Row gutter={[24, 24]}>
            {products?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  xs={24}
                  sm={24}
                  md={8}
                  lg={6}
                  xl={6}
                  xxl={4}
                  item={product}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Catalog;
