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
import TrackIssue from "../pages/Dashboard/UserDashboard/TrackIssue/TrackIssue";
import AdminRoute from "./AdminRoute";
import BoostIssue from "../pages/Dashboard/UserDashboard/BoostIssue/BoostIssue";
import PaymentSuccess from "../pages/Dashboard/UserDashboard/Payment/PaymentSuccess";
import PaymentCencel from "../pages/Dashboard/UserDashboard/Payment/PaymentCencel";
import Managepayment from "../pages/Dashboard/Admin/Managepayment/Managepayment";

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
        element: <Blog></Blog>,
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
    path: "payment-success",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "payment-cancelled",
    element: <PaymentCencel></PaymentCencel>,
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
        element: (
          <PrivateRoute>
            <Overview></Overview>
          </PrivateRoute>
        ),
      },

      {
        path: "all-issues",
        element: (
          <AdminRoute>
            <AllIssues></AllIssues>
          </AdminRoute>
        ),
      },
      {
        path: "my-issues",
        element: (
          <PrivateRoute>
            <MyIssues></MyIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "create-issue",
        element: (
          <PrivateRoute>
            <CreateIssue></CreateIssue>
          </PrivateRoute>
        ),
        loader: () => fetch("/area.json").then((res) => res.json()),
      },
      {
        path: "view-edit",
        element: (
          <PrivateRoute>
            <EditProfile></EditProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-staff",
        element: (
          <AdminRoute>
            <AllStaff></AllStaff>
          </AdminRoute>
        ),
      },
      {
        path: "edit-issue/:id",
        element: (
          <PrivateRoute>
            <EditIssue></EditIssue>
          </PrivateRoute>
        ),
        loader: () => fetch("/area.json").then((res) => res.json()),
      },
      {
        path: "staff-profile",
        element: (
          <PrivateRoute>
            <StaffProfile></StaffProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "assign-issue",
        element: (
          <PrivateRoute>
            <AssignedIssue></AssignedIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "be-staff",
        element: (
          <PrivateRoute>
            <BeStaff></BeStaff>
          </PrivateRoute>
        ),
        loader: () => fetch(`/area.json`).then((res) => res.json()),
      },
      {
        path: "track-issue",
        element: (
          <PrivateRoute>
            <TrackIssue></TrackIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "boost-issue",
        element: (
          <PrivateRoute>
            <BoostIssue></BoostIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-payment",
        element: (
          <AdminRoute>
            <Managepayment></Managepayment>
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
