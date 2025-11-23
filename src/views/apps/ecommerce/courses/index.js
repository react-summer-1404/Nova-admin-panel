// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProducts,   } from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    )
  }, [dispatch])

  return (
    <Fragment>
      <Breadcrumbs title='دوره ها' data={[{ title: 'مدیریت دوره ها' }, { title: 'دوره ها' }]} />
      <Products
        store={store}
        dispatch={dispatch}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar sidebarOpen={sidebarOpen} />
    </Fragment>
  )
}
export default Shop
