// ** React Imports

// ** Third Party Components

import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import instance from "../../../../core/interseptor/Interseptor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport';

const NewGoalOverview = (props) => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const detailItems = data?.detailsNewsDto;

  useEffect(() => {
    instance.get(`/News/${id}`).then((res) => setData(res.data));
  }, [id]);
  const likes = detailItems?.currentLikeCount || 0;
  const dislikes = detailItems?.currentDissLikeCount || 0;

  const popularityPercent =
    likes + dislikes > 0 ? Math.round((likes / (likes + dislikes)) * 100) : 0;

  const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ["#51e5a8"],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "77%",
          },
          track: {
            background: "#ebe9f1",
            strokeWidth: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#5e5873",
              fontFamily: "Montserrat",
              fontSize: "2.86rem",
              fontWeight: "600",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [props.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      grid: {
        padding: {
          bottom: 30,
        },
      },
    },
    series = [popularityPercent];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4"> درصد محبوبیت بین کاربران </CardTitle>
        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>
      <CardBody className="p-0">
        <Row>
          <Col>
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={245}
            />
          </Col>
        </Row>
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="4" className="py-1 border-end">
          <CardText className="text-muted mb-0"> تعداد لایک </CardText>
          <h3 className="fw-bolder mb-0">{detailItems?.currentLikeCount}</h3>
        </Col>
        <Col xs="4" className="py-1">
          <CardText className="text-muted mb-0"> تعداد دیس لایک </CardText>
          <h3 className="fw-bolder mb-0">
            {detailItems?.currentDissLikeCount}
          </h3>
        </Col>
      </Row>
    </Card>
  );
};
export default NewGoalOverview;
