import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Richard Brown",
    role: "Project Manager",
    email: "richardbrown@gmail.com",
    avatar: "",
    initials: "RB",
    verified: true,
    rating: 4,
    date: "14.01.2025",
    location: "Arizona",
    text: "CityFix has transformed how our municipality handles public issues. The reporting system is intuitive and the response time is exceptional!",
    highlight: true,
    color: "from-accent to-accent/80",
    bgColor: "bg-gradient-to-br from-accent to-accent/80",
  },
  {
    id: 2,
    name: "Helen R. Tibbetts",
    role: "City Administrator",
    email: "helen.tibbetts@gmail.com",
    avatar: "",
    initials: "HRT",
    verified: true,
    rating: 5,
    date: "15.07.2024",
    location: "Arizona",
    text: "I've been using CityFix for 6 months now. The platform has reduced our issue resolution time by 60%. Absolutely revolutionary for city management!",
    highlight: true,
    color: "from-primary to-primary/80",
    bgColor: "bg-gradient-to-br from-primary to-primary/80",
  },
  {
    id: 3,
    name: "Frances Staten",
    role: "Backend Developer",
    email: "frances.staten@gmail.com",
    avatar: "",
    initials: "FS",
    verified: true,
    rating: 4,
    date: "13.03.2025",
    location: "California",
    text: "The API integration was seamless with our existing systems. The dashboard analytics provide incredible insights for our smart city initiatives.",
    color: "from-accent/90 to-primary/90",
    bgColor: "bg-gradient-to-br from-accent/90 to-primary/90",
  },
  {
    id: 4,
    name: "Hazel Gorman",
    role: "Community Manager",
    email: "hazel.gorman@gmail.com",
    avatar: "",
    initials: "HG",
    verified: true,
    rating: 4,
    date: "24.02.2025",
    location: "Texas",
    text: "Citizen engagement has increased by 300% since implementing CityFix. The mobile app makes reporting issues incredibly easy for residents.",
    color: "from-secondary to-secondary/80",
    bgColor: "bg-gradient-to-br from-secondary to-secondary/80",
  },
  {
    id: 5,
    name: "Courtney Villanueva",
    role: "Urban Planner",
    email: "courtney.villanueva@gmail.com",
    avatar: "",
    initials: "CV",
    verified: true,
    rating: 5,
    date: "08.11.2024",
    location: "New York",
    text: "This platform has revolutionized our city's maintenance workflow. The automated assignment system saves us countless hours each week.",
    highlight: true,
    color: "from-accent to-primary",
    bgColor: "bg-gradient-to-br from-accent to-primary",
  },
  {
    id: 6,
    name: "Mary Somerville",
    role: "City Mayor",
    email: "mary.somerville@gmail.com",
    avatar: "",
    initials: "MS",
    verified: true,
    rating: 5,
    date: "05.02.2025",
    location: "Florida",
    text: "As mayor, I've seen firsthand how CityFix has improved citizen satisfaction. The transparency in issue tracking builds incredible trust in local government.",
    color: "from-primary to-secondary",
    bgColor: "bg-gradient-to-br from-primary to-secondary",
  },
  {
    id: 7,
    name: "Brett Duffy",
    role: "Public Works Director",
    email: "b.duffy@gmail.com",
    avatar: "",
    initials: "BD",
    verified: true,
    rating: 4,
    date: "06.09.2024",
    location: "Washington",
    text: "The reporting analytics have helped us optimize our resource allocation. We can now predict and prevent issues before they become major problems.",
    color: "from-accent/80 to-secondary/80",
    bgColor: "bg-gradient-to-br from-accent/80 to-secondary/80",
  },
  {
    id: 8,
    name: "John Esparza",
    role: "Technology Director",
    email: "john.esparza@gmail.com",
    avatar: "",
    initials: "JE",
    verified: true,
    rating: 5,
    date: "22.01.2025",
    location: "Colorado",
    text: "Integration was seamless with our existing systems. The real-time notifications keep everyone informed and accountable.",
    color: "from-secondary to-accent",
    bgColor: "bg-gradient-to-br from-secondary to-accent",
  },
];

const Testimonial = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter testimonials based on rating
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "5star") return testimonial.rating === 5;
    if (activeFilter === "4star") return testimonial.rating === 4;
    return true;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Background Elements */}
      <div className="hidden md:block absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-primary blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <FaQuoteLeft className="text-accent" />
            <span className="text-accent font-semibold">Community Voices</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              City Leaders
            </span>
          </h2>

          <p className="text-base-content/70 max-w-2xl mx-auto text-lg mb-8">
            See what city officials, administrators, and community leaders are
            saying about CityFix
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["all", "5star", "4star"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-accent to-primary text-white shadow-lg"
                    : "bg-base-300 text-base-content/70 hover:bg-base-200"
                }`}
              >
                {filter === "all" && "All Reviews"}
                {filter === "5star" && "⭐ 5 Star Reviews"}
                {filter === "4star" && "⭐ 4 Star Reviews"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${
                item.highlight ? "lg:col-span-2" : ""
              }`}
            >
              {/* Main Card */}
              <div
                className={`relative h-full ${item.bgColor} rounded-3xl p-4 shadow-2xl overflow-hidden`}
              >
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: "60px 60px",
                    }}
                  ></div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-20">
                  <FaQuoteRight className="text-white text-6xl" />
                </div>

                <div className="relative z-10">
                  {/* Profile Header */}
                  <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white text-xl border-2 border-white/30">
                        {item.initials}
                      </div>
                      {item.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <FaCheckCircle className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-md text-white/90 font-medium">
                        {item.role}
                      </p>
                      <p className="text-white/70 text-sm mt-1">{item.email}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-lg ${
                            i < item.rating
                              ? "text-yellow-300"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/80 font-semibold ml-2">
                      {item.rating}.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-white/90 text-lg leading-relaxed mb-8 italic">
                    "{item.text}"
                  </p>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/80">
                      <FaCalendarAlt />
                      <span className="text-sm">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <FaMapMarkerAlt />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              {/* Decorative Elements */}
              {item.highlight && (
                <div className="absolute -top-4 -right-1">
                  <div className="px-4 py-1 rounded-full bg-white text-accent font-bold text-sm shadow-lg animate-pulse">
                    ⭐ Featured Review
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Cities Using CityFix",
                value: "250+",
                color: "bg-accent/10 text-accent border border-accent/20",
                icon: "🏙️",
              },
              {
                label: "Issues Resolved",
                value: "10K+",
                color: "bg-primary/10 text-primary border border-primary/20",
                icon: "✅",
              },
              {
                label: "Avg. Satisfaction",
                value: "4.8/5",
                color:
                  "bg-secondary/10 text-secondary border border-secondary/20",
                icon: "⭐",
              },
              {
                label: "Response Time",
                value: "<24h",
                color: "bg-accent/10 text-accent border border-accent/20",
                icon: "⚡",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-2 md:p-6 rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${stat.color} mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-base-content/70 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block p-1 rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary">
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary rounded-2xl blur-sm opacity-50"></div>
            <div className="relative bg-base-100 rounded-xl p-8 md:p-12 z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to transform your city?
              </h3>
              <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
                Join hundreds of cities already using CityFix to improve citizen
                satisfaction and streamline operations.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
