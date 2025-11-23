// ** React Imports
import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

// ** Product detail components
import ItemFeatures from "./ItemFeatures";
import ProductDetails from "./ProductDetails";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Card, CardBody, Col } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store";

import "@styles/base/pages/app-ecommerce-details.scss";
import TabsIcons from "../../components/tabs/TabsIconsCourses";
import tabsBasic from "../../components/tabs/TabsBasic";
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
 

  return (
    <Fragment>
      <BreadCrumbs
        title="جزییات دوره"
        data={[{ title: "مدیریت دوره ها" }, { title: "جزییات دوره" }]}
      />
      <div className="app-ecommerce-details">
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                productId={id}
                getProduct={getProduct}
                data={store.productDetail}
              />
            </CardBody>
            <ItemFeatures data={store.productDetail} />
            <CardBody>
            <Col xl='12' lg='12'>
          <Card title='Tabs with icons' code={tabsBasic}>
            <TabsIcons />
          </Card>
        </Col>
            
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Details;
