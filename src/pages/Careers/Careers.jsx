// src/pages/Careers.jsx
import React from "react";
import {
  FaBriefcase,
  FaRocket,
  FaUsers,
  FaHeart,
  FaGraduationCap,
  FaLightbulb,
  FaHandshake,
  FaGlobeAmericas,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Careers = () => {
  const currentOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Dhaka",
      type: "Full-time",
      experience: "2-4 years",
      salary: "৳80,000 - ৳120,000",
      description:
        "Build beautiful, responsive interfaces for our city management platform using React, Tailwind CSS, and modern frontend technologies.",
      requirements: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "REST APIs",
        "Git",
      ],
      posted: "2 days ago",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "City Operations Manager",
      department: "Operations",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "3-5 years",
      salary: "৳70,000 - ৳100,000",
      description:
        "Coordinate with municipal governments to implement CityFix solutions and ensure smooth city operations.",
      requirements: [
        "Project Management",
        "Municipal Operations",
        "Stakeholder Management",
        "Data Analysis",
      ],
      posted: "1 week ago",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "1-3 years",
      salary: "৳60,000 - ৳90,000",
      description:
        "Design intuitive interfaces that make city management accessible for citizens and government officials alike.",
      requirements: [
        "Figma",
        "User Research",
        "Prototyping",
        "Design Systems",
        "Accessibility",
      ],
      posted: "3 days ago",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote / Dhaka",
      type: "Full-time",
      experience: "3-5 years",
      salary: "৳90,000 - ৳140,000",
      description:
        "Build scalable backend systems that power real-time issue tracking and city infrastructure management.",
      requirements: ["Node.js", "Python", "PostgreSQL", "AWS", "Microservices"],
      posted: "5 days ago",
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: 5,
      title: "Community Manager",
      department: "Marketing",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "1-2 years",
      salary: "৳40,000 - ৳60,000",
      description:
        "Engage with citizens and municipal partners to build a strong community around CityFix.",
      requirements: [
        "Social Media",
        "Content Creation",
        "Community Building",
        "Communication Skills",
      ],
      posted: "1 week ago",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "৳85,000 - ৳130,000",
      description:
        "Build and maintain our cloud infrastructure to ensure high availability and scalability.",
      requirements: [
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Terraform",
        "Monitoring",
      ],
      posted: "2 days ago",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const benefits = [
    {
      icon: <FaGraduationCap />,
      title: "Learning Budget",
      description: "৳20,000 annual budget for courses, books, and conferences",
    },
    {
      icon: <FaHeart />,
      title: "Health Insurance",
      description: "Comprehensive health insurance for you and your family",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Flexible Time Off",
      description: "Unlimited PTO with minimum 20 days required",
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Remote Work",
      description: "Work from anywhere in Bangladesh or our Dhaka office",
    },
    {
      icon: <FaHandshake />,
      title: "Stock Options",
      description: "Own a piece of the company with equity grants",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation Time",
      description: "10% time for passion projects and innovation",
    },
  ];

  const values = [
    {
      icon: <FaUsers />,
      title: "Community First",
      description:
        "We exist to serve communities and improve city life for everyone",
    },
    {
      icon: <FaRocket />,
      title: "Bias for Action",
      description: "We move fast, experiment often, and learn quickly",
    },
    {
      icon: <FaHeart />,
      title: "Empathy & Inclusion",
      description: "We build products that work for diverse communities",
    },
    {
      icon: <FaLightbulb />,
      title: "Transparency",
      description: "We believe in open communication and honest feedback",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <FaBriefcase className="text-accent" />
                <span className="text-accent font-semibold">Join Our Team</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-base-content font-nunito">
                Build the Future of{" "}
                <span className="text-accent">Smart Cities</span>
              </h1>

              <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
                Join a passionate team dedicated to transforming how cities
                work. We're building technology that makes urban living better
                for millions of people.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="#openings">
                  <button className="px-8 py-3 bg-accent text-accent-content font-bold rounded-xl hover:shadow-xl hover:opacity-90 transition-all duration-300">
                    View Open Positions
                  </button>
                </Link>
                <button className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent/10 transition-all duration-300">
                  Meet Our Team
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Team Members", icon: <FaUsers /> },
              {
                value: "250+",
                label: "Cities Served",
                icon: <FaGlobeAmericas />,
              },
              {
                value: "10K+",
                label: "Issues Resolved",
                icon: <FaCheckCircle />,
              },
              { value: "4.8★", label: "Team Happiness", icon: <FaHeart /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-base-100 border border-base-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <div className="text-accent text-xl">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-base-content mb-2">
                  {stat.value}
                </div>
                <div className="text-base-content/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content font-nunito font-bold">
              Our Culture & Values
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              We're building more than just software – we're building a culture
              of innovation, empathy, and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-base-100 border border-base-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
                  <div className="text-accent text-2xl">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-base-content">
                  {value.title}
                </h3>
                <p className="text-base-content/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
              Perks & Benefits
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              We take care of our team so they can focus on building amazing
              things.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-base-100 border border-base-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="text-primary text-xl">{benefit.icon}</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-base-content">
                    {benefit.title}
                  </h3>
                  <p className="text-base-content/70">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
              Open Positions
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Join us in building technology that makes cities work better for
              everyone.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["All", "Engineering", "Design", "Operations", "Marketing"].map(
              (tab) => (
                <button
                  key={tab}
                  className="px-4 py-2 rounded-full bg-base-300 text-base-content/70 hover:bg-base-200 transition-colors"
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {currentOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center`}
                        >
                          <FaBriefcase className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-base-content group-hover:text-accent transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 rounded-full bg-base-300 text-sm text-base-content">
                              {job.department}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-base-300 text-sm text-base-content">
                              {job.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-base-content/70 mb-4">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaBriefcase />
                          <span>{job.experience} experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt />
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-base-300 text-sm text-base-content"
                          >
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 3 && (
                          <span className="px-3 py-1 rounded-full bg-base-300 text-sm text-base-content">
                            +{job.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <div className="text-2xl font-bold text-accent mb-2">
                        {job.salary}
                      </div>
                      <p className="text-sm text-base-content/60 mb-4">
                        Monthly Salary
                      </p>
                      <Link to={`/careers/apply/${job.id}`}>
                        <button className="w-full lg:w-auto px-6 py-3 bg-accent text-accent-content font-bold rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-300">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
                Don't See the Perfect Role?
              </h2>

              <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
                We're always looking for talented people who are passionate
                about making cities better. Send us your resume and tell us how
                you'd like to contribute.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-accent text-accent-content font-bold rounded-xl hover:shadow-xl hover:opacity-90 transition-all duration-300">
                  Send General Application
                </button>
                <button className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent/10 transition-all duration-300">
                  Contact Our HR Team
                </button>
              </div>

              <p className="text-base-content/60 mt-8 text-sm">
                We review every application and will get back to you within 5
                business days.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 border-t border-base-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base-content/60 text-sm">
            CityFix is an equal opportunity employer. We celebrate diversity and
            are committed to creating an inclusive environment for all
            employees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
