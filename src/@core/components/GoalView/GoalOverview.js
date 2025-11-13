// ** React Imports


// ** Third Party Components

import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport';

const GoalOverview = props => {
  const {data} = useQuery({
    queryKey : ["adminReport"],
    queryFn : getReport,
  });
  const reserveNotAccept = data? (data.allReserve - data.allReserveAccept) : 0;
  const acceptedPercent = data? (data.allReserveAccept / data.allReserve) *100 : 0;
  const notAcceptedPercent = data? (reserveNotAccept / data.allReserve) *100 : 0;

  const options = {
    chart: {
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1
      }
    },
    colors: ['#51e5a8'],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%'
        },
        track: {
          background: '#ebe9f1',
          strokeWidth: '50%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            color: '#5e5873',
            fontFamily: 'Montserrat',
            fontSize: '2.86rem',
            fontWeight: '600'
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [props.success],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    grid: {
      padding: {
        bottom: 30
      }
    }
  },
  series = [acceptedPercent]

  const options1 = {

      chart: {
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      },
      colors: ['#F08080'],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '77%'
          },
          track: {
            background: '#ebe9f1',
            strokeWidth: '50%'
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: '#5e5873',
              fontFamily: 'Montserrat',
              fontSize: '2.86rem',
              fontWeight: '600'
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [props.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          bottom: 30
        }
      }
    },
    series1 = [notAcceptedPercent]

  return  (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'> دوره ها</CardTitle>
        <HelpCircle size={18} className='text-muted cursor-pointer' />
      </CardHeader>
      <CardBody className='p-0'>
        <Row>
          <Col>
          <div className='text-center'>درصد تایید شده ها</div>
        <Chart options={options} series={series} type='radialBar' height={245} />
        </Col>
        <Col>
        <div className='text-center'>درصد تایید نشده ها</div>
        <Chart options={options1} series={series1} type='radialBar' height={245} />
        </Col>
        </Row>
      </CardBody>
      <Row className='border-top text-center mx-0'>
        <Col xs='4' className='border-end py-1'>
          <CardText className='text-muted mb-0'>رزرو ها</CardText>
          <h3 className='fw-bolder mb-0'>{data?.allReserve}</h3>
        </Col>
        <Col xs='4' className='py-1 border-end'>
          <CardText className='text-muted mb-0'>رزرو های تایید شده </CardText>
          <h3 className='fw-bolder mb-0'>{data?.allReserveAccept}</h3>
        </Col>
        <Col xs='4' className='py-1'>
          <CardText className='text-muted mb-0'>رزرو های تایید نشده </CardText>
          <h3 className='fw-bolder mb-0'>{reserveNotAccept}</h3>
        </Col>
      </Row>
    </Card>
  ) 
}
export default GoalOverview
