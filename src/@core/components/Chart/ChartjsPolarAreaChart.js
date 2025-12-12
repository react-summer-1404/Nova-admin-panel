// ** Third Party Components
import { PolarArea } from 'react-chartjs-2'
import { MoreVertical } from 'react-feather'

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { GetDataCount } from '../../../core/Services/api/Dashbord/DashboardReport'
import { useQuery } from '@tanstack/react-query'

const ChartjsPolarAreaChart = props => {

  const{data: dataCount} = useQuery({
    queryKey : ["userTotal"],
    queryFn : GetDataCount 
})
  const teacherUser = dataCount?.listUser?.filter(listUser => listUser.roles?.includes("teacher")) || []
  const studentUser = dataCount?.listUser?.filter(listUser => listUser.roles?.includes("student")) || []
  const adminUser = dataCount?.listUser?.filter(listUser => listUser.roles?.includes("admin")) || []
  const superAdminUser =  dataCount?.listUser?.filter(listUser => listUser.roles?.includes("SuperAdmin")) || []
  const allUser =  dataCount?.listUser || []

  // ** Props
  const { primary, greyColor, labelColor, yellowColor, infoColorShade, warningColorShade, successColorShade } = props

  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 25,
          boxWidth: 9,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  
  // ** Chart Data
  const data = {
    labels: ['کاربر', 'ادمین', 'استاد', 'مدیر ', ' کاربران عادی' ],
    datasets: [
      {
        borderWidth: 0,
        data: [teacherUser.length, studentUser.length, adminUser.length, superAdminUser.length, allUser.length],
        backgroundColor: [primary, yellowColor, warningColorShade, infoColorShade, greyColor, successColorShade]
      }
    ]
  }

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'> دسته بندی کاربران بر اساس نقش</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: '350px' }}>
          <PolarArea data={data} options={options} height={350} />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsPolarAreaChart
