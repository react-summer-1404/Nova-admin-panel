// ** Custom Components
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Badge } from "reactstrap";
// ** Reactstrap Imports
import { Table } from "reactstrap";

const CourseReserveList = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("all");

  const acceptedList = data?.filter((item) => item.accept);
  const notAcceptedList = data?.filter((item) => !item.accept);

  const listToShow =
    filterType === "accepted"
      ? acceptedList
      : filterType === "notAccepted"
      ? notAcceptedList
      : data;
  //   console.log("accept", listToShow);
  //   console.log("notAcceptedList", notAcceptedList);
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
                listToShow?.map((item) => (
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
        </div>
      </div>
    </>
  );
};
export default CourseReserveList;
