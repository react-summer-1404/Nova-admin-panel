// ** React Imports
import { Link } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";

// ** Instance
import instance from "./../../../core/interseptor/Interseptor";

// ** Third Party Components
import classnames from "classnames";
import { MessageSquare } from "react-feather";
import * as Icon from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import { useDebounce } from "use-debounce";
// import Tables from "../../tables/reactstrap/blogTable";
import CommentTables from "../../tables/reactstrap/commentTable";

// ** Icons

const sortColOptions = [
  { value: "insertDate", label: "تاریخ بارگزاری" },
  { value: "currentView", label: "بازدید" },
];

const sortTypeOptions = [
  { value: "asc", label: "صعودی" },
  { value: "desc", label: "نزولی" },
];

const Comments = () => {
  // ** States
  const [data, setData] = useState(null);
  const [commentId, detCommentId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsOfthePage, setRowsOfthePage] = useState(10);
  const [selectedSortCol, setSelectedSortCol] = useState();
  const [selectedSortType, setSelectedSortType] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [searchDelay] = useDebounce(searchInput, 500);

  const apiParams = {
    NewsCategoryId: commentId,
    RowsOfPage: rowsOfthePage,
    PageNumber: pageNumber,
    Query: searchDelay,
    SortType: selectedSortType,
    SortingCol: selectedSortCol,
  };

  const handleSortChange = (option, setter) => {
    setter(option?.value || null);
  };

  useEffect(() => {
    instance
      .get("/Course/CommentManagment", { params: apiParams })
      .then(async (res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, [
    searchDelay,
    selectedSortCol,
    selectedSortType,
    rowsOfthePage,
    pageNumber,
  ]);

  useEffect(() => {
    console.log(apiParams);
  }, [selectedSortCol, selectedSortType, rowsOfthePage]);

  const tableHeaderList = [
    "کاربر",
    "عنوان کامنت",
    "توضیحات کامنت",
    "نام دوره",
    "وضعیت",
    "پاسخ ها",
    "عملیات",
  ];

  const approvedCommentCount = data?.comments?.filter(
    (appc) => appc.accept === true
  )?.length;

  const notApprovedCommentCount = data?.comments?.filter(
    (nappc) => nappc.accept === false
  ).length;

  return (
    <Fragment>
      <Row className="w-100 content-header row">
        <Col className="d-flex gap-2 justify-content-between">
          {/* Stats With Icons Horizontal */}
          <StatsHorizontal
            icon={<Icon.Send size={21} />}
            color="primary"
            stats={data?.totalCount}
            statTitle="مجموع نظرات"
          />

          <StatsHorizontal
            icon={<Icon.Check size={21} />}
            color="success"
            stats={approvedCommentCount}
            statTitle="نظرات تایید شده"
          />

          <StatsHorizontal
            icon={<Icon.XCircle size={21} />}
            color="danger"
            stats={notApprovedCommentCount}
            statTitle="نظرات تایید نشده"
          />

          {/* Stats With Icons Horizontal */}
        </Col>
      </Row>
      <Row className="w-100 content-header row">
        <Col className="mb-1" md="4" sm="4">
          <Label className="form-label">مرتب سازی بر اساس</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            value={
              sortTypeOptions.find((x) => x.value === selectedSortType) || null
            }
            onChange={(option) => handleSortChange(option, setSelectedSortType)}
            options={sortTypeOptions}
            isClearable
          />
        </Col>
        <Col className="mb-1" md="4" sm="4">
          <Label className="form-label">مرتب سازی بر اساس</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            value={
              sortColOptions.find((x) => x.value === selectedSortCol) || null
            }
            onChange={(option) => setSelectedSortCol(option?.value || null)}
            options={sortColOptions}
            isClearable
          />
        </Col>
      </Row>
      <div className="blog-wrapper">
        <div className="content-detached">
          <div className="invoice-list-table-header w-100 py-2">
            <Row>
              <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
                <div className="d-flex align-items-center me-2">
                  <label htmlFor="rows-per-page">نمایش</label>
                  <Input
                    type="select"
                    id="rows-per-page"
                    value={rowsOfthePage}
                    onChange={(e) => setRowsOfthePage(Number(e.target.value))}
                    className="form-control ms-50 pe-3"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="50">100</option>
                    {console.log("rowsOfthePage", rowsOfthePage)}
                  </Input>
                </div>
              </Col>
              <Col
                lg="6"
                className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
              >
                <div className="d-flex align-items-center">
                  <label htmlFor="search-invoice">جستوجو</label>
                  <Input
                    id="search-invoice"
                    className="ms-50 me-2 w-100"
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                    placeholder="جستوجو کنید ..."
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="content-body">
            {data !== null ? (
              <div className="blog-list-wrapper">
                <CommentTables
                  apiData={data}
                  dataId={commentId}
                  thList={tableHeaderList}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* <Sidebar blogId={blogId} blogsData={data} /> */}
    </Fragment>
  );
};

export default Comments;
