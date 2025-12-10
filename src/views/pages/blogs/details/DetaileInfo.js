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
import { useContext, useEffect, useState } from "react";
// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Instance Imports
import instance from "../../../../core/interseptor/Interseptor";
import { useParams } from "react-router-dom";
import NewGoalOverview from "../../../ui-elements/cards/analytics/NewGoalOverview";

const DetaileInfo = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const detailItems = data?.detailsNewsDto;

  useEffect(() => {
    instance.get(`/News/${id}`).then((res) => setData(res.data));
  }, [id]);

  const { colors } = useContext(ThemeColors);
  return (
    <div className="d-flex justify-content-between align-items-start gap-1">
      <Col>
        <Col>
          <StatsHorizontal
            color="primary"
            statTitle="تعداد بازدید"
            icon={<Eye size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {detailItems?.currentView}
              </h3>
            }
          />
        </Col>
        <Col>
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کامنت ها"
            icon={<MessageCircle size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{detailItems?.commentsCount}</h3>}
          />
        </Col>
        <Col>
          <StatsHorizontal
            color="primary"
            statTitle="تعداد ذخیره شده"
            icon={<Bookmark size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{detailItems?.inUsersFavoriteCount}</h3>}
          />
        </Col>
      </Col>
      <Col><NewGoalOverview /></Col>
    </div>
  );
};

export default DetaileInfo;
