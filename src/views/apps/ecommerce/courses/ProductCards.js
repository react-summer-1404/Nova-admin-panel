// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Star, DollarSign, User  } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from "reactstrap";
import { flexibleCompare } from "@fullcalendar/core";

const ProductCards = (props) => {
  // ** Props
  const {
    store,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
  } = props;

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => {
        // const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className="ecommerce-card" key={item.id}>
            <div
              className="item-img text-center mx-auto"
              style={{ position: "relative" }}
            >
              <Link to={`/apps/ecommerce/product-detail/${item.id}`}>
                <img
                  className="img-fluid card-img-top"
                  style={{ borderRadius: 10 }}
                  src={item.image}
                  alt={item.name}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 30,
                    right: 5,
                    fontSize: 16,
                    padding: 2,
                    borderRadius: 8,
                    width: 50,
                  }}
                >
                  {item.active ? <Badge color='success' className='badge-glow' >فعال</Badge> : <Badge color='danger' className='badge-glow'>غیر فعال</Badge>}
                </div>
              </Link>
            </div>
            <CardBody>
             
            
              
              <h4 className="item-name">
                <Link
                  className="text-body"
                  to={`/apps/ecommerce/product-detail/${item.slug}`}
                >
                  {item.name}
                </Link>
           
              </h4>
              <CardText style={{color:"#7367f0"}} className="item-description">
                {item.description}
              </CardText>

              <div className="item-wrapper">
                  <h3 className="unstyled-list list-inline item-wrapper" >
                    <User  className={classnames('me-50', {
                    
                  })}
                  size={16}/>
                    <h6>{item.brand}</h6>
                  </h3>

                <div className="item-cost text-right item-wrapper">
                  <DollarSign className={classnames('me-50', {
                    
                  })}
                  size={16}/>
                  <h6 className="item-price"> {item.price} تومان</h6>

                </div>
      
              </div>
              <div className="item-wrapper">
                  <h6 className="item-wrapper" style={{display:"flex",gap:2}}>
                    <h6 style={{fontWeight:550,fontSize:16}}>اخرین اپدیت:</h6>
                    <span style={{color:"gray"}}>{item.lastUpdate}</span>
                  </h6>

                <div className="item-cost text-right item-wrapper">
                {item.isExpire?<Badge  color="light-success" >فعال</Badge> : <Badge color="light-danger">غیر فعال</Badge>}

                </div>
      
              </div>

            
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className="shipping">
                      <Badge color="light-success">Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>
        );
      });
    }
  };

  return (
    <div
      className={classnames({
        "grid-view": activeView === "grid",
        "list-view": activeView === "list",
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default ProductCards;
