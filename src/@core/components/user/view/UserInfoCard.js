// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X, Edit2, Edit } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '../../../components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { UseUpdateUser } from '../../../../core/Hook/useMUserApi'
import SwitchIcons from '../../switch/SwitchIcons'
import { error } from 'jquery'

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
  { value: true, label: 'زن' },
  { value: false, label: 'مرد' },
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {

  const {mutate: UpdateUser} = UseUpdateUser({
    onSuccess : () => {      
      toast.success("اطلاعات با موفقیت ویرایش شد.")
    },

    onError : () => {      
        toast.error(error?.response?.data?.message || "خطا در ویرایش کاربر ")
    } 
  })
  // ** State
  const [show, setShow] = useState(false)
  const [play, setPlay] = useState(false)
  const defaultValues = {
    username: selectedUser?.userName || "",
    lastName: selectedUser?.lName?.split(' ')[1] || "",
    firstName: selectedUser?.fName?.split(' ')[0] || "",
    // gmail: selectedUser?.gmail|| "",
    // phoneNumber: selectedUser?.phoneNumber|| "",
    // active : selectedUser?.active|| "",
    // isDelete,
    // isTecher,
    // isStudent,
    // recoveryEmail,
    // twoStepAuth,
    // userAbout,
    // currentPictureAddress,
    // linkdinProfile,
    // telegramLink,
    // receiveMessageEvent,
    // homeAdderess,
    // nationalCode,
    // gender,
    // latitude,
    // longitude,
    // insertDate,
    // birthDay
  }

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues})

  // ** render user img
  const renderUserImg = () => {
    const picture = selectedUser?.currentPictureAddress;
    if (typeof picture === "string" && picture.trim().length > 0) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser?.currentPictureAddress}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser?.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser?.fName}
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
    const isValid = Object.values(data).every((field ) => 
        typeof field === "string" && field.trim().length > 0
      );
      if (!isValid){
        setShow(false);
        for (const key in data) {
          const value = data[key]
          if (!value || (typeof value=== 'string' && value.trim().length === 0)) {
            setError(key, {
              type: 'manual',
              message : 'این فیلد نمی تواند خالی باشد'
            })
          }
        }      
      }else {
      UpdateUser({id: selectedUser.id ,data});
    }
  }

  const handleReset = () => {
    reset({
      username: selectedUser?.userName,
      lastName: selectedUser?.lName.split(' ')[1],
      firstName: selectedUser?.fName.split(' ')[0]
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'ایا مطمئن هستید؟',
      text: "شما قادر به بازگرداندن کاربر نخواهید بود!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله, غیر فعال کردن کاربر!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'غیر فعال!',
          text: 'کاربر غیر فعال شد.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'لغو',
          text: ' لغو غیر فعال کردن :)',
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
                  <h4>{selectedUser !== null ? selectedUser?.lName : ' نام خانواگی کاربر'}</h4>
                  <h4>{selectedUser !== null ? selectedUser?.fName : ' نام کاربر'}</h4>
                  {selectedUser?.roles?.map((role, index) => (
                    <Badge color={roleColors[role]} className='text-capitalize me-50'>
                      {role.roleName}
                    </Badge>,
                    console.log("role",selectedUser?.roles )
                  ))}
                  
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
                  <span>{selectedUser?.userName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ایمیل:</span>
                  <span>{selectedUser?.gmail}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>وضعیت:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser?.active]}>
                    {statusOptions.find(act => act.value === selectedUser?.active)?.label }
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نقش:</span>
                  <span className='text-capitalize'>{selectedUser?.roles.map((rol)=>(
                    rol.roleName
                  )).join(', ')}</span>
                  <Button color='transparent' onClick={() => setPlay(true)}>
                  <Edit className='font-medium-3'/>
                  </Button>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'> جنسیت:</span>
                  <span>{genderOptions.find(gen => gen.value === selectedUser?.gender)?.label}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>شماره موبایل:</span>
                  <span>{selectedUser?.phoneNumber}</span>
                </li>
                
              </ul>
            ) : null}
          </div>
          <Modal isOpen={play} toggle={() => setPlay(!play)} className ='modal-dialog-centered modal-sm'>
          <ModalHeader className='bg-transparent' toggle={() => setPlay(!play)}></ModalHeader>
          <div className='text-center mb-1'> 
            <h1 > افرودن دسترسی ها به کاربر</h1>
          </div>
          <div>
            <SwitchIcons
              userId={selectedUser?.id}
              userRoles={selectedUser?.roles}
            />
          </div>
          </Modal>
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
      <Modal isOpen={show} toggle={() => setShow(!show)} className ='modal-dialog-centered modal-lg'>
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
                  control={control}
                  id='firstName'
                  name='fName'
                  render={({ field }) => (
                    <Input {...field} id='firstName'  defaultValue= {selectedUser?.fName} placeholder='نام را وارد کنید' invalid={errors.fName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  نام خانوادگی
                </Label>
                <Controller                  
                  control={control}
                  id='lastName'
                  name='lName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' defaultValue={selectedUser?.lName} placeholder='نام خانوادگی را وارد کنید' invalid={errors.lName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  نام کاربری
                </Label>
                <Controller
                  
                  control={control}
                  id='username'
                  name='userName'
                  render={({ field }) => (
                    <Input {...field} id='username' defaultValue={selectedUser?.userName} placeholder='نام کاربری را وارد کنید' invalid={errors.userName && true} />
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
                  defaultValue={selectedUser?.gmail}
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
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser?.active)]}
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
                  defaultValue={genderOptions[genderOptions.findIndex(i => i.value === selectedUser?.gender)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  شماره تلفن:
                </Label>
                <Input id='contact' defaultValue={selectedUser?.phoneNumber} placeholder='شماره تلفن را وارد کنید' />
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
