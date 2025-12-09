import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaRocket,
  FaStar,
  FaAward,
} from "react-icons/fa";
import { motion } from "framer-motion";
import thumb from "../../../assets/thumb.svg";
import expert from "../../../assets/expert.svg";
import cost from "../../../assets/cost.svg";

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      icon: <img src={thumb} alt="Reliable & Fast" className="w-12 h-12" />,
      title: "Reliable & Fast",
      description:
        "24/7 monitoring and rapid response system ensures issues are addressed within hours, not days. Our average response time is under 2 hours.",
      stats: "98% Uptime",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      id: 2,
      icon: (
        <img src={expert} alt="Expert Professionals" className="w-12 h-12" />
      ),
      title: "Expert Professionals",
      description:
        "Certified municipal experts and technologists with 10+ years experience in public infrastructure management and urban planning.",
      stats: "200+ Experts",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 3,
      icon: <img src={cost} alt="Transparent Pricing" className="w-12 h-12" />,
      title: "Transparent Pricing",
      description:
        "No hidden fees or surprise charges. Clear pricing models with flexible plans for cities of all sizes and budgets.",
      stats: "Zero Hidden Fees",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      id: 4,
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with GDPR compliance. Your data is protected with military-grade encryption and regular audits.",
      stats: "100% Secure",
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      id: 5,
      icon: <FaChartLine className="w-12 h-12" />,
      title: "Smart Analytics",
      description:
        "AI-powered analytics dashboard provides actionable insights to optimize resource allocation and prevent future issues.",
      stats: "Real-time Insights",
      iconBg: "bg-info/10",
      iconColor: "text-info",
    },
    {
      id: 6,
      icon: <FaUsers className="w-12 h-12" />,
      title: "Community Driven",
      description:
        "Built with citizen feedback. Our platform evolves based on real community needs and user experiences.",
      stats: "10K+ Active Users",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <FaStar className="text-accent" />
            <span className="text-accent font-semibold">Why Choose Us</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-base-content font-nunito">
            Why <span className="text-accent">CityFix</span> Stands Out
          </h2>

          <p className="text-base-content/70 max-w-2xl mx-auto text-lg mb-8 md:mb-10">
            From rapid response times to expert municipal partnerships, discover
            why hundreds of cities trust CityFix for their public infrastructure
            management.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { value: "250+", label: "Cities Served", icon: <FaUsers /> },
              { value: "24h", label: "Response Time", icon: <FaClock /> },
              { value: "99%", label: "Satisfaction", icon: <FaStar /> },
              {
                value: "10K+",
                label: "Issues Resolved",
                icon: <FaCheckCircle />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <div className="text-accent">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-base-content/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="h-full bg-base-100 rounded-xl md:rounded-2xl p-6 md:p-8 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 group">
                {/* Icon Container */}
                <div className="mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}
                  >
                    <div className={`text-2xl ${feature.iconColor}`}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {feature.stats}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-base-content mb-3 md:mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base-content/70 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {[
                    "24/7 Support Available",
                    "Real-time Updates",
                    "Mobile App Access",
                    "Detailed Analytics",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-base-content/60"
                    >
                      <FaCheckCircle className="text-success" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Arrow Button */}
                <div className="mt-6">
                  <button className="flex items-center gap-2 text-accent font-medium hover:text-accent-focus transition-colors duration-300">
                    Learn More
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10"></div>

          {/* Content */}
          <div className="relative z-10 p-6 md:p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <FaAward className="text-accent text-2xl md:text-3xl" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-base-content">
                    Ready to Transform Your City?
                  </h3>
                </div>
                <p className="text-base-content/70 mb-6 md:mb-0 max-w-2xl">
                  Join hundreds of municipalities already using CityFix to
                  improve citizen satisfaction, streamline operations, and build
                  smarter cities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <motion.button
                  className="px-6 md:px-8 py-3 bg-accent text-accent-content font-bold rounded-lg md:rounded-xl hover:shadow-lg hover:opacity-90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <button className="px-6 md:px-8 py-3 border-2 border-accent text-accent font-bold rounded-lg md:rounded-xl hover:bg-accent/10 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
