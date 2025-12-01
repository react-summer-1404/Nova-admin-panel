// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Row, Col, CardBody, CardText } from "reactstrap";

// ** Third Party Components
import prism from "prismjs";

// ** Demo Components
import TableDark from "../TableDark";
import TableBasic from "./TableBasic";
import TableHover from "../TableHover";
import TableSmall from "../TableSmall";
import TableStriped from "../TableStriped";
import TableBordered from "../TableBordered";
import TableTheadDark from "../TableTheadDark";
import TableContextual from "../TableContextual";
import TableResponsive from "../TableResponsive";
import TableBorderless from "../TableBorderless";
import TableTheadLight from "../TableTheadLight";
import TableStripedDark from "../TableStripedDark";

// ** Custom Components
import Card from "@components/card-snippet";
import Breadcrumbs from "@components/breadcrumbs";

// ** Source Code
import {
  tableDark,
  tableBasic,
  tableHover,
  tableSmall,
  tableStriped,
  tableBordered,
  tableBorderless,
  tableResponsive,
  tableContextual,
  tableStripedDark,
  tableTheadOptions,
} from "../TableSourceCode";

const Tables = ({ dataId, apiData, title, thList }) => {
  // useEffect(() => {
  //   prism.highlightAll()
  // })
  thList = ["عنوان","آخرین آپدیت","دسته بندی","وضعیت","عملیات"]

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
