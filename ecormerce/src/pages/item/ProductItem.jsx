import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseApi, BASEURL } from "../../apis/BaseApi";
import ProductCard from "../../components/ProductCard";
import { openNotification } from "../catalog/CatalogConf";

function ProductItem() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productRelative, setProductRelative] = useState([]);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [count, setCount] = useState(1);
  useEffect(() => {
    BaseApi.get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        BaseApi.get(
          `/api/products/category/${response.data.categories.id}`
        ).then((response) => {
          setProductRelative(response.data);
        });
      })
      .catch((error) => console.error(error));
  }, [id]);

  const changeCount = (status) => {
    if (status === true) {
      setCount(count + 1);
    } else if (status === false && count > 1) {
      setCount(count - 1);
    }
  };
  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await BaseApi.post(`/api/carts`, {
        totalPrice: product.price,
        quantity: count,
        userId: user.id,
        productId: product.id,
        size: size,
        color: color,
      });
      openNotification(res.message);
    } catch (error) {
      openNotification("That bai");
    }
  };
  return (
    <div className="container mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sản phẩm: {product?.name}</h2>
      <p className="mb-2 text-gray-700">Mô tả: {product?.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg text-gray-900 font-semibold">
          Giá: {product?.price} VND
        </span>
        <span className="text-lg text-gray-900">
          Số lượng: {product?.quantity}
        </span>
      </div>
      <div className="mb-4">
        <span className="px-2 py-1 text-sm rounded-md bg-green-500 text-white">
          Trạng thái:{product?.status ? "Còn hàng" : "Hết hàng"}
        </span>
      </div>
      <div className="mb-4">
        <span className="text-gray-700">
          Danh mục: {product?.category?.name}
        </span>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Hình ảnh sản phẩm:</h3>
        <div className="grid grid-cols-6 gap-4">
          {product?.images?.map((image, index) => (
            <img
              key={index}
              src={`${BASEURL}/images/${image.imageUrl}`}
              alt={`Image ${index + 1}`}
              className={`w-full h-40 object-cover rounded-md`}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Màu sắc:</h3>
        <div className="flex space-x-4">
          {product?.colors?.map((c, index) => (
            <span
              key={index}
              style={{
                backgroundColor: c.name,
              }}
              className={`w-8 h-8 rounded-full inline-block ${
                color === c.name ? "border-2 border-main" : ""
              }`}
              onClick={() => {
                setColor(c.name);
              }}
            ></span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Kích cỡ:</h3>
        <div className="flex space-x-4">
          {product?.sizes?.map((s, index) => (
            <span
              key={index}
              onClick={() => setSize(s.name)}
              className={`px-3 py-1 bg-gray-200 rounded-md ${
                size === s.name ? "border-2 border-main" : ""
              }`}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <button onClick={() => changeCount(false)} className="border px-3 py-2">
          -
        </button>
        <span className="p-2">{count}</span>
        <button onClick={() => changeCount(true)} className="border px-3 py-2 ">
          +
        </button>
        <div className="mt-2">
          <button
            onClick={() => addToCart()}
            className="bg-main  pt-2 pb-2 ps-5 pe-5 shadow-lg rounded-sm text-white font-bold "
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Sản phẩm liên quan:</h3>
        <Row gutter={[24, 24]}>
          {productRelative?.map((product) => {
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
      </div>
    </div>
  );
}

export default ProductItem;
