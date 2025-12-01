// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Row, Col, CardBody, CardText } from "reactstrap";

// ** Third Party Components
import prism from "prismjs";

// ** Demo Components
// import TableDark from './TableDark'
// import TableBasic from './TableBasic'
// import TableHover from './TableHover'
// import TableSmall from './TableSmall'
// import TableStriped from './TableStriped'
// import TableBordered from './TableBordered'
// import TableTheadDark from './TableTheadDark'
// import TableContextual from './TableContextual'
// import TableResponsive from './TableResponsive'
// import TableBorderless from './TableBorderless'
// import TableTheadLight from './TableTheadLight'
// import TableStripedDark from './TableStripedDark'

// ** Custom Components
import Card from "@components/card-snippet";
import Breadcrumbs from "@components/breadcrumbs";

// ** Source Code

import CommentTableBasic from "./CommentTableBasic";
// import TableDark from './../TableDark';
import { tableBasic } from "./../TableSourceCode";

const CommentTables = ({
  dataId,
  apiData,
  title,
  thList,
  commentState,
  setCommentState,
}) => {
  useEffect(() => {
    prism.highlightAll();
  });

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card title={title} code={tableBasic} noBody>
            <CommentTableBasic
              dataId={dataId}
              apiData={apiData}
              thList={thList}
              commentState={commentState}
              setCommentState={setCommentState}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CommentTables;
