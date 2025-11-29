// ** Custom Components
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Spinner,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
// ** Reactstrap Imports
import { Table } from "reactstrap";
import { listMyCourse } from "../../../../core/Services/api/CourseListApi";
import defaultpPic from "../../../../assets/images/defalt.png";
import { Search } from "react-feather";
import { useDebounce } from "use-debounce";

const MyCoursesTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const RowsOfPage = 12;
  const [selectType, setSelectType] = useState("");
  const [selectCol, setSelectCol] = useState("");
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 500);

  const apiParams = {
    PageNumber: page,
    RowsOfPage: RowsOfPage,
    Query: searchDebounce,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["muCourses", apiParams],
    queryFn: () => listMyCourse(apiParams),
  });
  const sortToggleText = [
    { label: "صعودی", key: "asc" },
    { label: "نزولی", key: "desc" },
  ];
  const sortColToggleText = [
    { label: "فعال", key: "active" },
    { label: "قیمت", key: "cost" },
  ];

  return (
    <>
      <div className="content-detached content-right">
        <div className="content-body">
          <div className="ecommerce-header-items">
            <div className="view-options d-flex ms-auto">
              {/* Sort Type */}
              <UncontrolledButtonDropdown className="dropdown-sort me-2">
                <DropdownToggle color="primary" outline caret>
                  {sortToggleText[0].label || "مرتب‌سازی"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => setSelectType(sortToggleText[0])}
                  >
                    صعودی
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectType(sortToggleText[1])}
                  >
                    نزولی
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              {/* Sort Column */}
              <UncontrolledButtonDropdown className="dropdown-sort">
                <DropdownToggle color="primary" outline caret>
                  {sortColToggleText[0].label || "ستون"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => setSelectCol(sortColToggleText[0])}
                  >
                    فعال
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectCol(sortColToggleText[1])}
                  >
                    قیمت
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
          <div id="ecommerce-searchbar" className="ecommerce-searchbar">
            <Row className="mt-1">
              <Col sm="12">
                <InputGroup className="input-group-merge">
                  <Input
                    className="search-product"
                    placeholder="Search Product"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <InputGroupText>
                    <Search className="text-muted" size={14} />
                  </InputGroupText>
                </InputGroup>
              </Col>
            </Row>
          </div>
          <Table hover responsive style={{marginTop:20}}>
            <thead>
              <tr>
                <th>عکس دوره</th>
                <th>نام دوره</th>
                <th>توضیحات</th>
                <th>نام استاد</th>
                <th>قیمت</th>
                <th>وضعیت پرداخت</th>
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
                data?.listOfMyCourses?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link
                        to={`/apps/ecommerce/product-detail/${item.courseId}`}
                      >
                        <img
                          className="me-75 rounded"
                          src={item.tumbImageAddress || defaultpPic}
                          alt={item.name}
                          height="30"
                          width="30"
                        />
                      </Link>
                    </td>
                    <td className="fw-bold text-black">{item.courseTitle}</td>

                    <td>
                      <p style={{ color: "#7367f0" }}>{item.desc}</p>
                    </td>

                    <td>
                      <p>{item.fullName}</p>
                    </td>
                    <td>
                      <p>{item.cost}</p>
                    </td>

                    <td>
                      {item.paymentStatus == "پرداخت نشده" ? (
                        <Badge color="light-warning">
                          {item.paymentStatus}
                        </Badge>
                      ) : (
                        <Badge color="light-success">
                          {item.paymentStatus}
                        </Badge>
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
          {data?.totalCount && (
            <Pagination className="d-flex justify-content-center mt-2">
              {/* <PaginationItem disabled={page === 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page - 1);
                  }}
                >
                  قبلی
                </PaginationLink>
              </PaginationItem> */}

              {Array.from({
                length: Math.ceil(data.totalCount / RowsOfPage),
              }).map((_, index) => (
                <PaginationItem key={index} active={page === index + 1}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* <PaginationItem
                disabled={page === Math.ceil(data.totalCount / RowsOfPage)}
              >
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  بعدی
                </PaginationLink>
              </PaginationItem> */}
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};
export default MyCoursesTable;
