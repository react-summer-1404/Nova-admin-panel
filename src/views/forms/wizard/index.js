// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import WizardModern from './WizardModern'
import WizardVertical from './WizardVertical'
import AddBlogsWizardHorizontal from './AddBlogsWizardHorizontal'
import WizardModernVertical from './WizardModernVertical'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'


const AddBlogsWizard = () => {
  return (
    <Fragment>
      <BreadCrumbs title='Form Wizard' data={[{ title: 'Form' }, { title: 'Form Wizard' }]} />
      <Row>
        <Col sm='12'>
          <AddBlogsWizardHorizontal />
        </Col>
      </Row>
    </Fragment>
  )
}
export default AddBlogsWizard
