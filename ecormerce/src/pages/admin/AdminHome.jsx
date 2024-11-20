import React, { useEffect, useState } from "react";
import { BaseApi } from "../../apis/BaseApi";
import { Col, Row, Table } from "antd";
import BarChart from "./BarChart";
import BarChartProduct from "./BarChartProduct";

function AdminHome() {
  const [product, setProduct] = useState([]);
  const [sales, setSales] = useState([]);
  const [topCustomer, setTopCustomer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduct = await BaseApi.get("/api/products/top-selling");
        setProduct(resProduct);
        const resSales = await BaseApi.get("/api/invoices/totals-by-month");
        setSales(resSales);
        const resTopCustomer = await BaseApi.get("/api/invoices/top-customers");
        setTopCustomer(resTopCustomer);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Khách hàng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tổng số tiền đã chi",
      dataIndex: "totalAmountSpent",
      key: "totalAmountSpent",
      render: (amount) => `${amount.toLocaleString()} VND`, // Định dạng tiền tệ
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {/* Biểu đồ doanh thu */}
      <Col xs={24} md={12}>
        <div style={{ width: "100%", height: "400px" }}>
          <BarChart data={sales} />
        </div>
      </Col>

      {/* Biểu đồ sản phẩm */}
      <Col xs={24} md={12}>
        <div style={{ width: "100%", height: "400px" }}>
          <BarChartProduct data={product} />
        </div>
      </Col>

      {/* Bảng top khách hàng */}
      <Col xs={24}>
        <h2>Khách hàng chi tiêu nhiều nhất</h2>
        <Table
          dataSource={topCustomer}
          columns={columns}
          rowKey="id" // Giả định "id" là duy nhất
          pagination={{ pageSize: 5 }} // Phân trang
        />
      </Col>
    </Row>
  );
}

export default AdminHome;
