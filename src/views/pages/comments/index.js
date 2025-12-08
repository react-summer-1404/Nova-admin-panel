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
// import Sidebar from "../blogs/BlogSidebar";
import Avatar from "@components/avatar";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import { useDebounce } from "use-debounce";
// import Tables from "../../tables/reactstrap/blogTable";
import CommentTables from "../../tables/reactstrap/commentTable";

// ** Icons

// const sortOption1 = [
//   { value: { col: "insertDate", type: "DESC" }, label: "جدیدترین" },
//   { value: { col: "insertDate", type: "ASC" }, label: "قدیمی ترین ها" },
// ];

// const sortOption2 = [
//   { value: { col: "currentView", type: "DESC" }, label: "پربازدیدترین ها" },
//   { value: { col: "newsRate", type: "DESC" }, label: "محبوب ترین ها" },
// ];

const sortType = [
  { label: "ascending", key: "asc" },
  { label: "Descending", key: "desc" },
];

const sortCol1 = [
  { key: "Approved", label: "تایید شده" },
  { key: "Pending", label: "تایید نشده" },
];
const sortCol2 = [{ key: "Approved", label: "تعداد ریپلای" }];
const sortCol3 = [
  { key: "Approved", label: "تایید شده" },
  { key: "Pending", label: "تایید نشده" },
];

const Comments = () => {
  // ** States
  const [data, setData] = useState(null);
  const [commentId, detCommentId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsOfthePage, setRowsOfthePage] = useState(10);
  const [selectedSort, setSelectedSort] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [searchDelay] = useDebounce(searchInput, 500);

  const apiParams = {
    NewsCategoryId: commentId,
    RowsOfPage: rowsOfthePage,
    PageNumber: pageNumber,
    Query: searchDelay,
    SortType: selectedSort?.sortType?.key,
    SortingCol: selectedSort?.sortCol?.key,
  };

  useEffect(() => {
    instance
      .get("/Course/CommentManagment", { params: apiParams })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, [searchDelay, selectedSort]);

  const tableHeaderList = [
    "کاربر",
    "عنوان کامنت",
    "توضیحات کامنت",
    "نام دوره",
    "وضعیت",
    "پاسخ ها",
    "عملیات",
  ];

  console.log(data?.comments[0]?.accept);
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
            // defaultValue={sortOption1[1]}
            value={selectedSort}
            onChange={(option) => {
              setSelectedSort(option);
            }}
            name="clear"
            options={sortCol1}
            isClearable
          />
        </Col>
        <Col className="mb-1" md="4" sm="4">
          <Label className="form-label">مرتب سازی بر اساس</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            // defaultValue={sortOption2[1]}
            value={selectedSort}
            onChange={(option) => {
              setSelectedSort(option);
            }}
            name="clear"
            options={sortCol2}
            isClearable
          />
        </Col>
        <Col className="mb-1" md="4" sm="4">
          <Label className="form-label">مرتب سازی بر اساس</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            // defaultValue={sortOption2[1]}
            value={selectedSort}
            onChange={(option) => {
              setSelectedSort(option);
            }}
            name="clear"
            options={sortCol3}
            isClearable
          />
        </Col>
      </Row>
      <div className="blog-wrapper">
        <div className="blog-search mb-2">
          <InputGroup className="input-group-merge">
            <Input
              placeholder="جستوجو کنید ..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <InputGroupText>
              <Icon.Search size={14} />
            </InputGroupText>
          </InputGroup>
        </div>
        <div className="content-detached">
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
