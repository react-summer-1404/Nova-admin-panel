// ** React Imports
import { Fragment} from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import CommentTable from "./CommentTable";

// ** Custom Components
import Card from "@components/card-snippet";


const CommentTables = ({ dataId, apiData, title, thList }) => {
  
  thList = ["کاربر", "عنوان کامنت", "متن کامنت", "پاسخ ها"];

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CommentTable dataId={dataId} apiData={apiData} thList={thList} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CommentTables;
