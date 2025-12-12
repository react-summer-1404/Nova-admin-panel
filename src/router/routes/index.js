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
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const UsersList = lazy(() => import("../../@core/components/user/list"));
const UserView = lazy(() => import("../../@core/components/user/view"));
const Buildings = lazy(() => import("../../@core/components/Building/list"));
const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/courses'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))
const TechManagement = lazy(() => import('../../views/apps/ecommerce/techManagement'))
const StatusManagement = lazy(() => import('../../views/apps/ecommerce/statusManagement'))
const LevelManagement = lazy(() => import('../../views/apps/ecommerce/levelMangement'))
const CourseUserList = lazy(() => import('../../views/apps/ecommerce/useList'))
const ClassManagement = lazy(() => import('../../views/apps/ecommerce/classManagement'))
const TermManagement = lazy(() => import('../../views/apps/ecommerce/termManagement'))
const TasksManagement = lazy(() => import('../../views/apps/ecommerce/TasksManagement'))
const Department = lazy(() => import('../../views/apps/department'))
const AdminSchedule = lazy(() => import('../../views/apps/Schedule/AdminSchedule'))
const StudentSchedule = lazy(() => import('../../views/apps/Schedule/StudentSchedule'))

const DTAdvance = lazy(() => import('../../views/apps/tables/data-tables/advance'))
const DTAdvance2 = lazy(() => import('../../views/apps/tables/data-tables-user/advance'))
const DTAdvance3 = lazy(() => import('../../views/apps/tables/data-tables-groups/advance'))
const DTAdvance4 = lazy(() => import('../../views/apps/tables/data-tables-payment/advance'))
const DTAdvance5 = lazy(() => import('../../views/apps/tables/data-tables-socialGroups/advance'))
const DTAdvance6 = lazy(() => import('../../views/apps/tables/data-tables-mentors/advance'))
const BlogList = lazy(() => import('./../../views/pages/blogs/list/index'))
const BlogEdit = lazy(() => import('../../views/pages/blogs/addBlogs/index'))
const BlogDetails = lazy(() => import('../../views/pages/blogs/details/index'))
// const NewsCategoryManagment = lazy(() => import('../../views/pages/blogs/newsCategoryManagment/NewsCategoryManagment'))
const NewsCategoryManagment = lazy(() => import('../../views/pages/blogs/newsCategoryManagment'))
const Comments = lazy(() => import('../../views/pages/comments/index'))


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
    element: <UsersList/>,
    path: '/list'
  },
  {
    element: <UserView />,
    path: '/list/view/:id'
  },
  {
    element: <Buildings />,
    path: '/building'
  },
  // {
  //   path: "/sample",
  //   element: <Sample />,
  // },
  // {
  //   path: "/second-page",
  //   element: <SecondPage />,
  // },
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
    path: '/pages/blog/list',
    element: <BlogList />
  },
  {
    path: '/pages/blog/detail/:id',
    element: <BlogDetails />
  },
  {
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/1' />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <BlogEdit />
  },
  {
    path: '/pages/blog/edit',
    element: <Navigate to='/pages/blog/edit/1' />
  },
  {
    path: '/pages/blog/newscategorymanegment',
    element: <NewsCategoryManagment />
  },
  {
    path: '/pages/comments',
    element: <Comments />
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
    path: '/apps/ecommerce/techManagement',
    element: <TechManagement />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/statusManagement',
    element: <StatusManagement />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/levelManagement',
    element: <LevelManagement />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/useList',
    element: <CourseUserList />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/classList',
    element: <ClassManagement />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/termList',
    element: <TermManagement />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/taskList',
    element: <TasksManagement />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/Department',
    element: <Department />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/schedule/adminSchedule',
    element: <AdminSchedule/>,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/schedule/studentSchedule',
    element: <StudentSchedule/>,
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
