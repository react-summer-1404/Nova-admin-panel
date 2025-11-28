// ** React Imports
import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

// ** Product detail components
import ItemFeatures from "./ItemFeatures";
import ProductDetails from "./ProductDetails";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store";

import "@styles/base/pages/app-ecommerce-details.scss";
import TabsIcons from "../../components/tabs/TabsIconsCourses";
const Details = () => {
  // ** Vars
  const {id} = useParams()
  // const productId = params.substring(params.lastIndexOf("-") + 1);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);
 const data=store?.productDetail
 
  const selectedCourse =data?{
    // currentRate : data.currentRate,
    id:data.id,
    teacherName:data.teacherName,
    statusName:data.statusName,
    title:data.name,
    describe:data.description,
    // courseTeches:data.courseTeches,
    active:data.active,
    price:data.price,
    startTime:data.startTime,
    endTime:data.endTime,
    capacity:data.capacity,
    image:data.image,
    reserveUserTotal:data.reserveUserTotal,
    courseCommentTotal:data.courseCommentTotal,
    isExpire:data.isExpire,
    googleTitle:data.googleTitle,
    teacherId:data.teacherId,
    courseLvlId:data.courseLvlId,
    imageAddress:data.imageAddress,
    miniDescribe:data.miniDescribe,
    statusId:data.statusId

  }:null

  return (
    <Fragment>
      <BreadCrumbs
        title="جزییات دوره"
        data={[{ title: "مدیریت دوره ها" }, { title: "جزییات دوره" }]}
      />
      <div className="">
        {selectedCourse ? (
       
        <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
        <ProductDetails
          dispatch={dispatch}
          productId={id}
          getProduct={getProduct}
          data={store.productDetail}
          selectedCourse={selectedCourse}
        />
          {/* <PlanCard /> */}
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
        <TabsIcons />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
        {/* <ItemFeatures data={store.productDetail} /> */}

        </Col>
      </Row>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Details;
