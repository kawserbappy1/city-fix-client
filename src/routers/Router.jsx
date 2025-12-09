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
        path: "blog",
        element: <Blog></Blog>,
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
]);
export default router;
