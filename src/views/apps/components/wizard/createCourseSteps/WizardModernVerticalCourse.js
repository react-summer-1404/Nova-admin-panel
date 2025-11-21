// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import ThirdStep from './steps-with-validation/ThirdStep'
import SocialLinks from './steps-with-validation/SocialLinks'
import SecondStep from './steps-with-validation/SecondStep'
import FirstStep from './steps-with-validation/FirstStep'

// ** Icons Imports
import { FileText, User, MapPin, Link } from 'react-feather'

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
  
    {
      id: 'first-info',
      title: 'مرحله اول',
      subtitle: 'اطلاعات اولیه دوره',
      icon: <User size={18} />,
      content: <FirstStep stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'second-info',
      title: 'مرحله دوم',
      subtitle: 'اطلاعات  دیگر دوره',
      icon: <User size={18} />,
      content: <SecondStep stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'third-info',
      title: 'مرحله سوم',
      subtitle: 'توضیحات دوره',
      icon: <MapPin size={18} />,
      content: <ThirdStep stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'social-links',
      title: 'Social Links',
      subtitle: 'Add Social Links',
      icon: <Link size={18} />,
      content: <SocialLinks stepper={stepper} type='modern-vertical' />
    }
  ]

  return (
    <div className='modern-vertical-wizard'>
      <Wizard
        type='modern-vertical'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardModernVertical
