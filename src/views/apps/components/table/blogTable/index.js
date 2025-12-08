// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Row, Col, CardBody, CardText } from "reactstrap";

// ** Third Party Components
import prism from "prismjs";

// ** Demo Components
import TableDark from "../../../../tables/reactstrap/TableDark";
import TableBasic from "./TableBasic";
import TableHover from "../../../../tables/reactstrap/TableHover";
import TableSmall from "../../../../tables/reactstrap/TableSmall";
import TableStriped from "../../../../tables/reactstrap/TableStriped";
import TableBordered from "../../../../tables/reactstrap/TableBordered";
import TableTheadDark from "../../../../tables/reactstrap/TableTheadDark";
import TableContextual from "../../../../tables/reactstrap/TableContextual";
import TableResponsive from "../../../../tables/reactstrap/TableResponsive";
import TableBorderless from "../../../../tables/reactstrap/TableBorderless";
import TableTheadLight from "../../../../tables/reactstrap/TableTheadLight";
import TableStripedDark from "../../../../tables/reactstrap/TableStripedDark";

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
} from "../../../../tables/reactstrap/TableSourceCode";

const Tables = ({ dataId, apiData, title, thList }) => {
  // useEffect(() => {
  //   prism.highlightAll()
  // })
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
