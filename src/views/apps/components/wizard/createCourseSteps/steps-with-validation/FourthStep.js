// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, Modal } from 'reactstrap'

const defaultValues = {
  Image: '',
  ImageAddress:"",
  TumbImageAddress:""
}

const FourthStep = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      alert('submitted')
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key} url`
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>عکس دوره</h5>
        <small>لطفا برای دوره عکس انتخاب کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='justify-content-center'>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='ImageAddress'>
              لینک عکس
            </Label>
            <Controller
              id='ImageAddress'
              name='ImageAddress'
              control={control}
              render={({ field }) => (
                <Input type='text' placeholder='لینک عکس مورد نظر خود را وارد کنید' invalid={errors.ImageAddress && true} {...field} />
              )}
            />
            {errors.ImageAddress && <FormFeedback>{errors.ImageAddress.message}</FormFeedback>}
          </Col>
          <Col md='8' className='mb-1'>
           <Modal>
           <Label className='form-label' for='Image'>
              عکس دوره
            </Label>
            <Controller
              id='Image'
              name='Image'
              control={control}
              render={({ field }) => (
                <Input  invalid={errors.Image && true} {...field} />
              )}
            />
            {errors.Image && <FormFeedback>{errors.Image.message}</FormFeedback>}
           </Modal>
          </Col>
        </Row>
       
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='success' className='btn-submit'>
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default FourthStep
