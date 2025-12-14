// ** Icons Imports
// import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'react-feather'
import ReactPaginate from 'react-paginate';

// ** Reactstrap Imports
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
// import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport';


const TableStriped = ({data}) => {
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [perPage,setPerPage]=useState(5)
const [currentPage,setCurrentPage]=useState(1)
  
  const pageCount = Math.ceil((data?.length || 0) / perPage);
  
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      activeClassName="active"
      forcePage={currentPage - 1}
      onPageChange={(page) => handlePagination(page.selected + 1)}
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );
  
  const dataToRender = data?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )
  return (
    <>
    <Table striped responsive>
      <thead>
        <tr>
          <th>نام تکنولوژی</th>
          <th>تعداد دفعات استفاده</th>
          <th>اقدام </th>
        </tr>
      </thead>
      <tbody>
        {dataToRender?.map((item) => (
          <tr key={item.id}>
          <td>
            <span className='align-middle fw-bold'>{item.techName}</span>
          </td>
          <td>
          <span className='align-middle fw-bold '>{item.countUsed}</span>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='me-50' size={15} /> <span className='align-middle'>ویرایش</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Trash className='me-50' size={15} /> <span className='align-middle'>حذف</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        ))}
        
      </tbody>
    </Table>
    <CustomPagination/></>
  )
}

export default TableStriped
