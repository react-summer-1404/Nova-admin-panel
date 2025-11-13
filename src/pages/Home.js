import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import CardCongratulations from "../@core/components/CardCongratulations/CardCongratulations";
import GoalOverview from "../@core/components/GoalView/GoalOverview";
import { Row, Col } from 'reactstrap'
import SubscribersGained from "../@core/components/Subscribe/Subscribs.js";
import InCompeletSubscribe from "../@core/components/inCompeletSubscribe/inCompeletSubscribe.js";
import Earnings from "../@core/components/Earnings/Earnings.js";
import TableStriped from "../@core/components/CourseTable/TableStriped.js";
import { useQuery } from "@tanstack/react-query";
// import { getReport } from "../core/Services/api/Dashbord/DashboardReport/index.js";
import { getTechReport } from "../core/Services/api/Dashbord/DashboardTechnologyReport/index.js";


const Home = () => {
  const {data} = useQuery({
    queryKey : ["adminTechReport"],
    queryFn : getTechReport,
  });
  return (
    <>
    <Row>                      
      <Col lg={6} sm={6}>   
        <CardCongratulations />
      </Col>
      <Col lg={4} sm={4}>   
        <Earnings/>
      </Col>      
    </Row>
    <Row>
      <Col lg={6} sm={6}>   
        <GoalOverview />
      </Col>   
      <Col lg={2} sm={4}>   
        <SubscribersGained/>
      </Col>

      <Col lg={2} sm={4}>   
        <InCompeletSubscribe/>
      </Col>
    </Row>
    <Row>
      <Col lg={10}>      
        <TableStriped data = {data} />
      </Col>
    </Row>
    
    </>
  );
};

export default Home;
