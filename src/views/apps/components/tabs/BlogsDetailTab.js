// ** React Imports
import { Fragment, useContext } from "react";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";
import DetaileInfo from "../../../pages/blogs/details/DetaileInfo";
import NewGoalOverview from "../../../ui-elements/cards/analytics/NewGoalOverview";
import CommentTables from "../../tables/NewsCommentTable/CommentTables";

const BlogsDetailTab = ({ active, toggleTab }) => {
  const { colors } = useContext(ThemeColors);
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">جزییات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <DetaileInfo />
        </TabPane>
        <TabPane tabId="2">
          <CommentTables />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default BlogsDetailTab;
