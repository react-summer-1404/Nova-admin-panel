// ** Custom Components
import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Badge } from "reactstrap";
// ** Reactstrap Imports
import { Table } from "reactstrap";

const CourseReserveList = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("all");
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const acceptedList = data?.filter((item) => item.accept);
  const notAcceptedList = data?.filter((item) => !item.accept);

  const listToShow =
    filterType === "accepted"
      ? acceptedList
      : filterType === "notAccepted"
      ? notAcceptedList
      : data;

      const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const pageCount = Math.ceil((data?.length || 0) / perPage);
    
      const CustomPagination = () => (
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName="active"
          forcePage={currentPage - 1}
          onPageChange={(page) => handlePagination(page.selected + 1)}
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        />
      );
    
      const dataToRender = listToShow?.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      );
  return (
    <>
      <div className="content-detached content-right">
        <div className="content-body">
          <div className="mb-2 d-flex gap-2">
            <Button
              color={filterType === "all" ? "primary" : "secondary"}
              onClick={() => setFilterType("all")}
            >
              همه
            </Button>
            <Button
              color={filterType === "accepted" ? "success" : "secondary"}
              onClick={() => setFilterType("accepted")}
            >
              تایید شده‌ها ({acceptedList?.length})
            </Button>

            <Button
              color={filterType === "notAccepted" ? "danger" : "secondary"}
              onClick={() => setFilterType("notAccepted")}
            >
              تایید نشده‌ها ({notAcceptedList?.length})
            </Button>
          </div>

          <Table hover responsive>
            <thead>
              <tr>
                <th>نام دانشجو</th>
                <th>نام دوره</th>
                <th>وضعیت</th>
                <th>اقدام</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="d-flex justify-content-center">
                    <Spinner color="primary" />
                  </td>
                </tr>
              ) : (
                dataToRender?.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold text-black">{item.studentName}</td>

                    <td>
                      <p style={{ color: "#7367f0" }}>{item.courseName}</p>
                    </td>

                    <td>
                      {item.accept ? (
                        <Badge color="light-success">تایید شده</Badge>
                      ) : (
                        <Badge color="light-danger">تایید نشده</Badge>
                      )}
                    </td>

                    <td>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/apps/ecommerce/product-detail/${item.courseId}`
                          )
                        }
                      >
                        جزییات
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <CustomPagination />
        </div>
      </div>
    </>
  );
};
export default CourseReserveList;
