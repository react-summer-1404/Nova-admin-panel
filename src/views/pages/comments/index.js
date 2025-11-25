// ** React Imports
import { Link } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";

// ** Instance
import instance from './../../../core/interseptor/Interseptor';

// ** Third Party Components
import classnames from "classnames";
import { MessageSquare } from "react-feather";
import * as Icon from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";

// ** Custom Components
import Sidebar from "../blogs/BlogSidebar";
import Avatar from "@components/avatar";

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
import Tables from "../../tables/reactstrap";


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

  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };
  const renderRenderList = () => {
    return data?.news?.map((item) => {
      const renderTags = () => {
        const tags = item?.keyword?.split(" ");
        return tags.map((tag, index) => {
          return (
            <a key={index} href="/" onClick={(e) => e.preventDefault()}>
              <Badge
                className={classnames({
                  "me-50": index !== item?.keyword?.length - 1,
                })}
                color={badgeColorsArr[tag]}
                pill
              >
                {tag}
              </Badge>
            </a>
          );
        });
      };

      return (
        <Col key={item.title} md="6">
          <Card>
            <Link to={`/pages/blog/detail/${item.id}`}>
              <CardImg
                className="img-fluid"
                src={item.currentImageAddress || HandleImgError}
                onError={(e) => (e.target.src = HandleImgError)}
                alt={item.title}
                top
              />
            </Link>
            <CardBody>
              <CardTitle tag="h4">
                <Link
                  className="blog-title-truncate text-body-heading"
                  to={`/pages/blog/detail/${item.id}`}
                >
                  {item.title}
                </Link>
              </CardTitle>
              <div className="d-flex">
                <Avatar
                  className="me-50"
                  img={item.addUserProfileImage}
                  imgHeight="24"
                  imgWidth="24"
                />
                <div>
                  <small className="text-muted me-25">by</small>
                  <small>
                    <a
                      className="text-body"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.addUserFullName}
                    </a>
                  </small>
                  <span className="text-muted ms-50 me-25">|</span>
                  <small className="text-muted">{item.updateDate}</small>
                </div>
              </div>
              <div className="my-1 py-25">{renderTags()}</div>
              <CardText className="blog-content-truncate">
                {item.miniDescribe}
              </CardText>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className="text-body me-50" />
                  <span className="text-body fw-bold">
                    {item.comment} Comments
                  </span>
                </Link>
                <Link className="fw-bold" to={`/pages/blog/detail/${item.id}`}>
                  Read More
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Fragment>
      <Row className="w-50 content-header row">
        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label">مرتب سازی بر اساس</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            defaultValue={sortOption1[1]}
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
        <div className="content-detached content-left">
          <div className="content-body">
            {data !== null ? (
              <div className="blog-list-wrapper">
                <Tables blogId={blogId} blogsData={data}/>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Sidebar blogId={blogId} blogsData={data}/>
    </Fragment>
  );
};

export default BlogList;
