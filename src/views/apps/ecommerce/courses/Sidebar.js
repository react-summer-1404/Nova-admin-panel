// ** Custom Hooks
// import { useRTL } from "@hooks/useRTL";
import defaultpPic from "../../../../assets/images/defalt.png";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../../../core/interseptor/Interseptor";
import { setCourseList, setSelectedFilter } from "../store";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from "reactstrap";

// ** Styles
import "@styles/react/libs/noui-slider/noui-slider.scss";

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen } = props;

  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.ecommerce.selectedFilter);

  const handleApi = async (id) => {
    dispatch(setSelectedFilter(id));
    console.log(id);

    let url = "";
    let params = {};

    if (id === "myCourse") {
      url = "/SharePanel/GetMyCourses";
      params = {
        PageNumber: 1,
        RowsOfPage: 10,
      };
    } else if (id === "all") {
      url = "/Course/CourseList";
      params = {
        PageNumber: 1,
        RowsOfPage: 10,
      };
    }
    else if (id === "paidCourse") {
      url = "/CoursePayment";
      params = {};
    }
     else if (id === "reserved") {
      url = "/CourseReserve";
      params = {};
    }
    const response = Object.keys(params).length>0 
    ? await instance.get(url, { params })
    : await instance.get(url);
 
  
  let mappedData = []
  let total = 0
  
  if (id === "all") {
    mappedData = response.data.courseDtos?.map(course => ({
      id: course.courseId,
      name: course.title,
      image: course.imageAddress,
      price: course.cost,
      fullName: course.fullName,
      slug: course.courseId,
      miniDescribe: course.miniDescribe,
      active: course.active
    }))
    total = response.data.totalCount
  }
  
  else if (id === "myCourse") {
    // mappedData = response.data?.map(item => ({
    //   id: item.courseId,
    //   name: item.title,
    //   image: item.imageAddress,
    //   price: item.cost,
    //   fullName: item.teacherName,
    //   slug: item.courseId,
    //   description: item.describe,
    //   rating: item.currentRate
    // }))
    // total = mappedData.length
  }
  
  else if (id === "reserved") {
    // mappedData = response.data?.map(item => ({
    //   id: item.courseId,
    //   name: item.courseName,
    //   image: item.image,
    //   fullName: item.teacher,
    //   slug: item.courseId,
    //   miniDescribe: item.miniDescribe,

     
    // }))
    // total = mappedData.length
    const reserves = response.data || [];

    const coursesGet = await instance.get("/Course/CourseList", {
      params: { PageNumber: 1, RowsOfPage: 1000 },
    });
    const courses = coursesGet.data.courseDtos || [];
    
    const reservedCourses = courses.filter(course =>
      reserves.some(p => p.courseId === course.courseId)
    );
  
  
    mappedData = reservedCourses.map(course => ({
      id: course.courseId,
      name: course.title,
      image: course.imageAddress || defaultpPic,
      price: course.cost,
      fullName: course.fullName,
      slug: course.courseId,
      miniDescribe: course.miniDescribe,
      active: course.active
    }));
  
    total = mappedData.length;
  
    console.log("دوره‌های پرداخت شده:", mappedData);
  }
  
  else if (id === "paidCourse") {
    const payments = response.data || [];

    const coursesGet = await instance.get("/Course/CourseList", {
      params: { PageNumber: 1, RowsOfPage: 1000 },
    });
    const courses = coursesGet.data.courseDtos || [];

    const paidCourses = courses.filter(course =>
      payments.some(p => p.courseId === course.courseId)
    );
  
  
    mappedData = paidCourses.map(course => ({
      id: course.courseId,
      name: course.title,
      image: course.imageAddress || defaultpPic,
      price: course.cost,
      fullName: course.fullName,
      slug: course.courseId,
      miniDescribe: course.miniDescribe,
      active: course.active
    }));
  
    total = mappedData.length;
  
    // console.log("دوره‌های پرداخت شده:", mappedData);
  }
  
  
  
  
  dispatch(setCourseList({ 
    params, 
    data: {  mappedData, totalCount: total } 
  }));
  
// console.log(mappedData)
  };
  const categories = [
    { id: "all", title: "همه دوره ها" },
    { id: "reserved", title: "رزرو شده" },
    { id: "myCourse", title: "دوره های من" },
    { id: "paidCourse", title: "دوره های پرذاخت شده" },
  ];

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-shop", {
            show: sidebarOpen,
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">
                فیلتر دوره ها
              </h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id="product-categories">
                <ul className="list-unstyled categories-list">
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <div className="form-check">
                          <Input
                            type="radio"
                            id={category.id}
                            name="category-radio"
                            checked={selectedFilter === category.id}
                            onChange={(e) => {
                              handleApi(e.target.id);
                            }}
                          />
                          <Label className="form-check-label" for={category.id}>
                            {category.title}
                          </Label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
