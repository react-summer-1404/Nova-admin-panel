// ** User List Component
// import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

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
import GoalOverview from "../../../ui-elements/cards/analytics/GoalOverview";
import { useContext } from "react";
// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

const DetaileInfo = () => {
  const { colors } = useContext(ThemeColors)
  return (
    <div className="app-user-list">
      <Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد بازدید"
            icon={<Eye size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کامنت ها"
            icon={<MessageCircle size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد دفعات ذخیره شدن"
            icon={<Bookmark size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
      </Col>
      <Col lg="4" md="6" xs="12">
        <GoalOverview success={colors.success.main} />
      </Col>
    </div>
  );
};

export default DetaileInfo;
