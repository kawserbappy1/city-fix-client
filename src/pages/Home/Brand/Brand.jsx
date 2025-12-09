import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { FaStar, FaTrophy, FaMedal, FaAward } from "react-icons/fa";

// Import your brand images
import b1 from "../../../assets/b1.png";
import b2 from "../../../assets/b2.png";
import b3 from "../../../assets/b3.png";
import b4 from "../../../assets/b4.png";
import b5 from "../../../assets/b5.png";
import b6 from "../../../assets/b6.png";
import b7 from "../../../assets/b7.png";
import b9 from "../../../assets/b9.png";
import b10 from "../../../assets/b10.png";
import b11 from "../../../assets/b11.png";
import b13 from "../../../assets/b13.png";
import b14 from "../../../assets/b14.png";
import b15 from "../../../assets/b15.png";
import b16 from "../../../assets/b16.png";

const Brand = () => {
  const brands = [
    { img: b1, name: "Brand 1" },
    { img: b2, name: "Brand 2" },
    { img: b3, name: "Brand 3" },
    { img: b4, name: "Brand 4" },
    { img: b5, name: "Brand 5" },
    { img: b6, name: "Brand 6" },
    { img: b7, name: "Brand 7" },
    { img: b9, name: "Brand 9" },
    { img: b10, name: "Brand 10" },
    { img: b11, name: "Brand 11" },
    { img: b13, name: "Brand 13" },
    { img: b14, name: "Brand 14" },
    { img: b15, name: "Brand 15" },
    { img: b16, name: "Brand 16" },
  ];

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--a)/0.2) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--p)/0.2) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-accent/20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-primary/20 blur-xl"></div>

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <FaTrophy className="text-accent text-2xl" />
            <FaMedal className="text-primary text-2xl" />
            <FaAward className="text-secondary text-2xl" />
          </div>

          <h2 className="text-4xl font-nunito md:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                Best in the Industry
              </span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 -rotate-1"></span>
            </span>
          </h2>

          <p className="text-base-content/70 max-w-2xl mx-auto text-lg mb-6">
            Join thousands of satisfied organizations who trust our platform for
            their community solutions
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <FaStar className="text-accent" />
              <span className="text-base-content/60">4.9/5 Average Rating</span>
            </div>
            <div className="hidden sm:block text-base-content/40">•</div>
            <div className="flex items-center gap-2">
              <FaStar className="text-primary" />
              <span className="text-base-content/60">
                99% Customer Satisfaction
              </span>
            </div>
            <div className="hidden sm:block text-base-content/40">•</div>
            <div className="flex items-center gap-2">
              <FaStar className="text-secondary" />
              <span className="text-base-content/60">500+ Active Cities</span>
            </div>
          </div>
        </motion.div>

        {/* Main Marquee Container */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/10 to-secondary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

          {/* Marquee Container with Glass Effect */}
          <div className="relative bg-base-100/30 backdrop-blur-xl border border-base-200/50 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-accent/20 via-primary/30 to-secondary/20 animate-gradient-x"></div>

            {/* First Marquee */}
            <Marquee
              gradient={false}
              speed={50}
              className="py-4"
              pauseOnHover={true}
            >
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  className="mx-6 group relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    {/* Card Container */}
                    <div className="w-32 h-24 md:w-40 md:h-28 flex items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-base-100 to-base-200 border border-base-300/50 shadow-lg group-hover:shadow-2xl group-hover:border-accent/30 transition-all duration-300 overflow-hidden">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                      {/* Image */}
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>

                    {/* Hover Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="px-3 py-1 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg">
                        Verified Partner
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Marquee>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-base-content/60">
                  Active Cities
                </div>
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-accent/20 to-primary/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-sm text-base-content/60">
                  Issues Resolved
                </div>
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-primary/20 to-secondary/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  99%
                </div>
                <div className="text-sm text-base-content/60">Satisfaction</div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 flex items-center gap-2"
            >
              <FaStar />
              Become a Partner
            </motion.button>
          </motion.div>
        </div>

        {/* Second Marquee (Reverse Direction) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-l from-accent/5 via-primary/5 to-secondary/5 rounded-2xl"></div>

            <Marquee
              gradient={false}
              speed={40}
              direction="right"
              className="py-4"
            >
              {brands.map((brand, index) => (
                <div key={`reverse-${index}`} className="mx-4">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-base-200/30 backdrop-blur-sm border border-base-300/30 hover:border-accent/30 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-base-100 to-base-200 p-2 group-hover:bg-gradient-to-br group-hover:from-accent/10 group-hover:to-primary/10 transition-all duration-300">
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-base-content/70 group-hover:text-base-content transition-colors duration-300">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-75"></div>
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse delay-150"></div>
            </div>
            <span className="text-xs md:text-sm text-base-content/70 group-hover:text-base-content transition-colors duration-300">
              All brands are verified and actively using our platform
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Brand;
