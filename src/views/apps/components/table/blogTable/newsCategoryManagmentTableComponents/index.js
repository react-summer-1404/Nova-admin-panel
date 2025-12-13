// ** React Imports
import { Fragment} from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import NewsCategoryManagmentTable from "./NewsCategoryManagmentTable";

// ** Custom Components
import Card from "@components/card-snippet";

const NewsCategoryManagmentTables = ({ dataId, apiData, title, thList }) => {

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card title={title} code={NewsCategoryManagmentTable} noBody>
            <NewsCategoryManagmentTable dataId={dataId} apiData={apiData} thList={thList} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NewsCategoryManagmentTables;
