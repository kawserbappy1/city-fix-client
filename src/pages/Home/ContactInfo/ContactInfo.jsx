import React from "react";
import slidebg5 from "../../../assets/slide-bg5.jpg";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Our Office",
      details: ["123 Main Street, Suite 400", "San Francisco, CA 94105"],
      color: "bg-gradient-to-br from-accent to-primary",
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "bg-gradient-to-br from-primary to-accent",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email Address",
      details: ["info@cityfix.com", "support@cityfix.com"],
      color: "bg-gradient-to-br from-primary to-accent",
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Working Hours",
      details: ["Monday - Friday: 9am to 6pm", "Saturday: 10am to 4pm"],
      color: "bg-gradient-to-br from-primary to-accent",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      label: "Facebook",
      color: "hover:bg-accent",
      bgColor: "bg-accent/20",
      link: "#",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      color: "hover:bg-primary",
      bgColor: "bg-primary/20",
      link: "#",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      color: "hover:bg-secondary",
      bgColor: "bg-secondary/20",
      link: "#",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      color: "hover:bg-accent",
      bgColor: "bg-accent/20",
      link: "#",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${slidebg5})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 backdrop-blur-sm"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 font-nunito">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about CityFix? We're here to help and would love to
            hear from you.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent via-primary to-secondary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Information */}
          <div className="space-y-2">
            {/* Contact Cards */}
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`${item.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-300 mb-1">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media Links */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`${social.bgColor} ${social.color} w-12 h-12 flex items-center justify-center rounded-full text-white text-xl transition-all duration-300`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:mt-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-white mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-white mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="block text-white mb-2">Your Message</label>
                  <textarea
                    rows="5"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    Send Message
                    <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </form>

              {/* Form Footer */}
              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-gray-400 text-sm">
                  By submitting this form, you agree to our{" "}
                  <a
                    href="#"
                    className="text-accent hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-accent rounded-full opacity-30" />
        <div className="absolute bottom-1/4 right-20 w-6 h-6 bg-primary rounded-full opacity-20" />
        <div className="absolute top-1/3 right-10 w-5 h-5 bg-secondary rounded-full opacity-25" />
      </div>
    </div>
  );
};

export default ContactInfo;
