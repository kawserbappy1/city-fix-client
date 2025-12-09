import {
  FaCheck,
  FaCrown,
  FaStar,
  FaGem,
  FaFire,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import {
  FaMobileScreen,
  FaHeadset,
  FaChartLine,
  FaBolt,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import phone from "../../../assets/phone.svg";

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Background Elements */}
      <div className="hidden md:block absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-4 sm:left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-accent blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-primary blur-xl sm:blur-2xl md:blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20">
            <FaGem className="text-accent text-sm sm:text-base" />
            <span className="text-accent font-semibold text-sm sm:text-base">
              Transparent Pricing
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Perfect Plan
            </span>
          </h2>

          <p className="text-base-content/70 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
            Flexible pricing for cities of all sizes. Start small, scale as you
            grow.
          </p>
        </motion.div>

        {/* Main Grid Container - FIXED */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {/* Contact Card */}
          <motion.div variants={itemVariants}>
            <div className="h-full relative bg-gradient-to-br from-base-100 to-base-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-base-300 shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden group hover:shadow-accent/20 hover:shadow-2xl transition-all duration-500">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Phone Icon */}
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={phone}
                    alt="Phone"
                    className="w-10 h-10 sm:w-12 sm:h-12 filter brightness-0 invert"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    !
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Need Help?
              </h2>

              <p className="text-base-content/70 text-center mb-6 sm:mb-8 text-sm sm:text-base">
                Confused about pricing? Our team is here to help you choose the
                perfect plan.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-all duration-300 group/item">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover/item:bg-accent/20 transition-colors duration-300 flex-shrink-0">
                    <MdOutlineMarkEmailRead className="text-accent text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-base-content/50">
                      Email Support
                    </p>
                    <p className="font-semibold text-base-content text-sm sm:text-base truncate">
                      info.cityfix@mail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-all duration-300 group/item">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                    <FaMobileScreen className="text-primary text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-base-content/50">
                      Call Us
                    </p>
                    <p className="font-semibold text-base-content text-sm sm:text-base">
                      +000-123456789
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base">
                Schedule a Demo
              </button>
            </div>
          </motion.div>

          {/* Starter Plan */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="hidden md:block absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                <div className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-base-300 text-base-content/70 text-xs font-semibold whitespace-nowrap">
                  Popular for Startups
                </div>
              </div>

              <div className="h-full bg-gradient-to-b from-base-100 to-base-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-base-300 shadow-lg sm:shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-500 group">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-base-300 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                    <FaRocket className="text-accent text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">
                    Starter
                  </h3>
                  <p className="text-base-content/70 text-xs sm:text-sm mb-4 sm:mb-6">
                    Perfect for small wards
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content">
                      Free
                    </span>
                    <span className="text-base-content/50 ml-1 sm:ml-2 text-sm sm:text-base">
                      /forever
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    "Report up to 50 issues",
                    "Priority normal response",
                    "Response within 3-4 days",
                    "Basic dashboard access",
                    "Email notifications",
                    "Community support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheck className="text-accent w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                      <span className="text-base-content/80 text-xs sm:text-sm md:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-base-300 text-base-content font-semibold rounded-lg sm:rounded-xl hover:bg-accent hover:text-white transition-all duration-300 group-hover:shadow-lg text-sm sm:text-base">
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>

          {/* Municipality Plan - Featured */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="hidden md:block absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-3 py-1.5 sm:px-6 sm:py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white font-bold shadow-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <FaCrown className="text-xs sm:text-sm" />
                  <span>MOST POPULAR</span>
                </div>
              </div>

              <div className="h-full bg-gradient-to-br from-accent to-primary rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-accent shadow-xl sm:shadow-2xl relative overflow-hidden group">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <FaShieldAlt className="text-white text-xl sm:text-2xl" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Municipality
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6">
                      Best for city administration
                    </p>

                    <div className="mb-4 sm:mb-6">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                        $49
                      </span>
                      <span className="text-white/80 ml-1 sm:ml-2 text-sm sm:text-base">
                        /month
                      </span>
                      <p className="text-white/70 text-xs sm:text-sm mt-1">
                        Billed annually
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {[
                      "Unlimited issue reports",
                      "Full dashboard with analytics",
                      "SMS & Email notifications",
                      "Role-based access control",
                      "Support desk portal",
                      "Priority customer support",
                      "API access",
                      "Custom reporting",
                    ].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FaCheck className="text-white w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                        <span className="text-white/90 text-xs sm:text-sm md:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-white text-accent font-bold rounded-lg sm:rounded-xl hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-lg text-sm sm:text-base">
                    Municipality Plan
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="hidden md:block absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                <div className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-gradient-to-r from-secondary/80 to-purple-600 text-white text-xs font-semibold whitespace-nowrap">
                  Ultimate Solution
                </div>
              </div>

              <div className="h-full bg-gradient-to-b from-base-100 to-base-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-base-300 shadow-lg sm:shadow-xl hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 group">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-secondary/10 to-purple-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-secondary/20 group-hover:to-purple-500/20 transition-all duration-300">
                    <FaBolt className="text-secondary text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">
                    Enterprise
                  </h3>
                  <p className="text-base-content/70 text-xs sm:text-sm mb-4 sm:mb-6">
                    Full smart-city operation
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content">
                      $99
                    </span>
                    <span className="text-base-content/50 ml-1 sm:ml-2 text-sm sm:text-base">
                      /month
                    </span>
                    <p className="text-base-content/70 text-xs sm:text-sm mt-1">
                      Custom billing available
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    "All Municipality features",
                    "AI-powered analytics dashboard",
                    "24/7 priority support",
                    "Dedicated account manager",
                    "Instant support response",
                    "Custom integration",
                    "Advanced security features",
                    "White-label solution",
                    "Training & onboarding",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheck className="text-secondary w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                      <span className="text-base-content/80 text-xs sm:text-sm md:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-secondary to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base">
                  Contact Sales
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Comparison Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 lg:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-base-200/50 border border-base-300 max-w-lg mx-auto">
            <FaHeadset className="text-accent text-lg sm:text-xl flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-base-content text-sm sm:text-base">
                All plans include:
              </p>
              <p className="text-xs sm:text-sm text-base-content/70">
                99.9% Uptime SLA • Data Security • Regular Updates
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
