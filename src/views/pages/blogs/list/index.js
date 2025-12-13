// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Instance
import instance from "../../../../core/interseptor/Interseptor";

// ** Third Party Components
import * as Icon from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useDebounce } from "use-debounce";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Tables from "../../../apps/components/table/blogTable";

// ** Reactstrap Imports
import { Row, Col, InputGroup, InputGroupText, Input, Label } from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

const sortOption1 = [
  { value: { col: "insertDate", type: "DESC" }, label: "جدیدترین" },
  { value: { col: "insertDate", type: "ASC" }, label: "قدیمی ترین ها" },
  { value: { col: "currentView", type: "DESC" }, label: "پربازدیدترین ها" },
  { value: { col: "newsRate", type: "DESC" }, label: "محبوب ترین ها" },
];

const BlogList = () => {
  // ** States
  const [data, setData] = useState(null);
  const [blogId, detBlogId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsOfthePage, setRowsOfthePage] = useState(10);
  const [selectedSort, setSelectedSort] = useState(sortOption1[0]);
  const [searchInput, setSearchInput] = useState("");
  const [searchDelay] = useDebounce(searchInput, 500);

  const apiParams = {
    NewsCategoryId: blogId,
    RowsOfPage: rowsOfthePage,
    PageNumber: pageNumber,
    Query: searchDelay,
    SortType: selectedSort?.value?.type,
    SortingCol: selectedSort?.value?.col,
  };

  useEffect(() => {
    instance
      .get("/News/AdminNewsFilterList", { params: apiParams })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, [
    searchDelay,
    selectedSort,
    rowsOfthePage,
    pageNumber,
  ]);

  return (
    <Fragment>
      <Row className="content-header row d-flex justify-content-end">
        <Col
          className="mb-1 d-flex justify-content-end align-items-center gap-1"
          md="6"
          sm="12"
        >
          <Label className="form-label">مرتب سازی بر اساس</Label>
          <Select
            theme={selectThemeColors}
            className="w-50 react-select"
            classNamePrefix="select"
            // defaultValue={sortOption1[1]}
            value={selectedSort}
            onChange={(option) => {
              setSelectedSort(option);
            }}
            name="clear"
            options={sortOption1}
            isClearable
          />
        </Col>
      </Row>

      <div className="blog-wrapper">
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
        <div className="content-detached content-right">
          <div className="content-body">
            {data !== null ? (
              <div className="blog-list-wrapper">
                <Tables dataId={blogId} apiData={data} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Sidebar blogId={blogId} blogsData={data} />
    </Fragment>
  );
};

export default BlogList;
