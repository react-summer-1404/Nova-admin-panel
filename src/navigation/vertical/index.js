import { Mail, Home, Airplay, Circle, Users, BookOpen ,ShoppingCart} from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "userManage",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    navLink: "/userManagement",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "eCommerce",
    title: "مدیریت دوره ها",
    icon: <BookOpen size={20} />,
    children: [
      {
        id: "shop",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/courses",
      },
      // {
      //   id: "detail",
      //   title: "Details",
      //   icon: <Circle size={12} />,
      //   navLink: "/apps/ecommerce/product-detail",
      // },
      {
        id: "wishList",
        title: "Wish List",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/wishlist",
      },
      {
        id: "checkout",
        title: "ساخت دوره",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/createCourse",
      },
    ],
  },
];
