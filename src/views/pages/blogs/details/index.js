// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import instance from "../../../../core/interseptor/Interseptor";
import classnames from "classnames";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
} from "react-feather";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import cmtImg from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import { useParams } from "react-router-dom";
import EditUserExample from "../../../modal-examples/EditBlog";
import EditBlogExample from "../../../modal-examples/EditBlog";
import BlogDetailSidebar from "./BlogDetailSidebar";

const BlogDetails = () => {
  // ** States

  const [data, setData] = useState(null);
  
  const {id} = useParams();

  const detailItems = data?.detailsNewsDto;

  useEffect(() => {
    instance
      .get(`/News/${id}`)
      .then((res) => setData(res.data));
  }, [id]);

  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  const renderTags = () => {
    return detailItems?.keyword?.split(" ").map((tag, index) => {
      return (
        <a key={index} href="/" onClick={(e) => e.preventDefault()}>
          <Badge
            className={classnames({
              "me-50": index !== detailItems?.keyword?.length - 1,
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

  // const renderComments = () => {
  //   return data.comments.map((comment) => {
  //     return (
  //       <Card className="mb-3" key={comment.userFullName}>
  //         <CardBody>
  //           <div className="d-flex">
  //             <div>
  //               <Avatar
  //                 className="me-75"
  //                 img={comment.avatar}
  //                 imgHeight="38"
  //                 imgWidth="38"
  //               />
  //             </div>
  //             <div>
  //               <h6 className="fw-bolder mb-25">{comment.userFullName}</h6>
  //               <CardText>{comment.commentedAt}</CardText>
  //               <CardText>{comment.commentText}</CardText>
  //               <a href="/" onClick={(e) => e.preventDefault()}>
  //                 <div className="d-inline-flex align-items-center">
  //                   <CornerUpLeft size={18} className="me-50" />
  //                   <span>Reply</span>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </CardBody>
  //       </Card>
  //     );
  //   });
  // };

  return (
    <Fragment>
      <Breadcrumbs
        title="جزییات خبر"
        data={[{ title: "صفحات" }, { title: "اخبار" }, { title: "جزییات" }]}
      />
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {data !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardImg src={detailItems?.currentImageAddress} className="img-fluid" top />
                    <CardBody>
                      <CardTitle tag="h4">{detailItems?.title}</CardTitle>
                      <div className="d-flex">
                        <Avatar
                          className="me-50"
                          img={detailItems?.currentImageAddress}
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
                              {detailItems?.addUserFullName}
                              
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">
                            {detailItems?.insertDate}
                          </small>
                        </div>
                      </div>
                      <div className="my-1 py-25">{renderTags()}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: detailItems?.describe,
                        }}
                      ></div>
                     
                      <hr className="my-2" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-cente">
                            {/* <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {data.news?.bookmarked}
                              </div>
                            </a> */}
                          </div>
                        </div>
                        <UncontrolledDropdown className="dropdown-icon-wrapper">
                          <DropdownToggle tag="span">
                            <Share2
                              size={21}
                              className="text-body cursor-pointer"
                            />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem className="py-50 px-1">
                              <GitHub size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Gitlab size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Facebook size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Twitter size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Linkedin size={18} />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                {/* <Col sm="12" id="blogComment">
                  <h6 className="section-label">Comment</h6>
                  {renderComments()}
                </Col> */}
                
              </Row>
            ) : null}
          </div>
        </div>
        <BlogDetailSidebar />
      </div>
    </Fragment>
  );
};

export default BlogDetails;
