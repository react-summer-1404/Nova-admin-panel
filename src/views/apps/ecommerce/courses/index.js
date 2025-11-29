// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
// import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProducts,   } from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'
import { Button, Card } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import CoursesListTab from '../../components/tabs/CoursesListTab'

const Shop = () => {
  // ** States
  // const [activeView, setActiveView] = useState('grid')
  // const [sidebarOpen, setSidebarOpen] = useState(false)
const navigate =useNavigate()
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
           <CoursesListTab/>
        
      
      <Button color='primary' style={{width:250}} onClick={()=>navigate("/apps/ecommerce/createCourse")}>
        افزودن دوره جدید +
      </Button>
    </Fragment>
  )
}
export default Shop
