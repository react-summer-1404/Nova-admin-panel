// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
// import '@src/@fake-db';

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const UserManagement = lazy(() => import("../../pages/UserManagement"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/courses'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
// const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))


const DTAdvance = lazy(() => import('../../views/apps/tables/data-tables/advance'))
const DTAdvance2 = lazy(() => import('../../views/apps/tables/data-tables-user/advance'))
const DTAdvance3 = lazy(() => import('../../views/apps/tables/data-tables-groups/advance'))
const DTAdvance4 = lazy(() => import('../../views/apps/tables/data-tables-payment/advance'))
const DTAdvance5 = lazy(() => import('../../views/apps/tables/data-tables-socialGroups/advance'))
const DTAdvance6 = lazy(() => import('../../views/apps/tables/data-tables-mentors/advance'))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/userManagement",
    element: <UserManagement />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  
  
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/courses',
    meta: {
      className: 'ecommerce-application'
    }
  },
 
  {
    path: '/apps/ecommerce/product-detail',
    meta: {
      className: '/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/datatables/advance',
    element: <DTAdvance />
  },
  {
    path: '/datatables/advance',
    element: <DTAdvance2 />
  },
  {
    path: '/datatables/advance',
    element: <DTAdvance3 />
  },
  {
    path: '/datatables/advance',
    element: <DTAdvance4 />
  },
  {
    path: '/datatables/advance',
    element: <DTAdvance5 />
  },
  {
    path: '/datatables/advance',
    element: <DTAdvance6 />
  },
  {
    path: '/apps/ecommerce/product-detail/:id',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/createCourse',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
