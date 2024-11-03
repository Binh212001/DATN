import { Pagination } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/userAction";
import { useNavigate } from "react-router-dom";

const KanbanBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(80); // Number of users per page
  const navigate = useNavigate();
  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  useEffect(() => {
    dispatch(
      getAll({
        page: currentPage,
        limit: pageSize,
        searchTerm: searchTerm,
      })
    );
  }, [pageSize, currentPage, searchTerm, dispatch]);
  const { users, totalElements } = useSelector((state) => state.user);

  return (
    <div className="container m-auto p-4">
      <div className="flex justify-end mb-3">
        <Search
          placeholder="Search users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-auto mb-4"
          enterButton
        />
      </div>

      {/* User List Grid */}
      <div className="grid grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate("/user/" + user.id)}
            className="flex items-center p-4 bg-white shadow rounded-lg space-x-4"
          >
            {/* User Avatar */}
            <img
              src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
              alt={user.fullName}
              className="w-16 h-16 rounded-full"
            />
            {/* User Information */}
            <div>
              <div className="text-lg font-medium text-gray-800">
                {user.fullName}
              </div>
              <div className="text-sm text-gray-500">Role:{user.role}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Component */}
      <div className="flex justify-center">
        <Pagination
          className="mt-4 "
          current={currentPage}
          pageSize={pageSize}
          total={totalElements}
          showSizeChanger
          onChange={onPageChange}
          onShowSizeChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
