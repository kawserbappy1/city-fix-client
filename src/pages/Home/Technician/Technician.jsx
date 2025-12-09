import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaTools,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaCertificate,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";
import { MdEngineering, MdElectricBolt, MdVerified } from "react-icons/md";

const Technician = () => {
  const technicians = [
    {
      id: 1,
      name: "Michael Chen",
      role: "Senior Infrastructure Engineer",
      experience: "12 years",
      rating: 4.9,
      completedJobs: 1248,
      specialties: ["Street Lights", "Traffic Signals", "Power Grid"],
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Top Performer",
      color: "from-accent/20 to-primary/20",
      iconColor: "text-accent",
      available: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Municipal Systems Expert",
      experience: "8 years",
      rating: 4.8,
      completedJobs: 892,
      specialties: ["Water Systems", "Drainage", "Public Works"],
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Certified Expert",
      color: "from-primary/20 to-secondary/20",
      iconColor: "text-primary",
      available: true,
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Emergency Response Lead",
      experience: "15 years",
      rating: 4.9,
      completedJobs: 1563,
      specialties: ["Emergency Repairs", "Critical Systems", "Safety"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "24/7 Available",
      color: "from-accent/20 to-secondary/20",
      iconColor: "text-secondary",
      available: false,
    },
    {
      id: 4,
      name: "Lisa Thompson",
      role: "Smart City Specialist",
      experience: "6 years",
      rating: 4.7,
      completedJobs: 567,
      specialties: ["IoT Systems", "Automation", "Smart Grid"],
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Tech Innovator",
      color: "from-primary/20 to-accent/20",
      iconColor: "text-accent",
      available: true,
    },
  ];

  const stats = [
    { icon: <FaTools />, value: "500+", label: "Skilled Technicians" },
    { icon: <FaCheckCircle />, value: "24/7", label: "Emergency Service" },
    { icon: <FaStar />, value: "4.8/5", label: "Avg. Rating" },
    { icon: <FaClock />, value: "<30min", label: "Avg. Response Time" },
  ];

  const services = [
    {
      icon: <MdEngineering />,
      title: "Street Light Repair",
      description: "Fast restoration of public lighting",
    },
    {
      icon: <MdElectricBolt />,
      title: "Power Outage Response",
      description: "Emergency electrical system repairs",
    },
    {
      icon: <FaRobot />,
      title: "Smart System Maintenance",
      description: "IoT and automation system support",
    },
    {
      icon: <FaChartLine />,
      title: "Infrastructure Audit",
      description: "Preventive maintenance checks",
    },
  ];

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
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Background Elements */}
      <div className="hidden md:block absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <MdEngineering className="text-accent text-xl" />
            <span className="text-accent font-semibold">Expert Team</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Expert
            </span>{" "}
            Technicians
          </h2>

          <p className="text-base-content/70 max-w-3xl mx-auto text-xl mb-10">
            Highly trained professionals dedicated to maintaining and improving
            your city's infrastructure with precision and care.
          </p>

          <div className="flex justify-center">
            <div className="w-32 h-1.5 bg-gradient-to-r from-accent via-primary to-secondary rounded-full"></div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <div className="text-2xl text-accent">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-base-content mb-2">
                {stat.value}
              </div>
              <p className="text-base-content/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {technicians.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-gradient-to-b from-base-100 to-base-200 rounded-2xl border border-base-300 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500">
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs font-bold shadow-lg">
                    {tech.badge}
                  </div>
                </div>

                {/* Availability Indicator */}
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      tech.available
                        ? "bg-green-500/20 text-green-600"
                        : "bg-orange-500/20 text-orange-600"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        tech.available ? "bg-green-500" : "bg-orange-500"
                      } animate-pulse`}
                    ></div>
                    {tech.available ? "Available Now" : "On Assignment"}
                  </div>
                </div>

                {/* Profile Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-30`}
                  ></div>
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-base-content mb-2">
                    {tech.name}
                  </h3>
                  <p className={`${tech.iconColor} font-medium mb-4`}>
                    {tech.role}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(tech.rating)
                              ? "text-yellow-500"
                              : "text-base-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base-content/60 text-sm">
                      {tech.rating} ({tech.completedJobs} jobs)
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCertificate className={`${tech.iconColor}`} />
                      <span className="text-sm text-base-content">
                        {tech.experience} experience
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <p className="text-sm text-base-content/60 mb-2">
                      Specialties:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tech.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-base-300 text-xs text-base-content/80 hover:bg-accent/10 transition-colors duration-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 bg-gradient-to-r from-accent to-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300">
                      View Profile
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                      <FaPhoneAlt />
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-base-content mb-4">
              Our Services
            </h3>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Comprehensive municipal maintenance and repair services for modern
              cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-primary/20 transition-all duration-300">
                  <div className="text-2xl text-accent">{service.icon}</div>
                </div>
                <h4 className="text-lg font-bold text-base-content mb-2">
                  {service.title}
                </h4>
                <p className="text-base-content/60 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-secondary/10"></div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary/20 to-transparent rounded-full translate-x-1/2 translate-y-1/2"></div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-6">
                <MdVerified className="text-accent text-3xl" />
                <h3 className="text-2xl md:text-3xl font-bold text-base-content">
                  Need Professional Help?
                </h3>
              </div>

              <p className="text-base-content/70 text-lg mb-8">
                Our certified technicians are ready to resolve your municipal
                infrastructure issues 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  <FaPhoneAlt className="inline mr-2" />
                  Call Emergency Line
                </motion.button>

                <button className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent/10 transition-all duration-300">
                  Schedule Maintenance
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-base-content/60">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-accent" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaThumbsUp className="text-primary" />
                  <span>Guaranteed Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCertificate className="text-secondary" />
                  <span>Certified Professionals</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technician;
