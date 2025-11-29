import { Menu } from "react-feather";
import {
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSort, setSelectedSortCol, getProducts } from "../store";
// import CoursesListTab from "../../components/tabs/CoursesListTab";

const ProductsHeader = ({  store }) => {
  const dispatch = useDispatch();

  const selectedSort = useSelector((state) => state.ecommerce.selectedSort);
  const selectedSortCol = useSelector((state) => state.ecommerce.selectedSortCol);

  const sortToggleText = { asc: "صعودی", desc: "نزولی" };
  const sortColToggleText = { active: "فعال", cost: "قیمت" };

  const handleSort = (sortType = selectedSort, sortCol = selectedSortCol) => {
    dispatch(setSelectedSort(sortType));
    dispatch(setSelectedSortCol(sortCol));

    dispatch(
      getProducts({
        PageNumber: 1,
        RowsOfPage: 10,
        SortType: sortType,   
        SortingCol: sortCol,   
      })
    );
  };

  return (
    <div className="ecommerce-header">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <button
                className="navbar-toggler shop-sidebar-toggler"
                // onClick={() => setSidebarOpen(true)}
              >
                <span className="navbar-toggler-icon d-block d-lg-none">
                  <Menu size={14} />
                </span>
              </button>
              <span className="search-results">
                {store.totalProducts} نتیجه پیدا شده
              </span>
            </div>

            <div className="view-options d-flex">
              {/* Sort Type */}
              <UncontrolledButtonDropdown className="dropdown-sort me-2">
                <DropdownToggle color="primary" outline caret>
                  {sortToggleText[selectedSort] || "مرتب‌سازی"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleSort("asc", selectedSortCol)}>
                    صعودی
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("desc", selectedSortCol)}>
                    نزولی
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              {/* Sort Column */}
              <UncontrolledButtonDropdown className="dropdown-sort">
                <DropdownToggle color="primary" outline caret>
                  {sortColToggleText[selectedSortCol] || "ستون"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleSort(selectedSort, "active")}>
                    فعال
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort(selectedSort, "cost")}>
                    قیمت
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
