// ** Third Party Components
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { GetCourseCount } from '../../../core/Services/api/Dashbord/DashboardReport'

const ChartjsBarChart = ({ success, labelColor }) => {
  const {data : courseChart} = useQuery({
    queryKey : ["CoursesChart"],
    queryFn: GetCourseCount
  })

  const activeCourse = courseChart?.courseFilterDtos?.filter(courseFilterDtos => courseFilterDtos.active === true) || []
  const deActiveCourse = courseChart?.courseFilterDtos?.filter(courseFilterDtos => courseFilterDtos.active === false)|| []
  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max:15,       
        ticks: {
          stepSize: 5,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  // ** Chart data
  const data = {
    labels: [
      'شروع ثبت نام',
      'در حال برگذاری',
      'منقضی شده',
    ],
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: success,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [0, activeCourse.length, deActiveCourse.length]
      }
    ]
  }

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'>دوره ها بر اساس وضعیت</CardTitle>        
      </CardHeader>
      <CardBody>
        <div style={{ height: '350px' }}>
          <Bar data={data} options={options} height={350} />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsBarChart
