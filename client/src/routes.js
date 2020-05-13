import Dashboard from "./views/Dashboard.jsx";
import UserProfile from "./views/UserProfile.jsx";
import Upload from "./views/Upload.jsx";
import Library from "./views/Library.jsx";
import SongEdit from "./views/SongEdit.jsx";

//These are the routes for the Artist Dashboard

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
    path: "/upload",
    name: "Upload Music",
    icon: "pe-7s-cloud-upload",
    component: Upload,
    layout: "/admin"
  },
  {
    path: "/library",
    name: "Library",
    icon: "pe-7s-musiclist",
    component: Library,
    layout: "/admin"
  },
  {
    path: "/edit",
    name: "Edit Music Info",
    icon: "pe-7s-scissors",
    component: SongEdit,
    layout: "/admin"
  }


];

export default dashboardRoutes;
