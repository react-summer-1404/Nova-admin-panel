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


const Home = () => {
  return (
    <Row>        
      <Col lg={4} sm={6}>   
        <CardCongratulations />
      </Col>
      <Col lg={4} sm={6}>   
      <GoalOverview />
      </Col> 
      <Col lg={2} sm={4}>   
      <SubscribersGained/>
      </Col>       
    </Row>
  );
};

export default Home;
