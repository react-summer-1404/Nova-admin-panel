// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '../../../components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const roleColors = {
  SuperAdmin: 'light-info',
  admin: 'light-danger',
  teacher: 'light-warning',
  student: 'light-success',
}

const statusColors = {
  true: 'light-success',
  false: 'light-secondary'
}

const statusOptions = [
  { value: true, label: 'فعال' },
  { value: false, label: 'غیر فعال' },
]

const genderOptions = [
  { value: true, label: 'مرد' },
  { value: false, label: 'زن' },
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues})
  

  const defaultValues = {
    username: selectedUser.userName || "",
    lastName: selectedUser.lName.split(' ')[1] || "",
    firstName: selectedUser.fName.split(' ')[0] || ""
  }

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.currentPictureAddress.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.currentPictureAddress}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser.fName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      username: selectedUser.userName,
      lastName: selectedUser.lName.split(' ')[1],
      firstName: selectedUser.fName.split(' ')[0]
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: 'User has been suspended.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Suspension :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? selectedUser.fName : ' نام کاربر'}</h4>
                  {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser?.roles]} className='text-capitalize'>
                      {selectedUser.roles}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.courseStudent.length || 0}</h4>
                <small>دوره های ثبت شده</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.courseReserve.length || 0}</h4>
                <small>دوره های رزرو شده</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>جزئیات</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نام کاربری:</span>
                  <span>{selectedUser.userName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ایمیل:</span>
                  <span>{selectedUser.gmail}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>وضعیت:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser?.active]}>
                    {statusOptions.find(act => act.value === selectedUser?.active)?.label }
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نقش:</span>
                  <span className='text-capitalize'>{selectedUser.roles}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'> جنسیت:</span>
                  <span>{selectedUser.gender}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>شماره موبایل:</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
                
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              غیر فعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>ویرایش اطلاعات کاربر</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  نام
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='fName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='نام را وارد کنید' invalid={errors.fName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  نام خانوادگی
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='نام خانوادگی را وارد کنید' invalid={errors.lName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  نام کاربری
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='userName'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='نام کاربری را وارد کنید' invalid={errors.userName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  ایمیل
                </Label>
                <Input
                  type='email'
                  id='gmail'
                  defaultValue={selectedUser.gmail}
                  placeholder='ایمیل را وارد کنید'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  وضعیت:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.active)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  جنسیت:
                </Label>
                <Select
                  id='gender'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={genderOptions}
                  theme={selectThemeColors}
                  defaultValue={genderOptions[genderOptions.findIndex(i => i.value === selectedUser.gender)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  شماره تلفن:
                </Label>
                <Input id='contact' defaultValue={selectedUser.phoneNumber} placeholder='شماره تلفن را وارد کنید' />
              </Col>
              
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  تایید و ارسال
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  صرف نظر کردن
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
