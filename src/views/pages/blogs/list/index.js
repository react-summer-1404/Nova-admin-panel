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
  }, [searchDelay, selectedSort]);

  return (
    <Fragment >
      <Row className="content-header row d-flex justify-content-end">
        <Col className="mb-1 d-flex justify-content-end align-items-center gap-1" md="6" sm="12">
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
