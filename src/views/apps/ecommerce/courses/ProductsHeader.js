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
  const handleApi = async (filterId = selectedFilter, sort = selectedSort,sortCol=selectedSortCol) => {
    dispatch(setSelectedFilter(filterId))
    dispatch(setSelectedSort(sort))
    dispatch(setSelectedSortCol(sortCol))

    console.log("filterId",filterId);
    console.log("sort",sort);
    console.log("sortCol",sortCol);
  
    let url = "";
    let params = {};
  
    if (filterId === "myCourse") {
      url = "/SharePanel/GetMyCourses";
      params = {
        PageNumber: 1,
        RowsOfPage: 10,
        SortType:sort ||null,
        SortingCol:sortCol||null

      };
    } else if (filterId === "all") {
      url = "/Course/CourseList";
      params = {
        PageNumber: 1,
        RowsOfPage: 10,
        SortType:sort || null,
        SortingCol:sortCol||null
      };
    }
    const response = await instance.get(url, { params });
    dispatch(setCourseList({ params, data: response.data }));
  };
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
              <ButtonGroup>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsHeader
