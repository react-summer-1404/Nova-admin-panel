// ** React Imports
import { Suspense } from "react";
import { lazy } from "react";
import { Fragment, useState } from "react";

// ** Icons Imports
import {
  MessageCircle,
  Grid,
  List,
  CreditCard,
  Globe,
  UserCheck,
  Bookmark,
} from "react-feather";

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductsPage from "../../ecommerce/courses/Products";
import { useQuery } from "@tanstack/react-query";
import { getReserveListUsers, listCoursePayment } from "../../../../core/Services/api/CourseListApi";
// import { getProductsCourse } from "../../../../core/Services/api/getCourseList";
import CourseReserveList from "../../tables/CourseReserveList";
import CoursePayMentList from "../../tables/coursePayMentList";
import MyCoursesTable from "../../tables/myCoursesTaable";


const CoursesListTab = (props) => {
  {
    /* payment table */
  }

  // ** State
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const dispatch = useDispatch();

  const store = useSelector((state) => state.ecommerce);
  const courseId = useSelector((state) => state.ecommerce.productDetail.id);

  const { getProducts } = props;

  const { data, isLoading } = useQuery({
    queryKey: ["getReserveListUsers"],
    queryFn: getReserveListUsers,
    refetchOnWindowFocus:false
  });
  const { data: pays,isLoading:loading } = useQuery({
    queryKey: ["listOfWhoIsPay"],
    queryFn: listCoursePayment,
    refetchOnWindowFocus:false

  });
  // console.log("data",pays)
  // const courses = allProducts?.courseDtos || [];
  // const reservedCourses = courses?.find((item) =>item.courseId == data.courseId);
  // console.log("pays",pays)
  return (
    <Fragment>
      <Nav  pills justified style={{marginBottom:30}}>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            <Grid size={18} />
            <span className="align-middle">همه دوره ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            <Bookmark size={18} />
            <span className="align-middle">رزرو ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            <CreditCard size={18} />
            <span className="align-middle">پرداختی ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            <List size={18} />
            <span className="align-middle">دوره های من </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          {/* all course table */}
          <Suspense>
            <ProductsPage
              store={store}
              dispatch={dispatch}
              getProducts={getProducts}
            />
          </Suspense>
        </TabPane>

        <TabPane tabId="2">
          {/* reserve table */}
          <Suspense>
            <CourseReserveList
              data={data}
              isLoading={isLoading}
              courseId={courseId}
            />
          </Suspense>
        </TabPane>

        <TabPane tabId="3">
          {/* payment table */}
          <Suspense>
           
            <CoursePayMentList
              data={pays}
              isLoading={loading}
              
            />
          </Suspense>
        </TabPane>

        <TabPane tabId="4">
          {/* my course table*/}
          <Suspense><MyCoursesTable/></Suspense>
        </TabPane>

      </TabContent>
    </Fragment>
  );
};
export default CoursesListTab;
