// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
// import { getUser } from '../store'
import { useSelector, useDispatch } from "react-redux";

// import Apis
import { GetNewsCategories } from "../../../../core/Services/api/News/GetNewsCategories/index";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Alert,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// ** User View Components
// import BlogsDetailTab from './../../../apps/components/tabs/BlogsDetailTab'
// import PlanCard from './PlanCard'
import BlogsDetailInfoCard from "../../../apps/components/cards/BlogsDetailInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import NewsCategoryManagmentTables from "../../../apps/components/table/blogTable/newsCategoryManagmentTableComponents";
import { Book, Search } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import NewsCategoryManagmentInputGroup from "../../../forms/form-elements/input-groups/InputGroupBasic.js";

const NewsCategoryManagment = () => {
  // ** Store Vars
  // const store = useSelector(state => state.users)
  // const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  // useEffect(() => {
  //   dispatch(getUser(parseInt(id)))
  // }, [dispatch])

  const [active, setActive] = useState("1");
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const { data } = useQuery({
    queryKey: ["newsCategories"],
    queryFn: GetNewsCategories,
  });
  const [categories, setCategories] = useState([]);
  const [newsCategoryId, setNewsCategoryId] = useState(data?.id);
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const NewsCategoryManagmentThList = ["نام دسته بندی", "عنوان گوگل", "عملیات"];

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <StatsHorizontal
            icon={<Book size={21} />}
            color="primary"
            stats={categories?.length}
            statTitle="مجموع دسته بندی ها"
          />
          <Button.Ripple
            className="w-100"
            color="primary"
            onClick={() => {
              setAddCategoryModal(!addCategoryModal);
            }}
          >
            افزودن دسته بندی خبر
          </Button.Ripple>
          <Modal
            isOpen={addCategoryModal}
            toggle={() => setAddCategoryModal(!addCategoryModal)}
          >
            <ModalHeader toggle={() => setAddCategoryModal(!addCategoryModal)}>
              ویرایش دسته بندی
            </ModalHeader>
            <ModalBody>
              <Col sm="12">
                <NewsCategoryManagmentInputGroup newsCategoryId={newsCategoryId} setNewsCategoryId={setNewsCategoryId}  />
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => setAddCategoryModal(!addCategoryModal)}
              >
                ثبت تغییرات
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <InputGroup className="input-group-merge">
            <Input
              placeholder="جستوجو کنید ..."
              //   value={searchInput}
              //   onChange={(e) => {
              //     setSearchInput(e.target.value);
              //   }}
            />
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
          </InputGroup>
          <NewsCategoryManagmentTables
            thList={NewsCategoryManagmentThList}
            apiData={categories}
            dataId={newsCategoryId}
          />
        </Col>
      </Row>
    </div>
    // ) : (
    //   <Alert color='danger'>
    //     <h4 className='alert-heading'>User not found</h4>
    //     <div className='alert-body'>
    //       User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
    //     </div>
    //   </Alert>
  );
};
export default NewsCategoryManagment;

// // ** React Imports
// import { Fragment, useState, useEffect } from "react";

// // ** Third Party Components
// import instance from "../../../../core/interseptor/Interseptor";
// import classnames from "classnames";
// import {
//   Share2,
//   GitHub,
//   Gitlab,
//   Twitter,
//   Bookmark,
//   Facebook,
//   Linkedin,
//   CornerUpLeft,
//   MessageSquare,
// } from "react-feather";

// // ** Utils
// import { kFormatter } from "@utils";

// // ** Custom Components
// import Sidebar from "../BlogSidebar";
// import Avatar from "@components/avatar";
// import Breadcrumbs from "@components/breadcrumbs";

// // ** Reactstrap Imports
// import {
//   Row,
//   Col,
//   Card,
//   Form,
//   Badge,
//   Input,
//   Label,
//   Button,
//   CardImg,
//   CardBody,
//   CardText,
//   CardTitle,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   UncontrolledDropdown,
// } from "reactstrap";

// // ** Styles
// import "@styles/base/pages/page-blog.scss";

// // ** Images
// import { useParams } from "react-router-dom";
// import BlogDetailSidebar from "./BlogDetailSidebar";
// import Tabs from "./../../../apps/components/tabs/index";
// import UserTabs from "./../../../../@core/components/user/view/Tabs";
// import BlogsDetailTab from "./../../../apps/components/tabs/BlogsDetailTab";
// import { Book } from "react-feather";
// import { Search } from "react-feather";
// import NewsCategoryManagmentTab from "./NewsCategoryManagmentTab";
// import Tables from "../../../apps/components/table/blogTable";
// import { CreateNewsCategoryApi } from "../../../../core/Services/api/News/CreateNewsCategory";
// import NewsCategoryManagmentTables from "../../../apps/components/table/blogTable/newsCategoryManagmentTableComponents";
// import { GetNewsCategories } from "../../../../core/Services/api/News/GetNewsCategories";

