// ** Third Party Components
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'
import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport';

const Earnings = () => {

  const {data} = useQuery({
      queryKey : ["adminReport"],
      queryFn : getReport,
    });

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['کاربران فعال', 'کاربران در تعامل'],
    stroke: { width: 0 },
    colors: ['#28c76f', '#d0d0d0'],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'کاربران فعال',
              formatter() {
                return `${data?.activeUserPercent} %`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  }

  return (
    <Card className='earnings-card'>
      <CardBody>
        <Row>
          <Col xs='6'>            
            <div className='fs-3 fw-bold'> این ماه</div>
            <CardText className='text-muted font-small-4'>
              <span> مقایسه تعامل نسبت به ماه قبل.</span>
            </CardText>
            <div>تحلیل رفتار کاربران :</div>
          </Col>
          <Col xs='6'>
            <Chart options={options} series={[data?.activeUserPercent, data?.interActiveUserPercent]} type='donut' height={120} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Earnings
