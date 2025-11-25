// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, CardBody, CardText } from 'reactstrap'

// ** Third Party Components
import prism from 'prismjs'

// ** Demo Components
import TableDark from './TableDark'
import TableBasic from './TableBasic'
import TableHover from './TableHover'
import TableSmall from './TableSmall'
import TableStriped from './TableStriped'
import TableBordered from './TableBordered'
import TableTheadDark from './TableTheadDark'
import TableContextual from './TableContextual'
import TableResponsive from './TableResponsive'
import TableBorderless from './TableBorderless'
import TableTheadLight from './TableTheadLight'
import TableStripedDark from './TableStripedDark'

// ** Custom Components
import Card from '@components/card-snippet'
import Breadcrumbs from '@components/breadcrumbs'

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
  tableTheadOptions
} from './TableSourceCode'

const Tables = ({blogId,blogsData}) => {
  useEffect(() => {
    prism.highlightAll()
  })

  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Card title="لیست اخبار و مقالات" code={tableBasic} noBody>
            <TableBasic blogId={blogId} blogsData={blogsData}/>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Tables
