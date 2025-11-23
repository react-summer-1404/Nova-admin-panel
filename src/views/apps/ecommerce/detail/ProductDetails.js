// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import {
  Star,
} from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardText,
} from "reactstrap";


const Product = (props) => {
  // ** Props
  const { data, dispatch, getProduct, productId } = props;

  // ** State
  const [selectedColor, setSelectedColor] = useState("primary");


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
     
        </div>

      </Col>
    </Row>

  );
};

export default Product;
