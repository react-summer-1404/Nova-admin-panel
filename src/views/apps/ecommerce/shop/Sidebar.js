// ** Custom Hooks
// import { useRTL } from "@hooks/useRTL";

// ⭐️ ایمپورت‌های ضروری
import { useState } from 'react'; 
import { useDispatch } from "react-redux";
// مسیر اینپورت instance در پروژه شما باید صحیح باشد
import instance from '../../../../core/interseptor/Interseptor'; 
import { setCourseList } from "../store"; // اکشن جدید
// import { getProducts } from "../store"; // دیگر نیازی به این نیست

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
  const [selectedFilter, setSelectedFilter] = useState('all'); 

  const handleApi = async (id) => { 
    setSelectedFilter(id);

    let url = ""; 
    let params = {};
  
    if (id === "myCourse") {
      url = "/SharePanel/GetMyCourses";
      params = {};
    } 
    else { 
      url = "/Course/CourseList";
      params = {
        PageNumber: 1,
        RowsOfPage: 10,
        SortingCol: "",
        SortType: "",
        Query: ""
      };
    }
    
    try {
        const response = await instance.get(url, { params });
        
        dispatch(setCourseList({ params, data: response.data }));
        
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
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
              <h6 className="filter-heading d-none d-lg-block">Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id="product-categories">
                <h6 className="filter-title">مدیریت دوره ها</h6>
                <ul className="list-unstyled categories-list">
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <div className="form-check">
                          <Input
                            type="radio"
                            id={category.id}
                            name="category-radio"
                            checked={category.id === selectedFilter}
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

              <div id="clear-filters">
                <Button color="primary" block>
                  Clear All Filters
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
