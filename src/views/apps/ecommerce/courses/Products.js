// ** React Imports
import { Fragment } from 'react'

// ** Product components
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import TableHover from '../../tables/reactStrap-products/TableHover'
import { getProducts } from '../store'
const ProductsPage = props => {
  
  const dispatch = useDispatch()

  const store = useSelector(state => state.ecommerce)

  const {
    activeView,
    sidebarOpen,
    
    setActiveView,
    setSidebarOpen,
  } = props


  // ** Handles pagination
  const handlePageChange = val => {
    if (val === 'next') {
      dispatch(getProducts({ ...store.params, page: store.params.page + 1 }))
    } else if (val === 'prev') {
      dispatch(getProducts({ ...store.params, page: store.params.page - 1 }))
    } else {
      dispatch(getProducts({ ...store.params, page: val }))
    }
  }
  // dispatch(
  //   getProducts({
  //     PageNumber: 1,
  //     RowsOfPage: 10,
  //     SortType: sortType,   
  //     SortingCol: sortCol,   
  //   })
  // );

  // ** Render pages
  const renderPageItems = () => {
const total = Number(store.totalProducts) || 0
const perPage = store.products.length || 1
let arrLength = Math.ceil(total / perPage)

if (!Number.isFinite(arrLength) || arrLength < 1) arrLength = 1


return new Array(arrLength).fill().map((item, index) => {
  return (
    <PaginationItem
      key={index}
      active={store.params.page === index + 1}
      onClick={() => handlePageChange(index + 1)}
    >
      <PaginationLink href='/' onClick={e => e.preventDefault()}>
        {index + 1}
      </PaginationLink>
    </PaginationItem>
  )
})

  }

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          // getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar dispatch={dispatch} getProducts={getProducts} store={store} />
        {store.products?.length ? (
          <Fragment>
            <TableHover
              store={store}
              activeView={activeView}
              products={store.products}

            />
            <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-2'>
              <PaginationItem
                disabled={store.params.page === 1}
                className='prev-item'
                onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className='next-item'
                onClick={() => handleNext()}
                disabled={store.params.page === Number(store.totalProducts) / store.products.length}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>نتیجه ای یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
