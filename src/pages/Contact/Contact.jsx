import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaGlobe,
} from "react-icons/fa";
import contactImage from "../../assets/slide-bg4.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Our Headquarters",
      details: [
        "123 Smart City Ave",
        "San Francisco, CA 94105",
        "United States",
      ],
      color: "from-accent to-primary",
      link: "https://maps.google.com",
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "from-primary to-secondary",
      link: "tel:+15551234567",
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email Address",
      details: ["info@cityfix.com", "support@cityfix.com"],
      color: "from-secondary to-accent",
      link: "mailto:info@cityfix.com",
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Mon-Fri: 9:00 AM - 6:00 PM",
        "Sat: 10:00 AM - 4:00 PM",
        "Sun: Closed",
      ],
      color: "from-accent to-secondary",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      color: "hover:bg-blue-600",
      link: "https://facebook.com/cityfix",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      color: "hover:bg-sky-500",
      link: "https://twitter.com/cityfix",
    },
    {
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
      color: "hover:bg-blue-700",
      link: "https://linkedin.com/company/cityfix",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      color: "hover:bg-pink-600",
      link: "https://instagram.com/cityfix",
    },
  ];

  const departments = [
    {
      name: "Technical Support",
      email: "support@cityfix.com",
      phone: "+1 (555) 123-4567",
      description: "For platform technical issues and troubleshooting",
    },
    {
      name: "Sales & Partnerships",
      email: "sales@cityfix.com",
      phone: "+1 (555) 234-5678",
      description: "For business inquiries and partnership opportunities",
    },
    {
      name: "Municipal Relations",
      email: "gov@cityfix.com",
      phone: "+1 (555) 345-6789",
      description: "For government agency collaborations",
    },
    {
      name: "Media & Press",
      email: "press@cityfix.com",
      phone: "+1 (555) 456-7890",
      description: "For media inquiries and press releases",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactImage}
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-secondary/10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <FaPaperPlane className="text-white" />
              <span className="font-semibold">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Have questions about CityFix? We're here to help and would love to
              hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-base-content mb-8">
                Contact Information
              </h2>

              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.link ? "_blank" : undefined}
                  rel={item.link ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -5 }}
                  className="block group"
                >
                  <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                      >
                        <div className="text-white">{item.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-base-content mb-2">
                          {item.title}
                        </h3>
                        {item.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-base-content/70 mb-1 group-hover:text-base-content transition-colors duration-300"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Social Media */}
              <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-lg">
                <h3 className="text-xl font-bold text-base-content mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-base-content/70 ${social.color} hover:text-white transition-all duration-300`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-lg">
                <h3 className="text-xl font-bold text-base-content mb-4">
                  Find Us
                </h3>
                <div className="rounded-xl overflow-hidden h-48 bg-base-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="w-12 h-12 text-accent mx-auto mb-2" />
                      <p className="text-base-content/70">
                        123 Smart City Ave, San Francisco
                      </p>
                      <button className="mt-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-primary transition-colors duration-300 text-sm">
                        Open in Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-base-100 rounded-3xl p-6 md:p-8 border border-base-300 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-base-content mb-2">
                Send Us a Message
              </h2>
              <p className="text-base-content/70 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl"
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label className="block text-base-content mb-2 font-medium">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-base-content/40" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block text-base-content mb-2 font-medium">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-base-content/40" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className="block text-base-content mb-2 font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-base-content/40" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="relative">
                    <label className="block text-base-content mb-2 font-medium">
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBuilding className="text-base-content/40" />
                      </div>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="relative">
                  <label className="block text-base-content mb-2 font-medium">
                    Subject *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="block text-base-content mb-2 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              {/* Form Footer */}
              <div className="mt-8 pt-8 border-t border-base-300 text-center">
                <p className="text-base-content/60 text-sm">
                  By submitting this form, you agree to our{" "}
                  <a
                    href="#"
                    className="text-accent hover:text-primary transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-base-content mb-6">
                Contact Specific Departments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h4 className="text-lg font-bold text-base-content mb-2">
                      {dept.name}
                    </h4>
                    <p className="text-base-content/70 text-sm mb-4">
                      {dept.description}
                    </p>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${dept.email}`}
                        className="flex items-center gap-2 text-accent hover:text-primary transition-colors duration-300"
                      >
                        <FaEnvelope className="text-sm" />
                        {dept.email}
                      </a>
                      <a
                        href={`tel:${dept.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300"
                      >
                        <FaPhone className="text-sm" />
                        {dept.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Find quick answers to common questions about CityFix
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How long does it take to get a response?",
                answer:
                  "We typically respond within 24 hours during business days. For urgent matters, please call our support line.",
              },
              {
                question: "Do you offer demos for government agencies?",
                answer:
                  "Yes! We offer personalized demos for municipal governments. Contact our sales team to schedule one.",
              },
              {
                question: "Can I integrate CityFix with existing systems?",
                answer:
                  "Absolutely. CityFix offers API integration with most municipal management systems.",
              },
              {
                question: "What cities are currently using CityFix?",
                answer:
                  "We serve over 250 cities across North America, Europe, and Asia. Contact us for specific case studies.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-base-content mb-3">
                  {faq.question}
                </h4>
                <p className="text-base-content/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-accent hover:text-primary font-bold transition-colors duration-300"
            >
              View All FAQs
              <FaPaperPlane className="text-sm" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
