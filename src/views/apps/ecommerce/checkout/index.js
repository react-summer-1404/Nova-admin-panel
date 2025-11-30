// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '../../components/wizard/createCourseSteps/WizardModernVerticalCourse'
import BreadCrumbs from '@components/breadcrumbs'


// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

  const steps = []

  return (
    <Fragment>
      <BreadCrumbs title='ساخت دوره' data={[{ title: 'مدیریت دوره ها' }, { title: 'ساخت دوره' }]} />
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={el => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  )
}

export default Checkout
