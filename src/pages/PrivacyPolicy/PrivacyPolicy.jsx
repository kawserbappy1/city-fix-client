// src/pages/PrivacyPolicy.jsx
import React from "react";
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaCookie,
  FaEye,
} from "react-icons/fa";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <FaShieldAlt className="text-accent text-xl" />
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              Privacy Policy
            </h1>
          </div>
          <p className="text-base-content/70 text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Introduction
            </h2>
            <p className="text-base-content/70 mb-4">
              At CityFix, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our platform.
            </p>
            <p className="text-base-content/70">
              By accessing or using CityFix, you agree to the collection and use
              of information in accordance with this policy.
            </p>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaDatabase className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                Information We Collect
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <h3 className="font-bold text-base-content mb-2">
                  Personal Information
                </h3>
                <ul className="text-base-content/70 text-sm space-y-1">
                  <li>• Name and contact information</li>
                  <li>• Email address and phone number</li>
                  <li>• Location data for issue reporting</li>
                  <li>• Profile information and preferences</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                <h3 className="font-bold text-base-content mb-2">Usage Data</h3>
                <ul className="text-base-content/70 text-sm space-y-1">
                  <li>• Device information and IP address</li>
                  <li>• Browser type and version</li>
                  <li>• Pages visited and time spent</li>
                  <li>• Error logs and performance data</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                <h3 className="font-bold text-base-content mb-2">
                  Cookies & Tracking
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <FaCookie className="text-accent" />
                  <span className="text-sm text-base-content/70">
                    We use cookies to enhance your experience
                  </span>
                </div>
                <p className="text-xs text-base-content/60">
                  You can control cookie settings through your browser
                  preferences.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How We Use Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-6">
              How We Use Your Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="font-medium text-base-content">
                    Service Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="font-medium text-base-content">
                    Customer Support
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="font-medium text-base-content">
                    Platform Improvements
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="font-medium text-base-content">
                    Communications
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="font-medium text-base-content">
                    Security & Fraud Prevention
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="font-medium text-base-content">
                    Legal Compliance
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaUserLock className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                Data Security
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-success/5 border border-success/10">
                <h3 className="font-bold text-base-content mb-2">Encryption</h3>
                <p className="text-base-content/70 text-sm">
                  All data transmitted between your device and our servers is
                  encrypted using industry-standard TLS 1.2+ protocols.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-warning/5 border border-warning/10">
                <h3 className="font-bold text-base-content mb-2">
                  Access Control
                </h3>
                <p className="text-base-content/70 text-sm">
                  Strict access controls and authentication measures ensure only
                  authorized personnel can access sensitive data.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-info/5 border border-info/10">
                <h3 className="font-bold text-base-content mb-2">
                  Regular Audits
                </h3>
                <p className="text-base-content/70 text-sm">
                  We conduct regular security audits and vulnerability
                  assessments to maintain the highest security standards.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaEye className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                Your Privacy Rights
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-base-200">
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Right
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Access
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Request access to your personal data
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Correction
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Request correction of inaccurate data
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Deletion
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Request deletion of your data
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Objection
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Object to data processing
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Portability
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Request data transfer
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-sm text-base-content/70">
                To exercise any of these rights, please contact our Data
                Protection Officer at{" "}
                <span className="text-accent font-medium">
                  privacy@cityfix.com
                </span>
              </p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-accent/10 to-accent-focus/10 rounded-2xl p-6 md:p-8 border border-accent/20 text-center"
          >
            <h3 className="text-xl font-bold text-base-content mb-3">
              Questions About Privacy?
            </h3>
            <p className="text-base-content/70 mb-6">
              Contact our privacy team for any questions or concerns about our
              Privacy Policy.
            </p>
            <button className="btn btn-accent gap-2">
              Contact Privacy Team
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
