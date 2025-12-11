// ** React Imports
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col,} from "reactstrap";

// ** News View Components
import BlogsDetailInfoCard from "../../../apps/components/cards/BlogsDetailInfoCard";
import BlogsDetailTab from "../../../apps/components/tabs/BlogsDetailTab";

// ** Styles
import "@styles/react/apps/app-users.scss";

const BlogDetails = () => {
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <div className="app-user-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <BlogsDetailInfoCard />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <BlogsDetailTab active={active} toggleTab={toggleTab} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default BlogDetails;