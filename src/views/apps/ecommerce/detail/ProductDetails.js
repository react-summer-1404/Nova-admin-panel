// // ** React Imports
// import { useState } from "react";
// import { Link } from "react-router-dom";

// // ** Third Party Components
// import classnames from "classnames";
// import {
//   Star,
//   ShoppingCart,
//   DollarSign,
//   Heart,
//   Share2,
//   Facebook,
//   Twitter,
//   Youtube,
//   Instagram,
// } from "react-feather";

// // ** Reactstrap Imports
// import {
//   Row,
//   Col,
//   Button,
//   CardText,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   UncontrolledButtonDropdown,
// } from "reactstrap";


// const Product = (props) => {
//   // ** Props
//   const { data, dispatch, getProduct, productId } = props;

//   // ** State
//   const [selectedColor, setSelectedColor] = useState("primary");

//   // ** Renders color options
//   // const renderColorOptions = () => {
//   //   return data.colorOptions.map((color, index) => {
//   //     const isLastColor = data.colorOptions.length - 1 === index

//   //     return (
//   //       <li
//   //         key={color}
//   //         className={classnames('d-inline-block', {
//   //           'me-25': !isLastColor,
//   //           selected: selectedColor === color
//   //         })}
//   //         onClick={() => setSelectedColor(color)}
//   //       >
//   //         <div className={`color-option b-${color}`}>
//   //           <div className={`filloption bg-${color}`}></div>
//   //         </div>
//   //       </li>
//   //     )
//   //   })
//   // }

//   // ** Handle Wishlist item toggle
//   // const handleWishlist = val => {
//   //   if (val) {
//   //     dispatch(deleteWishlistItem(productId))
//   //   } else {
//   //     dispatch(addToWishlist(productId))
//   //   }
//   //   dispatch(getProduct(productId))
//   // }

//   // ** Handle Move/Add to cart
//   // const handleCartBtn = (id, val) => {
//   //   if (val === false) {
//   //     dispatch(addToCart(id));
//   //   }
//   //   dispatch(getProduct(productId));
//   // };

//   // ** Condition btn tag
//   const CartBtnTag = data.isInCart ? Link : "button";

//   return (
//     <Row className="my-2">
//       <Col
//         className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
//         md="5"
//         xs="12"
//       >
//         <div className="d-flex align-items-center justify-content-center">
//           <img
//             className="img-fluid product-img"
//             src={data.image}
//             alt={data.name}
//           />
//         </div>
//       </Col>
//       <Col md="7" xs="12">
//         <h4 style={{ fontSize: 20 }}>{data.name}</h4>
//         <CardText tag="span" className="item-company" style={{ fontSize: 16 }}>
//           توسط
//           <a
//             className="company-name"
//             style={{ fontSize: 16 }}
//             href="/"
//             onClick={(e) => e.preventDefault()}
//           >
//             {data.brand}
//           </a>
//         </CardText>
//         <div className="ecommerce-details-price d-flex flex-wrap mt-1">
//           <h4 className="item-price me-1">${data.price}</h4>
//           <ul className="unstyled-list list-inline">
//             {new Array(5).fill().map((listItem, index) => {
//               return (
//                 <li key={index} className="ratings-list-item me-25">
//                   <Star
//                     className={classnames({
//                       "filled-star": index + 1 <= data.rating,
//                       "unfilled-star": index + 1 > data.rating,
//                     })}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         <CardText>
//           <div>
//             {data.isActive ? (
//               <span className="text-success ms-25" style={{ fontSize: 18 }}>
//                 فعال
//               </span>
//             ) : (
//               <span className="ms-25" style={{ color: "red" }}>
//                 غیر فعال
//               </span>
//             )}
//           </div>
//         </CardText>
//         <div style={{display:"flex",gap:3,alignItems:"center"}}> وضعیت دوره:
//         <CardText style={{ fontSize: 14 ,borderRadius:8,width:70,backgroundColor:"#eee" ,padding:3,color:"red",textAlign:"center"}}>{data.statusName} </CardText>

//         </div>
//         <CardText>{data.description}</CardText>


