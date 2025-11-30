// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns

// ** Store & Actions
import { getData } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import EditTable from './modal/EditTable'
import CreateModal from './modal/CreateModal'

const DataTableServerSide = () => {
  const dispatch = useDispatch()
  const courseId = useSelector(state => state.ecommerce.productDetail.id)
  const store = useSelector(state => state.courseMentor)
  const newStore = store?.data?.filter(item=>item.courseId==courseId)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [centeredModal, setCenteredModal] = useState(false)

  // ** Fetch data
  useEffect(() => {
    
      dispatch(getData())
 
  }, [])

  // ** Handle rows per page
  const handlePerPage = e => {
    const newPerPage = parseInt(e.target.value)
    setRowsPerPage(newPerPage)
    setCurrentPage(1)
  }

  // ** Handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const pageCount = Math.ceil(newStore?.total / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={pageCount || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={handlePagination}
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
      />
    )
  }

  // ** Slice data for current page
  const dataToRender = newStore?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>منتور های دوره</CardTitle>
      </CardHeader>

      <Row className='mx-0 mt-1 mb-50 d-flex justify-content-between'>
        <Col sm='6'>
          <div className='d-flex align-items-center'>
            <Label for='sort-select'></Label>
            <Input
              className='dataTable-select'
              type='select'
              id='sort-select'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '70px' }}
            >
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </Input>
            <Label for='sort-select'></Label>
          </div>
        </Col>
        <Col sm='2'>
        <Button
            color="primary "
            onClick={() => setCenteredModal(!centeredModal)}
          >
            افزودن منتور
          </Button>
          <CreateModal
            courseId={courseId}
            setCenteredModal={setCenteredModal}
            centeredModal={centeredModal}
            store={store}
          />
        </Col>
      </Row>

      <div className='react-dataTable'>

        <EditTable courseId={courseId} data={dataToRender} store={store?.data}/>
      </div>
    </Card>
  )
}

export default memo(DataTableServerSide)
