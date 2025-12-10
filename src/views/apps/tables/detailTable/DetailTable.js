// ** User List Component
// import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, CardBody, Card } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import {
  User,
  UserPlus,
  UserCheck,
  UserX,
  Eye,
  Bookmark,
  MessageCircle,
} from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useContext, useEffect, useState } from "react";
// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Instance Imports
import instance from "../../../../core/interseptor/Interseptor";
import { useParams } from "react-router-dom";
import NewGoalOverview from "../../../ui-elements/cards/analytics/NewGoalOverview";
import CoursesGoalOverview from "./CoursesGoalOverview";
import Explanation from "../../components/describe/Explanation";

const DetailTable = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    instance.get(`/Course/${id}`).then((res) => setData(res.data));
  }, [id]);
  console.log("get id", id);
  console.log("get data", data);
  console.log("get کامنت", data?.courseCommentTotal);
  const { colors } = useContext(ThemeColors);
  return (
    <Row className="g-3" >
       <Col>
       <Col >
          <StatsHorizontal
            color="primary"
            statTitle="تعداد گروه ها"
            icon={<Eye size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.courseGroupTotal}</h3>
            }
          />
        </Col>
        <Col >
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کامنت ها"
            icon={<MessageCircle size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.courseCommentTotal}</h3>
            }
          />
        </Col>
        <Col >
          <StatsHorizontal
            color="primary"
            statTitle="تعداد رزرو شده"
            icon={<Bookmark size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.reserveUserTotal}</h3>
            }
          />
        </Col></Col>
      <Col md={6}>
        <CoursesGoalOverview />
      </Col>
      
      <Col md={12}>
        <Card>
          <CardBody>
            <Explanation describe={data?.describe}/>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailTable;