//         <div style={{display:"flex",gap:3,alignItems:"center"}}> زمان شروع دوره:
//         <CardText style={{ fontSize: 14,fontWeight:600 ,borderRadius:8 ,padding:3,textAlign:"center"}}>{data.endTime} </CardText>

//         </div>
//           <div style={{display:"flex",gap:3,alignItems:"center"}}> زمان پایان دوره:
//         <CardText style={{ fontSize: 14 ,fontWeight:600,borderRadius:8,padding:3 ,textAlign:"center"}}>{data.startTime} </CardText>

//         </div>
//         <div className="d-flex flex-column flex-sm-row pt-1">
//           {/* <Button
//             tag={CartBtnTag}
//             className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
//             color="primary"
//             onClick={() => handleCartBtn(data.id, data.isInCart)}
//             {...(data.isInCart
//               ? {
//                   to: "/apps/ecommerce/checkout",
//                 }
//               : {})}
//           >
//             <ShoppingCart className="me-50" size={14} />
//             {data.isInCart ? "View in cart" : "Move to cart"}
//           </Button> */}
          
//           {/* <Button
//             className='btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0'
//             color='secondary'
//             outline
//             onClick={() => handleWishlist(data.isInWishlist)}
//           >
//             <Heart
//               size={14}
//               className={classnames('me-50', {
//                 'text-danger': data.isInWishlist
//               })}
//             />
//             <span>Wishlist</span>
//           </Button> */}
//           {/* <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
//             <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
//               <Share2 size={14} />
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
//                 <Facebook size={14} />
//               </DropdownItem>
//               <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
//                 <Twitter size={14} />
//               </DropdownItem>
//               <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
//                 <Youtube size={14} />
//               </DropdownItem>
//               <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
//                 <Instagram size={14} />
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledButtonDropdown> */}
//         </div>

//       </Col>
//     </Row>

//   );
// };

// export default Product;

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
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'


const MySwal = withReactContent(Swal)

const Product = ({ selectedCourse }) => {
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      // username: selectedCourse.username,
      // lastName: selectedCourse.fullName.split(' ')[1],
      // title: selectedCourse?.title || ""
    }
  })

  // ** render user img


  
  

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
      // username: selectedCourse.username,
      // lastName: selectedCourse.fullName.split(' ')[1],
      // title: selectedCourse?.title || ""
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
              
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedCourse?.image}
          className='img-fluid rounded mt-3 mb-2'
        />
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedCourse?.title}</h4>
                  {selectedCourse?.active? (
                    <Badge color='success' className='text-capitalize'> </Badge>
                  ) :  <Badge color='danger' className='text-capitalize'> </Badge>
                }
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
                <h4 className='mb-0'>1.23k</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>568</h4>
                <small>Projects Done</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
    
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نام استاد:</span>
                  <span>{selectedCourse?.teacherName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>قیمت :</span>
                  <span>{selectedCourse?.price}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>وضعیت:</span>
                  {/* <Badge className='text-capitalize' color={statusColors[selectedCourse.status]}>
                    {selectedCourse.statusName}
                  </Badge> */}

                  <span>{selectedCourse?.statusName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ظرفیت:</span>
                  <span className='text-capitalize'>{selectedCourse?.capacity}</span>
                </li>
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Tax ID:</span>
                  <span>Tax-{selectedCourse.contact.substr(selectedCourse.contact.length - 4)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedCourse.contact}</span>
                </li> */}
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>تاریخ شروع:</span>
                  <span>{selectedCourse?.startTime}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>تاریخ پایان:</span>
                  <span>{selectedCourse?.endTime}</span>
                </li>
              </ul>
        
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Suspended
            </Button>
          </div>
        </CardBody>
      </Card>
      {/* <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Billing Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedCourse.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedCourse.status)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Tax ID
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  // defaultValue={selectedCourse.contact.substr(selectedCourse.contact.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  Contact
                </Label>
                <Input id='contact' defaultValue={selectedCourse.contact} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
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
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal> */}
    </Fragment>
  )
}

export default Product
