// src/pages/RefundPolicy.jsx
import React from "react";
import {
  FaMoneyBillWave,
  FaClock,
  FaUserCheck,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const RefundPolicy = () => {
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
            <FaMoneyBillWave className="text-accent text-xl" />
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              Refund Policy
            </h1>
          </div>
          <p className="text-base-content/70 text-lg">
            Our commitment to fair and transparent refund procedures
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Overview
            </h2>
            <p className="text-base-content/70 mb-4">
              At CityFix, we strive to provide excellent service and ensure
              customer satisfaction. This refund policy outlines the
              circumstances under which refunds may be granted.
            </p>
            <p className="text-base-content/70">
              Please read this policy carefully before making any payments for
              our services.
            </p>
          </motion.div>

          {/* Refund Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Refund Eligibility
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <FaUserCheck className="text-primary text-xl mt-1" />
                <div>
                  <h3 className="font-bold text-base-content mb-2">
                    Eligible Cases
                  </h3>
                  <ul className="text-base-content/70 text-sm space-y-1">
                    <li>• Service not delivered as described</li>
                    <li>• Technical issues preventing service use</li>
                    <li>• Duplicate or accidental payments</li>
                    <li>• Service unavailable for 48+ hours</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-error/5 border border-error/10">
                <FaShieldAlt className="text-error text-xl mt-1" />
                <div>
                  <h3 className="font-bold text-base-content mb-2">
                    Non-Eligible Cases
                  </h3>
                  <ul className="text-base-content/70 text-sm space-y-1">
                    <li>• Change of mind after service use</li>
                    <li>• Service used for intended purpose</li>
                    <li>• Issues reported after 30 days</li>
                    <li>• Third-party service issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Refund Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Refund Process
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-content flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-base-content mb-2">
                    Submit Request
                  </h3>
                  <p className="text-base-content/70">
                    Contact our support team within 30 days of payment with your
                    transaction details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-content flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-base-content mb-2">
                    Review Period
                  </h3>
                  <p className="text-base-content/70">
                    Our team will review your request within 3-5 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-content flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-base-content mb-2">
                    Processing
                  </h3>
                  <p className="text-base-content/70">
                    Approved refunds are processed within 7-10 business days to
                    your original payment method.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeframes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaClock className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                Refund Timeframes
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-base-200">
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Service Type
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Refund Window
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Processing Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  <tr>
                    <td className="py-3 px-4 text-base-content">
                      Monthly Subscription
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      7 days from charge
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      3-5 business days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-base-content">Annual Plan</td>
                    <td className="py-3 px-4 text-base-content/70">
                      30 days from purchase
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      5-7 business days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-base-content">
                      One-time Service
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      14 days from service
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      7-10 business days
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-accent/10 to-accent-focus/10 rounded-2xl p-6 md:p-8 border border-accent/20 text-center"
          >
            <h3 className="text-xl font-bold text-base-content mb-3">
              Need Help With a Refund?
            </h3>
            <p className="text-base-content/70 mb-6">
              Our support team is here to assist you with any refund inquiries.
            </p>
            <button className="btn btn-accent gap-2">Contact Support</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
