// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  Title: '',
  MiniDescribe: ''
}

const FirstStep = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }

  const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Spain', label: 'Spain' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Australia', label: 'Australia' }
  ]

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' }
  ]

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>مرحله اول </h5>
        <small>لطفا اطلاعات خواسته شده را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Title'>
              عنوان
            </Label>
            <Controller
              id='Title'
              name='Title'
              control={control}
              render={({ field }) => <Input placeholder='عنوان دوره' invalid={errors.Title && true} {...field} />}
            />
            {errors.Title && <FormFeedback>{errors.Title.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='MiniDescribe'>
              توضیحات کوتاه
            </Label>
            <Controller
              id='MiniDescribe'
              name='MiniDescribe'
              control={control}
              render={({ field }) => <Input placeholder='دوره را توصیف کنید' invalid={errors.MiniDescribe && true} {...field} />}
            />
            {errors.MiniDescribe && <FormFeedback>{errors.MiniDescribe.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Capacity'>
              ظرفیت دوره
            </Label>
           
              <Controller
              id='Capacity'
              name='Capacity'
              control={control}
              render={({ field }) => <Input type='number' placeholder='ظرفبیت دوره ها وارد کنید' invalid={errors.Capacity && true} {...field} />}
            />
            {errors.Capacity && <FormFeedback>{errors.Capacity.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Cost'>
             قیمت دوره
            </Label>
            {/* <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              id={`language`}
              options={languageOptions}
              className='react-select'
              classNamePrefix='select'
            /> */}
             <Controller
              id='Cost'
              name='Cost'
              control={control}
              render={({ field }) => <Input type='number' placeholder='ظرفبیت دوره ها وارد کنید' invalid={errors.Cost && true} {...field} />}
            />
            {errors.Cost && <FormFeedback>{errors.Cost.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default FirstStep
