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
      {
        id: "checkout",
        title: "ساخت دوره",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/createCourse",
      },
      {
        id: "techList",
        title: " تکنولوژی دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/techManagement",
      },
      {
        id: "statusList",
        title: " وضعیت دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/statusManagement",
      },
      {
        id: "statusList",
        title: " سطح دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/levelManagement",
      },
      {
        id: "statusList",
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/useList",
      },
      {
        id: "classList",
        title: "لیست کلاس ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/classList",
      },
      {
        id: "TermList",
        title: "  تسک ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/TaskList",
      },
    ],
  },
];
