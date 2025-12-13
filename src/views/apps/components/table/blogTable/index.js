// ** React Imports
import { Fragment} from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import TableBasic from "./TableBasic";

// ** Custom Components
import Card from "@components/card-snippet";
import Breadcrumbs from "@components/breadcrumbs";

// ** Source Code
import {
  tableBasic,
} from "../../../../tables/reactstrap/TableSourceCode";

const Tables = ({ dataId, apiData, title, thList }) => {
  
  thList = ["عنوان", "آخرین آپدیت", "دسته بندی", "وضعیت", "عملیات"];

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card title={title} code={tableBasic} noBody>
            <TableBasic dataId={dataId} apiData={apiData} thList={thList} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Tables;
