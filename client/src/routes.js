import Dashboard from "./views/Dashboard.jsx";
import UserProfile from "./views/UserProfile.jsx";
import TableList from "./views/TableList.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Upload Music",
    icon: "pe-7s-musiclist",
    component: TableList,
    layout: "/admin"
  }
 
  
];

export default dashboardRoutes;
