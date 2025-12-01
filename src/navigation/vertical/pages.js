import { Circle, FileText, MessageSquare } from "react-feather";

export default [
  {
    id: "pages",
    title: "مدیریت صفحات",
    icon: <FileText size={20} />,
    children: [
      {
        id: "blog",
        title: "اخبار و مقالات",
        icon: <Circle size={12} />,
        children: [
          {
            id: "blogList",
            title: "لیست اخبار و مقالات",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/list",
          },
          {
            id: "blogDetail",
            title: "جزِیات اخبار و مقالات",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/detail",
          },
          {
            id: "addBlogs",
            title: "افزودن اخبار و مقالات",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/edit",
          },
        ],
      },
      {
        id: "comments",
        title: "کامنت ها",
        icon: <MessageSquare size={20} />,
        navLink: "/pages/comments",
      },
    ],
  },
];
