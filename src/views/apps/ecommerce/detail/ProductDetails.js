// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import {
  Star,
  ShoppingCart,
  DollarSign,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { lazy } from "react";
import { Suspense } from "react";
const DTAdvance = lazy(() => import('../../../apps/tables/data-tables/advance'))

const Product = (props) => {
  // ** Props
  const { data, dispatch, getProduct, productId, addToCart } = props;

  // ** State
  const [selectedColor, setSelectedColor] = useState("primary");

  // ** Renders color options
  // const renderColorOptions = () => {
  //   return data.colorOptions.map((color, index) => {
  //     const isLastColor = data.colorOptions.length - 1 === index

  //     return (
  //       <li
  //         key={color}
  //         className={classnames('d-inline-block', {
  //           'me-25': !isLastColor,
  //           selected: selectedColor === color
  //         })}
  //         onClick={() => setSelectedColor(color)}
  //       >
  //         <div className={`color-option b-${color}`}>
  //           <div className={`filloption bg-${color}`}></div>
  //         </div>
  //       </li>
  //     )
  //   })
  // }

  // ** Handle Wishlist item toggle
  // const handleWishlist = val => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(productId))
  //   } else {
  //     dispatch(addToWishlist(productId))
  //   }
  //   dispatch(getProduct(productId))
  // }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id));
    }
    dispatch(getProduct(productId));
  };

  // ** Condition btn tag
  const CartBtnTag = data.isInCart ? Link : "button";

  return (
    <Row className="my-2">
      <Col
        className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
        md="5"
        xs="12"
      >
        <div className="d-flex align-items-center justify-content-center">
          <img
            className="img-fluid product-img"
            src={data.image}
            alt={data.name}
          />
        </div>
      </Col>
      <Col md="7" xs="12">
        <h4 style={{ fontSize: 20 }}>{data.name}</h4>
        <CardText tag="span" className="item-company" style={{ fontSize: 16 }}>
          توسط
          <a
            className="company-name"
            style={{ fontSize: 16 }}
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            {data.brand}
          </a>
        </CardText>
        <div className="ecommerce-details-price d-flex flex-wrap mt-1">
          <h4 className="item-price me-1">${data.price}</h4>
          <ul className="unstyled-list list-inline">
            {new Array(5).fill().map((listItem, index) => {
              return (
                <li key={index} className="ratings-list-item me-25">
                  <Star
                    className={classnames({
                      "filled-star": index + 1 <= data.rating,
                      "unfilled-star": index + 1 > data.rating,
                    })}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <CardText>
          <div>
            {data.isActive ? (
              <span className="text-success ms-25" style={{ fontSize: 18 }}>
                فعال
              </span>
            ) : (
              <span className="ms-25" style={{ color: "red" }}>
                غیر فعال
              </span>
            )}
          </div>
        </CardText>
        <div style={{display:"flex",gap:3,alignItems:"center"}}> وضعیت دوره:
        <CardText style={{ fontSize: 14 ,borderRadius:8,width:70,backgroundColor:"#eee" ,padding:3,color:"red",textAlign:"center"}}>{data.statusName} </CardText>

        </div>
        <CardText>{data.description}</CardText>


        <div style={{display:"flex",gap:3,alignItems:"center"}}> زمان شروع دوره:
        <CardText style={{ fontSize: 14,fontWeight:600 ,borderRadius:8 ,padding:3,textAlign:"center"}}>{data.endTime} </CardText>

        </div>
          <div style={{display:"flex",gap:3,alignItems:"center"}}> زمان پایان دوره:
        <CardText style={{ fontSize: 14 ,fontWeight:600,borderRadius:8,padding:3 ,textAlign:"center"}}>{data.startTime} </CardText>

        </div>
        <div className="d-flex flex-column flex-sm-row pt-1">
          <Button
            tag={CartBtnTag}
            className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
            color="primary"
            onClick={() => handleCartBtn(data.id, data.isInCart)}
            /*eslint-disable */
            {...(data.isInCart
              ? {
                  to: "/apps/ecommerce/checkout",
                }
              : {})}
            /*eslint-enable */
          >
            <ShoppingCart className="me-50" size={14} />
            {data.isInCart ? "View in cart" : "Move to cart"}
          </Button>
          
          {/* <Button
            className='btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleWishlist(data.isInWishlist)}
          >
            <Heart
              size={14}
              className={classnames('me-50', {
                'text-danger': data.isInWishlist
              })}
            />
            <span>Wishlist</span>
          </Button> */}
          {/* <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown> */}
        </div>
        <Suspense fallback={<div>در حال بارگذاری جدول...</div>}>
        <DTAdvance />
      </Suspense>
      </Col>
    </Row>
  );
};

export default Product;
