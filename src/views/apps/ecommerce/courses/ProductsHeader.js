// ** Third Party Components
import classnames from 'classnames'
import { useState } from 'react'
import { Menu, Grid, List } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import { setCourseList, setSelectedFilter,setSelectedSort, setSelectedSortCol } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../../../core/interseptor/Interseptor';

// const [selectedSortOption,setSelectedSortOption]=useState("")


const ProductsHeader = props => {
const selectedFilter = useSelector((state) => state.ecommerce.selectedFilter);
const selectedSort = useSelector((state) => state.ecommerce.selectedSort);
const selectedSortCol = useSelector((state) => state.ecommerce.selectedSortCol);

  // ** Props
  const { activeView, setActiveView, dispatch, getProducts, store, setSidebarOpen } = props
 
  const handleApi = async (filterId = selectedFilter, sort = selectedSort, sortCol = selectedSortCol) => {
    dispatch(setSelectedFilter(filterId))
    dispatch(setSelectedSort(sort))
    dispatch(setSelectedSortCol(sortCol))
  
    let url = "";
    let params = {
      PageNumber: 1,
      RowsOfPage: 10,
      SortType: sort || null,
      SortingCol: sortCol || null
    };
  
    switch (filterId) {
      case "all":
        url = "/Course/CourseList";
        break;
      case "myCourse":
        url = "/SharePanel/GetMyCourses";
        break;
      case "reserved":
        url = "/SharePanel/GetMyCoursesReserve";
        break;
      case "paidCourse":
        url = "/CoursePayment";
        break;
      default:
        url = "/Course/CourseList";
    }
  
    const response = await instance.get(url, { params });
  
    let mappedData = [];
    let total = 0;
  
    if (filterId === "paidCourse") {
      const payments = response.data || [];
      const coursesGet = await instance.get("/Course/CourseList", { params: { PageNumber: 1, RowsOfPage: 1000 } });
      const courses = coursesGet.data.courseDtos || [];
  
      mappedData = payments.map(payment => {
        const course = courses.find(c => c.courseId === payment.courseId);
        return {
          id: payment.courseId,
          name: course?.title,
          image: course?.imageAddress || null,
          price: payment.Paid,
          fullName : course.fullName,
          slug: payment.courseId,
          paymentDate: payment.PeymentDate,
        isExpire:course.isExpire,
        active: course.active,
        miniDescribe :course.miniDescribe

        };
      });
  
      total = mappedData.length;
    } else {
      mappedData = response.data.courseDtos?.map(course => ({
        id: course.courseId,
        name: course.title,
        image: course.imageAddress,
        price: course.cost,
        fullName : course.fullName,
        slug: course.courseId,
        miniDescribe: course.miniDescribe,
        active: course.active,
        isExpire:course.isExpire,
        
      })) || [];
      total = response.data.totalCount || mappedData.length;
    }
  
    dispatch(setCourseList({ params, data: { mappedData, totalCount: total } }));
  }
  
  // ** Sorting obj
  const sortToggleText = {
    'asc': 'صعودی',
    'desc': 'نزولی',
    'featured': 'Featured'
  }
  const sortColToggleText = {
    'active': 'فعال',
    'cost': 'قیمت',
    'featured': 'Featured'
  }

  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
            <div className='result-toggler'>
              <button className='navbar-toggler shop-sidebar-toggler' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>
              <span className='search-results'>{store.totalProducts} Results Found</span>
            </div>
            <div className='view-options d-flex'>
              <UncontrolledButtonDropdown className='dropdown-sort'>
                <DropdownToggle className='text-capitalize me-1' color='primary' outline caret>
                {sortToggleText[selectedSort] || 'Sort'}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className='w-100'
                    onClick={() => handleApi(selectedFilter, "asc")}>
                  
                    صعودی
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => handleApi(selectedFilter, "desc")}>
                    نزولی
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className='dropdown-sort'>
                <DropdownToggle className='text-capitalize me-1' color='primary' outline caret>
                {sortColToggleText[selectedSortCol] || 'Sort'}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className='w-100'
                    onClick={() => handleApi(selectedFilter, selectedSort,"active")}>
                  
                    فعال
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => handleApi(selectedFilter,selectedSort, "cost")}>
                    قیمت
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
             
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsHeader
