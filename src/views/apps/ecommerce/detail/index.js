// ** React Imports
import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

// ** Product detail components
import ItemFeatures from "./ItemFeatures";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getProduct, addToCart } from "../store";

import "@styles/base/pages/app-ecommerce-details.scss";
import { lazy } from "react";
import { Suspense } from "react";

const Details = () => {
  // ** Vars
  const params = useParams().product;
  const productId = params.substring(params.lastIndexOf("-") + 1);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);
  const DTAdvance = lazy(() =>
    import("../../../apps/tables/data-tables/advance")
  );
  const DTAdvance2 = lazy(() =>
    import("../../../apps/tables/data-tables-user/advance")
  );
  const DTAdvance3 = lazy(() =>
    import("../../../apps/tables/data-tables-groups/advance")
  );

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
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail}
                // addToWishlist={addToWishlist}
                // deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
            <ItemFeatures />
            <CardBody>
              {/* <RelatedProducts /> */}
              <Suspense fallback={<div>در حال بارگذاری جدول...</div>}>
                <DTAdvance />
              </Suspense>
              <Suspense fallback={<div>در حال بارگذاری جدول...</div>}>
                <DTAdvance2 />
              </Suspense>
              <Suspense fallback={<div>در حال بارگذاری جدول...</div>}>
                <DTAdvance3 />
              </Suspense>
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Details;
