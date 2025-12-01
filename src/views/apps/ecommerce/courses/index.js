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
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Book, Grid } from 'react-feather'
import { useQuery } from '@tanstack/react-query'
import { getProductsCourse } from '../../../../core/Services/api/getCourseList'
import { listMyCourse } from '../../../../core/Services/api/CourseListApi'

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
const {data}=useQuery({
  queryKey:["datalength"],
  queryFn:getProductsCourse
})
const {data:myCourse}=useQuery({
  queryKey:["mycourselength"],
  queryFn:listMyCourse
})
  return (
    <Fragment>
      <Breadcrumbs title='دوره ها' data={[{ title: 'مدیریت دوره ها' }, { title: 'دوره ها' }]} />
           <CoursesListTab/>
        
           <StatsVertical
          icon={<Book size={21} />}
          color="info"
          stats={data?.totalCount}
          statTitle="مجموع دوره ها"
        />
           <StatsVertical
          icon={<Grid size={21} />}
          color="warning"
          stats={myCourse?.totalCount}
          statTitle="تعداد دوره های من"
        />
          
      <Button color='primary' style={{width:250}} onClick={()=>navigate("/apps/ecommerce/createCourse")}>
        افزودن دوره جدید +
      </Button>
    </Fragment>
  )
}
export default Shop
