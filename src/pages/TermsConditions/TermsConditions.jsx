// src/pages/TermsConditions.jsx
import React from "react";
import {
  FaFileContract,
  FaUserTie,
  FaBalanceScale,
  FaGavel,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-30 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <FaFileContract className="text-accent text-xl" />
            <h1 className="text-4xl md:text-4xl font-bold text-base-content font-nunito">
              Terms & Conditions
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
          {/* Agreement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Agreement to Terms
            </h2>
            <p className="text-base-content/70 mb-4">
              By accessing and using CityFix, you accept and agree to be bound
              by these Terms and Conditions. If you disagree with any part of
              these terms, you may not access our platform.
            </p>
            <div className="p-4 rounded-xl bg-warning/5 border border-warning/10">
              <div className="flex items-center gap-2 mb-2">
                <FaExclamationTriangle className="text-warning" />
                <span className="font-bold text-base-content">
                  Important Notice
                </span>
              </div>
              <p className="text-sm text-base-content/70">
                These terms constitute a legally binding agreement between you
                and CityFix.
              </p>
            </div>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaUserTie className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                User Responsibilities
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-base-200">
                <h3 className="font-bold text-base-content mb-2">
                  Account Security
                </h3>
                <p className="text-base-content/70 text-sm">
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities that occur
                  under your account.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-base-200">
                <h3 className="font-bold text-base-content mb-2">
                  Content Guidelines
                </h3>
                <ul className="text-base-content/70 text-sm space-y-1">
                  <li>• Submit accurate and truthful information</li>
                  <li>• Do not submit false or misleading reports</li>
                  <li>• Respect other users' privacy and rights</li>
                  <li>• Do not upload harmful or illegal content</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-base-200">
                <h3 className="font-bold text-base-content mb-2">
                  Prohibited Activities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <span className="text-base-content/70">
                    • Spamming or flooding
                  </span>
                  <span className="text-base-content/70">
                    • Impersonating others
                  </span>
                  <span className="text-base-content/70">
                    • Reverse engineering
                  </span>
                  <span className="text-base-content/70">• Data scraping</span>
                  <span className="text-base-content/70">
                    • Circumventing security
                  </span>
                  <span className="text-base-content/70">• Violating laws</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Intellectual Property
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <h3 className="font-bold text-base-content mb-2">Our Rights</h3>
                <p className="text-base-content/70 text-sm">
                  CityFix and its original content, features, and functionality
                  are owned by CityFix Inc. and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property laws.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                <h3 className="font-bold text-base-content mb-2">
                  Your Content
                </h3>
                <p className="text-base-content/70 text-sm">
                  By submitting content to CityFix, you grant us a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, and
                  display such content for the purpose of providing our
                  services.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Service Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaBalanceScale className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                Service Terms
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-base-200">
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Service
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Availability
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-base-content">
                      Limitations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Issue Reporting
                    </td>
                    <td className="py-3 px-4 text-base-content/70">24/7</td>
                    <td className="py-3 px-4 text-base-content/70">
                      Verified users only
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Basic Dashboard
                    </td>
                    <td className="py-3 px-4 text-base-content/70">Always</td>
                    <td className="py-3 px-4 text-base-content/70">
                      Public data only
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      Premium Features
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Subscription basis
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Based on plan
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-base-content">
                      API Access
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Enterprise plans
                    </td>
                    <td className="py-3 px-4 text-base-content/70">
                      Rate limited
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Liability & Disclaimers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaGavel className="text-accent text-2xl" />
              <h2 className="text-2xl font-bold text-base-content">
                Limitation of Liability
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-error/5 border border-error/10">
                <h3 className="font-bold text-base-content mb-2">Disclaimer</h3>
                <p className="text-base-content/70 text-sm">
                  CityFix is provided "as is" without warranties of any kind. We
                  do not guarantee uninterrupted or error-free service. We are
                  not responsible for the accuracy of user-submitted content.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-warning/5 border border-warning/10">
                <h3 className="font-bold text-base-content mb-2">Limitation</h3>
                <p className="text-base-content/70 text-sm">
                  To the maximum extent permitted by law, CityFix shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages resulting from your use of our services.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-info/5 border border-info/10">
                <h3 className="font-bold text-base-content mb-2">
                  Indemnification
                </h3>
                <p className="text-base-content/70 text-sm">
                  You agree to defend, indemnify, and hold harmless CityFix from
                  any claims, damages, obligations, losses, or expenses arising
                  from your use of the platform or violation of these terms.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 border border-base-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Governing Law
            </h2>
            <div className="space-y-3">
              <p className="text-base-content/70">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Delaware, United States, without
                regard to its conflict of law provisions.
              </p>
              <p className="text-base-content/70">
                Any disputes arising under these terms shall be resolved in the
                state or federal courts located in Delaware.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-base-200">
                <p className="text-sm text-base-content/70">
                  For any questions about these Terms, please contact us at{" "}
                  <span className="text-accent font-medium">
                    legal@cityfix.com
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-accent/10 to-accent-focus/10 rounded-2xl p-6 md:p-8 border border-accent/20 text-center"
          >
            <h3 className="text-xl font-bold text-base-content mb-3">
              Changes to Terms
            </h3>
            <p className="text-base-content/70 mb-4">
              We may update these Terms & Conditions from time to time. We will
              notify users of any material changes via email or platform
              notification.
            </p>
            <p className="text-base-content/60 text-sm">
              Your continued use of CityFix after changes constitutes acceptance
              of the new terms.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
