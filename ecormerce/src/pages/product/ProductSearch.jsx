import { Col, Row, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BaseApi } from "../../apis/BaseApi";
import Filter from "../../components/Filter";
import ProductCard from "../../components/ProductCard";
import { filterProduct } from "../../redux/productAction";
import { useDispatch } from "react-redux";

function ProductSearch() {
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  useEffect(() => {
    async function searchProduct() {
      try {
        const response = await BaseApi.post(
          "/api/products/search", // Your backend API URL
          null,
          {
            params: {
              searchValue: searchQuery,
              page: pagination.current - 1, // Pagination is zero-based on the backend
              limit: pagination.pageSize, // Use the current page size
            },
          }
        );
        setProducts(response.data);
        setPagination({
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: response.totalPages, // Assuming 'total' is the total number of products
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    searchProduct();
  }, [searchQuery, pagination.current, pagination.pageSize, pagination.total]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  return (
    <div className="container m-auto mt-10">
      <Row gutter={[24, 24]}>
        <Col sx={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
          <div className="flex justify-between items-center bg-gray-100 mb-3 p-3 rounded-sm">
            <div className="flex gap-2">
              <p>Bạn đang xem: </p>
              <h4 className="text-[#712258] font-bold">SẢN PHẨM</h4>
            </div>
          </div>
          <Row gutter={[24, 24]}>
            {products?.map((product) => (
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
            ))}
          </Row>

          {/* Ant Design Pagination */}
          <Pagination
            current={pagination.current}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={handlePaginationChange}
            showSizeChanger
            pageSizeOptions={["12", "20", "50"]}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ProductSearch;