// const BlogDetails = () => {
//   // ** States
//   const [data, setData] = useState(null);
//   const {id} = useParams();

//   const detailItems = data?.detailsNewsDto;

//   useEffect(() => {
//     instance
//       .get(`/News/${id}`)
//       .then((res) => setData(res.data));
//   }, [id]);

//   const badgeColorsArr = {
//     Quote: "light-info",
//     Fashion: "light-primary",
//     Gaming: "light-danger",
//     Video: "light-warning",
//     Food: "light-success",
//   };

//   const renderTags = () => {
//     return detailItems?.keyword?.split(" ").map((tag, index) => {
//       return (
//         <a key={index} href="/" onClick={(e) => e.preventDefault()}>
//           <Badge
//             className={classnames({
//               "me-50": index !== detailItems?.keyword?.length - 1,
//             })}
//             color={badgeColorsArr[tag]}
//             pill
//           >
//             {tag}
//           </Badge>
//         </a>
//       );
//     });
//   };

//   return (
//     <Fragment>
//       <Breadcrumbs
//         title="جزییات خبر"
//         data={[{ title: "صفحات" }, { title: "اخبار" }, { title: "جزییات" }]}
//       />
//       <div className="blog-wrapper">
//         <div className="content-detached content-left">
//           <div className="content-body">
//             {data !== null ? (
//               <Row>
//                 <Col sm="12">
//                   <Card className="mb-3">
//                     <CardImg src={detailItems?.currentImageAddress} className="img-fluid" top />
//                     <CardBody>
//                       <CardTitle tag="h4">{detailItems?.title}</CardTitle>
//                       <div className="d-flex">
//                         <Avatar
//                           className="me-50"
//                           img={detailItems?.currentImageAddress}
//                           imgHeight="24"
//                           imgWidth="24"
//                         />
//                         <div>
//                           <small className="text-muted me-25">by</small>
//                           <small>
//                             <a
//                               className="text-body"
//                               href="/"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               {detailItems?.addUserFullName}

//                             </a>
//                           </small>
//                           <span className="text-muted ms-50 me-25">|</span>
//                           <small className="text-muted">
//                             {detailItems?.insertDate}
//                           </small>
//                         </div>
//                       </div>
//                       <div className="my-1 py-25">{renderTags()}</div>
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: detailItems?.describe,
//                         }}
//                       ></div>

//                       <hr className="my-2" />
//                       <div className="d-flex align-items-center justify-content-between">
//                         <div className="d-flex align-items-center">
//                           <div className="d-flex align-items-cente">
//                             {/* <a href="/" onClick={(e) => e.preventDefault()}>
//                               <div className="text-body align-middle">
//                                 {data.news?.bookmarked}
//                               </div>
//                             </a> */}
//                           </div>
//                         </div>
//                         <UncontrolledDropdown className="dropdown-icon-wrapper">
//                           <DropdownToggle tag="span">
//                             <Share2
//                               size={21}
//                               className="text-body cursor-pointer"
//                             />
//                           </DropdownToggle>
//                           <DropdownMenu end>
//                             <DropdownItem className="py-50 px-1">
//                               <GitHub size={18} />
//                             </DropdownItem>
//                             <DropdownItem className="py-50 px-1">
//                               <Gitlab size={18} />
//                             </DropdownItem>
//                             <DropdownItem className="py-50 px-1">
//                               <Facebook size={18} />
//                             </DropdownItem>
//                             <DropdownItem className="py-50 px-1">
//                               <Twitter size={18} />
//                             </DropdownItem>
//                             <DropdownItem className="py-50 px-1">
//                               <Linkedin size={18} />
//                             </DropdownItem>
//                           </DropdownMenu>
//                         </UncontrolledDropdown>
//                       </div>
//                     </CardBody>
//                   </Card>
//                 </Col>
//                 {/* <Col sm="12" id="blogComment">
//                   <h6 className="section-label">Comment</h6>
//                   {renderComments()}
//                 </Col> */}

//               </Row>
//             ) : null}
//           </div>
//         </div>
//         <BlogDetailSidebar />
//       </div>
//     </Fragment>
//   );
// };

// export default BlogDetails;
