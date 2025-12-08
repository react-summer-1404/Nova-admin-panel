// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Row, Col, CardBody, CardText } from "reactstrap";

// ** Third Party Components
import prism from "prismjs";

// ** Demo Components
import NewsCategoryManagmentTable from "./NewsCategoryManagmentTable";

// ** Custom Components
import Card from "@components/card-snippet";

const NewsCategoryManagmentTables = ({ dataId, apiData, title, thList }) => {
  // useEffect(() => {
  //   prism.highlightAll()
  // })

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
