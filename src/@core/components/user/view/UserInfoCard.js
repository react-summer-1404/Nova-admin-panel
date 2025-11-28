// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase, Edit } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '../../../components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useUpdateUser } from '../../../../core/Hook/useMUserApi'
import SwitchIcons from '../../switch/SwitchIcons'
import { error } from 'jquery'
import toast from 'react-hot-toast'

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
  const defaultValues = {
    userName: selectedUser?.userName || "",
    lName: selectedUser?.lName || "",
    fName: selectedUser?.fName || "",
    gmail: selectedUser?.gmail|| "",
    phoneNumber: selectedUser?.phoneNumber|| "",
    gender : selectedUser?.gender ?? true,
    active : selectedUser?.active ?? true,
    id : selectedUser?.id || "",
    recoveryEmail : selectedUser?.recoveryEmail ,
    isDelete : selectedUser?.isDelete ?? false,
    isTecher : selectedUser?.isTecher ?? false,
    isStudent : selectedUser?.isStudent ?? false,
    twoStepAuth : selectedUser?.twoStepAuth ?? false,
    userAbout : selectedUser?.userAbout || "",
    currentPictureAddress : selectedUser?.currentPictureAddress || "",
    linkdinProfile : selectedUser?.linkdinProfile || "",
    telegramLink : selectedUser?.telegramLink || "",
    receiveMessageEvent : selectedUser?.receiveMessageEvent ?? false,
    homeAdderess : selectedUser?.homeAdderess || "",
    nationalCode : selectedUser?.nationalCode || "",
    latitude : selectedUser?.latitude || "",
    longitude : selectedUser?.longitude || "",
    insertDate : selectedUser?.insertDate || "",
    birthDay : selectedUser?.birthDay || "",
  }

  // ** State
  const [show, setShow] = useState(false)
  const [play, setPlay] = useState(false)
  

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues, mode: "onChange"});

  useEffect(() => {
    reset(defaultValues);
  },[selectedUser]);

  const {mutate: updateUser} = useUpdateUser({
    onSuccess : () => {      
      toast.success("اطلاعات با موفقیت ویرایش شد.")
    },

    onError : () => {      
        toast.error(error?.response?.data?.message || "خطا در ویرایش کاربر ")
    } 
  })
  const validateForm = (data) => {
    const isValid = Object.entries(data).every(([key, value]) =>{ 
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "boolean") return true;
      return value !== null && value !== undefined;
    });

    if (!isValid){
      for (const key in data) {
        const value = data[key];
        if (!value || (typeof value=== 'string' && value.trim().length === 0)) {
          setError(key, {
            type: 'manual',
            message : 'این فیلد نمی تواند خالی باشد'
          });
        }
      }      
    }
    return isValid;
  }

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

  const onSubmit = (formData) => {
    if (!validateForm(formData)) {
      toast.error('اطلاعات فرم معتبر نیست');
      return;
    }
    const finalData = {
      ...defaultValues,
      ...formData,
      id : selectedUser.id
    }
    updateUser(finalData);
  };

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
                <Label className='form-label' for='fName'>
                  نام
                </Label>
                <Controller        
                  control={control}                  
                  name='fName'
                  rules={{required: 'نام الزامی است'}}
                  render={({ field }) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.fName} placeholder='نام را وارد کنید' />
                    {errors.fName && <span>{errors.fName.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  نام خانوادگی
                </Label>
                <Controller                  
                  control={control}                  
                  name='lName'
                  rules={{required: 'نام خانوادگی الزامی است'}}
                  render={({ field }) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.lName} placeholder='نام خانوادگی را وارد کنید' />
                    {errors.lName && <span>{errors.lName.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='userName'>
                  نام کاربری
                </Label>
                <Controller                  
                  control={control}                  
                  name='userName'
                  rules={{required: 'نام کاربری الزامی است'}}
                  render={({ field }) => (
                    <>
                      <Input {...field} defaultValue= {selectedUser?.userName} placeholder='نام کاربری را وارد کنید' />
                      {errors.userName && <span>{errors.userName.message}</span>}
                    </>                  
                    )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='gmail'>
                  ایمیل
                </Label>
                <Controller
                  name='gmail'
                  control={control}
                  rules={{required: 'ایمیل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.gmail} placeholder='ایمیل را وارد کنید' />
                    {errors.gmail && <span>{errors.gmail.message}</span>}
                  </>
                  )}                  
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='active'>
                  وضعیت:
                </Label>
                <Controller
                  name='active'
                  control={control}
                  render={({field}) => (
                    <select {...field} className='form-control'>
                      {statusOptions.map((opt) => (
                        <option key={opt.value.toString()} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}                                    
                    </select>
                  )}
              />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='gender'>
                  جنسیت:
                </Label>
                <Controller
                  name='gender'
                  control={control}
                  render={({field}) => (
                    <select {...field} className='form-control'>
                      {genderOptions.map((opt) => (
                        <option key={opt.value.toString()} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}                                    
                    </select>
                  )}
              />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='phoneNumber'>
                  شماره موبایل:
                </Label>
                <Controller
                  name='phoneNumber'
                  control={control}
                  rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.phoneNumber} placeholder='شماره موبایل را وارد کنید' />
                    {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                  </>
                  )}                  
                />              
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='userAbout'>
                  درباره کاربر:
                </Label>
                <Controller
                  name='userAbout'
                  control={control}
                  // rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.userAbout} placeholder='درباره کاربر را وارد کنید' />
                    {errors.userAbout && <span>{errors.userAbout.message}</span>}
                  </>
                  )}                  
                />              
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='insertDate'>
                  تاریخ درج:
                </Label>
                <Controller
                  name='insertDate'
                  control={control}
                  // rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.insertDate?.slice(0,10)} placeholder='تاریخ درج را وارد کنید' />
                    {errors.insertDate && <span>{errors.insertDate.message}</span>}
                  </>
                  )}                  
                />              
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='nationalCode'>
                  کد ملی:
                </Label>
                <Controller
                  name='nationalCode'
                  control={control}
                  // rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.nationalCode} placeholder='کد ملی را وارد کنید' />
                    {errors.nationalCode && <span>{errors.nationalCode.message}</span>}
                  </>
                  )}                  
                />              
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='linkdinProfile'>
                لینکدین :
                </Label>
                <Controller
                  name='linkdinProfile'
                  control={control}
                  // rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.linkdinProfile} placeholder='لینکدین را وارد کنید' />
                    {errors.linkdinProfile && <span>{errors.linkdinProfile.message}</span>}
                  </>
                  )}                  
                />              
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='latitude'>
                عرض جغرافیایی :
                </Label>
                <Controller
                  name='latitude'
                  control={control}
                  // rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.latitude} placeholder='عرض جغرافیایی را وارد کنید' />
                    {errors.latitude && <span>{errors.latitude.message}</span>}
                  </>
                  )}                  
                />              
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='longitude'>
                طول جغرافیایی :
                </Label>
                <Controller
                  name='longitude'
                  control={control}
                  // rules={{required: 'شماره موبایل الزامی است'}}
                  render={({field}) => (
                    <>
                    <Input {...field} defaultValue= {selectedUser?.longitude} placeholder='طول جغرافیایی را وارد کنید' />
                    {errors.longitude && <span>{errors.longitude.message}</span>}
                  </>
                  )}                  
                />              
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
