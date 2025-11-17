import { Mail, Home, Airplay, Circle,Users, User } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    // navLink: "/user/list",
    children: [
      {
        id: "list",
        title: "لیست",
        icon: <Circle size={12} />,
        navLink: "/user/list",
      },
      // {
      //   id: "view",
      //   title: "View",
      //   icon: <Circle size={12} />,
      //   navLink: "/user/view",
      // },
    ],
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
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
