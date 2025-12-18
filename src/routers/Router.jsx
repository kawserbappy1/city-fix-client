import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/BLog/Blog";
import Contact from "../pages/Contact/Contact";
import RefundPolicy from "./../pages/RefundPolicy/RefundPolicy";
import PrivacyPolicy from "./../pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./../pages/TermsConditions/TermsConditions";
import Careers from "./../pages/Careers/Careers";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import SignUpForm from "../pages/Auth/SignUpForm/SignUpForm";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/Dashboard/Overview/Overview";
import AllIssuesPage from "../pages/AllIssuesPage/AllIssuesPage";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import EditProfile from "../pages/Auth/Profile/EditProfile";
import BeStaff from "../pages/BeStaff/BeStaff";
import AllIssues from "../pages/Dashboard/Admin/AllIssues/AllIssues";
import AllStaff from "../pages/Dashboard/Admin/AllStaff/AllStaff";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import CreateIssue from "../pages/Dashboard/UserDashboard/CreateIssue/CreateIssue";
import MyIssues from "../pages/Dashboard/UserDashboard/MyIssues/MyIssues";
import StaffProfile from "../pages/Dashboard/StaffDashboard/StaffProfile/StaffProfile";
import EditIssue from "../pages/Dashboard/UserDashboard/EditIssue/EditIssue";
import AssignedIssue from "../pages/Dashboard/StaffDashboard/AssignedIssu/AssignedIssu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "all-issues",
        element: <AllIssuesPage></AllIssuesPage>,
      },
      {
        path: "blog",
        element: (
          <PrivateRoute>
            <Blog></Blog>,
          </PrivateRoute>
        ),
      },
      {
        path: "issue-details/:id",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "refund-policy",
        element: <RefundPolicy></RefundPolicy>,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "terms",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "careers",
        element: <Careers></Careers>,
      },
      {
        path: "be-staff",
        element: <BeStaff></BeStaff>,
        loader: () => fetch(`/area.json`).then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "sign-up",
        element: <SignUpForm></SignUpForm>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview></Overview>,
      },

      {
        path: "all-issues",
        element: <AllIssues></AllIssues>,
      },
      {
        path: "my-issues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "create-issue",
        element: <CreateIssue></CreateIssue>,
        loader: () => fetch("/area.json").then((res) => res.json()),
      },
      {
        path: "view-edit",
        element: <EditProfile></EditProfile>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-staff",
        element: <AllStaff></AllStaff>,
      },
      {
        path: "edit-issue/:id",
        element: <EditIssue></EditIssue>,
        loader: () => fetch("/area.json").then((res) => res.json()),
      },
      {
        path: "staff-profile",
        element: <StaffProfile></StaffProfile>,
      },
      {
        path: "assign-issue",
        element: <AssignedIssue></AssignedIssue>,
      },
    ],
  },
]);
export default router;
