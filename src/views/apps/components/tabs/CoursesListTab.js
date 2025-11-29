// ** React Imports
import { Suspense } from "react";
import { lazy } from "react";
import { Fragment, useState } from "react";

// ** Icons Imports
import {
  MessageCircle,
  Box,
  Users,
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
import { getReserveListUsers } from "../../../../core/Services/api/CourseListApi";
import { getProductsCourse } from "../../../../core/Services/api/getCourseList";
import CourseReserveList from "../../tables/CourseReserveList";

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

  const {
    getProducts,
  } = props;
const {data,isLoading}=useQuery({
  queryKey:["getReserveListUsers"],
  queryFn:getReserveListUsers
})
const {data:allProducts}=useQuery({
  queryKey:["allProducts"],
  queryFn:getProductsCourse
})
const courses = allProducts?.courseDtos || [];
const reservedCourses = courses.filter(course =>
  data?.some(p => p.courseId === course.courseId)
);
console.log("reserves",reservedCourses)
  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            <MessageCircle size={18} />
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
            <Users size={18} />
            <span className="align-middle">رزرو شده ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "7"}
            onClick={() => {
              toggle("7");
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
            <Box size={18} />
            <span className="align-middle">گروه ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            <CreditCard size={18} />
            <span className="align-middle">پرداخت</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "5"}
            onClick={() => {
              toggle("5");
            }}
          >
            <Globe size={18} />
            <span className="align-middle">گروه های اجتماعی</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "6"}
            onClick={() => {
              toggle("6");
            }}
          >
            <UserCheck size={18} />
            <span className="align-middle">منتور ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          {/* comment table */}
          <Suspense>
            <ProductsPage
              store={store}
              dispatch={dispatch}
              getProducts={getProducts}
            />
          </Suspense>
        </TabPane>

        <TabPane tabId="2">
          {/* students table */}
          <Suspense>
          <CourseReserveList data={reservedCourses} isLoading={isLoading}/>
          </Suspense>
        </TabPane>

        <TabPane tabId="3">
          {/* group table */}
          <Suspense>
            {/* <DTAdvance3 /> */}
          </Suspense>
        </TabPane>

        <TabPane tabId="4">
          {/* group table */}
          <Suspense>
            {/* <DTAdvance4 /> */}
          </Suspense>
        </TabPane>

        <TabPane tabId="5">
          {/*social group table */}
          <Suspense>
            {/* <DTAdvance5 /> */}
          </Suspense>
        </TabPane>

        <TabPane tabId="6">
          {/*mentors table */}
          <Suspense>
            {/* <DTAdvance6 /> */}
          </Suspense>
        </TabPane>

        <TabPane tabId="7">
          {/*reserve users table */}
          <Suspense>
            {/* <TableServerSide /> */}
          </Suspense>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CoursesListTab;
