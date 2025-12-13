// ** React Imports
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";

// ** Third Party Components
import instance from "../../../core/interseptor/Interseptor";
import classnames from "classnames";
import * as Icon from "react-feather";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

const BlogSidebar = ({ blogId, blogsData }) => {
  const activeBlogsCount = () => {
    return blogsData?.news?.filter((item) => item.active === true).length;
  };
  const disableBlogsCount = () => {
    return blogsData?.news?.filter((item) => item.active === false).length;
  };
  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            <Row>
              
              <Col>
                {/* Stats With Icons Horizontal */}
                <StatsHorizontal
                  icon={<Icon.Book size={21} />}
                  color="primary"
                  stats={blogsData?.news?.length}
                  statTitle="تعداد کل اخبار و مقالات"
                />

                <StatsHorizontal
                  icon={<Icon.Activity size={21} />}
                  color="success"
                  stats={activeBlogsCount()}
                  statTitle="اخبار و مقالات فعال"
                />

                <StatsHorizontal
                  icon={<Icon.MinusCircle size={21}/>}
                  color="danger"
                  stats={disableBlogsCount()}
                  statTitle="اخبار و مقالات فعال"
                />

                {/* Stats With Icons Horizontal */}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogSidebar;

// ** States
// const [data, setData] = useState(null);
// const [pageNumber, setPageNumber] = useState(1);
// const [rowsOfthePage, setRowsOfthePage] = useState(10);
// const [searchInput, setSearchInput] = useState("");
// const [searchDelay] = useDebounce(searchInput, 500);

// const apiParams = {
//   RowsOfPage: rowsOfthePage,
//   PageNumber: pageNumber,
//   Query: searchDelay
// };

// useEffect(() => {
//   setData(searchDelay);
// }, [searchDelay]);

// useEffect(() => {
//   instance.get("/News", { params:apiParams }).then((res) => setData(res.data));
// }, [searchDelay, pageNumber, rowsOfthePage]);

// const CategoryColorsArr = {
//   Quote: "light-info",
//   Fashion: "light-primary",
//   Gaming: "light-danger",
//   Video: "light-warning",
//   Food: "light-success",
// };

// const renderRecentPosts = () => {
//   return data.news?.map((post, index) => {
//     return (
//       <div
//         key={index}
//         className={classnames("d-flex", {
//           "mb-2": index !== data.news?.length - 1,
//         })}
//       >
//         <Link className="me-2" to={`/pages/blog/detail/${post.id}`}>
//           <img
//             className="rounded"
//             src={post.currentImageAddress || HandleImgError}
//             alt={post.title}
//             width="100"
//             height="70"
//           />
//         </Link>
//         <div>
//           <h6 className="blog-recent-post-title">
//             <Link
//               className="text-body-heading"
//               to={`/pages/blog/detail/${post.id}`}
//             >
//               {post.title}
//             </Link>
//           </h6>
//           <div className="text-muted mb-0">{post.insertDate}</div>
//         </div>
//       </div>
//     );
//   });
// };

// const renderCategories = () => {
//   return data.categories?.map((item, index) => {
//     const IconTag = Icon[item.icon];

//     return (
//       <div
//         key={index}
//         className={classnames(
//           "d-flex justify-content-start align-items-center",
//           {
//             "mb-75": index !== data.categories?.length - 1,
//           }
//         )}
//       >
//         <a className="me-75" href="/" onClick={(e) => e.preventDefault()}>
//           <Avatar
//             className="rounded"
//             color={CategoryColorsArr[item.category]}
//             icon={<IconTag size={15} />}
//           />
//         </a>
//         <a href="/" onClick={(e) => e.preventDefault()}>
//           <div className="blog-category-title text-body">{item.category}</div>
//         </a>
//       </div>
//     );
//   });
// };

// return (
//   <div className="sidebar-detached sidebar-right">
//     <div className="sidebar">
//       <div className="blog-sidebar right-sidebar my-2 my-lg-0">
//         <div className="right-sidebar-content">
//           <div className="blog-search">
//             <InputGroup className="input-group-merge">
//               <Input placeholder="Search here" value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}/>
//               <InputGroupText>
//                 <Icon.Search size={14} />
//               </InputGroupText>
//             </InputGroup>
//           </div>
//           {data !== null ? (
//             <Fragment>
//               <div className="blog-recent-posts mt-3">
//                 <h6 className="section-label">Recent Posts</h6>
//                 <div className="mt-75">{renderRecentPosts()}</div>
//               </div>
//               <div className="blog-categories mt-3">
//                 <h6 className="section-label">Categories</h6>
//                 <div className="mt-1">{renderCategories()}</div>
//               </div>
//             </Fragment>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   </div>
// );
