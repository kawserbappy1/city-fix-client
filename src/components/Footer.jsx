import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";
import { SiPaypal, SiMastercard, SiVisa, SiCashapp } from "react-icons/si";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = () => {
  // Navigation Links
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/issues" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  const policyLinks = [
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Careers", path: "/careers" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", url: "#" },
    { icon: <FaTwitter />, label: "Twitter", url: "#" },
    { icon: <FaInstagram />, label: "Instagram", url: "#" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", url: "#" },
  ];

  const paymentMethods = [
    { icon: <SiPaypal />, label: "PayPal" },
    { icon: <SiMastercard />, label: "Mastercard" },
    { icon: <SiVisa />, label: "Visa" },
    { icon: <SiCashapp />, label: "Cash" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-base-100 via-base-200 to-base-100 text-base-content pt-12 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233abff8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent to-primary flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">CF</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  CityFix
                </h2>
                <p className="text-sm text-base-content/70">
                  Community Problem Solver
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-base-content/80 leading-relaxed">
              Empowering communities to report and resolve public issues
              efficiently. Together, we build cleaner, safer, and better cities
              for everyone.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-base-200 hover:bg-gradient-to-r hover:from-accent hover:to-primary flex items-center justify-center text-base-content/70 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  aria-label={social.label}
                  title={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Menu Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b border-base-300/50 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></span>
            </h3>
            <ul className="space-y-4">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-base-content/70 hover:text-base-content transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 mr-3 transition-opacity duration-300"></span>
                    {link.name}
                    <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:ml-3 transition-all duration-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policy Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b border-base-300/50 relative">
              Policies
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
            </h3>
            <ul className="space-y-4">
              {policyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-base-content/70 hover:text-base-content transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 mr-3 transition-opacity duration-300"></span>
                    {link.name}
                    <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:ml-3 transition-all duration-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b border-base-300/50 relative">
              Payment Methods
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-accent"></span>
            </h3>

            {/* Payment Icons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-base-200/50 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-base-200 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <div className="text-3xl mb-2 text-base-content/50 group-hover:text-accent transition-colors duration-300">
                    {method.icon}
                  </div>
                  <span className="text-sm text-base-content/70 group-hover:text-base-content">
                    {method.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-300/50 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-base-content/70 text-sm text-center md:text-left">
            <p>© {new Date().getFullYear()} CityFix. All rights reserved.</p>
          </div>

          {/* Footer Credit with Heart */}
          <div className="flex items-center space-x-2 text-base-content/70 text-sm">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="#"
              className="text-accent hover:text-primary transition-colors duration-300 font-semibold"
            >
              CityFix Team
            </a>
          </div>

          {/* Additional Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-base-content/70 hover:text-base-content text-sm transition-colors duration-300"
            >
              Sitemap
            </a>
            <a
              href="#"
              className="text-base-content/70 hover:text-base-content text-sm transition-colors duration-300"
            >
              Accessibility
            </a>
            <a
              href="#"
              className="text-base-content/70 hover:text-base-content text-sm transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton></ScrollToTopButton>
      </div>
    </footer>
  );
};

export default Footer;
