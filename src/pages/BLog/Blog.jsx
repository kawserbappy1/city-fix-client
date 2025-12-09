import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaCalendar,
  FaUser,
  FaTag,
  FaArrowRight,
  FaSearch,
  FaChevronRight,
  FaBookOpen,
  FaComment,
  FaShareAlt,
} from "react-icons/fa";
import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/blog3.jpg";
import blog4 from "../../assets/blog4.jpg";
import blog5 from "../../assets/blog5.jpg";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "How Smart Cities Are Transforming Urban Living",
      excerpt:
        "Discover how IoT technology and data analytics are creating smarter, more efficient cities around the world.",
      content:
        "Smart cities leverage technology to improve infrastructure, public utilities, and services. From intelligent traffic management to automated waste collection systems, learn how cities are becoming more responsive to citizen needs.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Smart Cities",
      readTime: "5 min read",
      image: blog1,
      tags: ["Technology", "Urban Planning", "IoT"],
      featured: true,
    },
    {
      id: 2,
      title: "Citizen Engagement in Municipal Problem Solving",
      excerpt:
        "Exploring how digital platforms empower citizens to actively participate in improving their communities.",
      content:
        "Modern municipalities are turning to digital solutions to engage citizens in reporting and resolving public issues. This blog explores successful case studies and best practices.",
      author: "Michael Chen",
      date: "March 10, 2024",
      category: "Community",
      readTime: "4 min read",
      image: blog2,
      tags: ["Citizen Engagement", "Digital Solutions", "Community"],
      featured: true,
    },
    {
      id: 3,
      title: "The Future of Public Infrastructure Maintenance",
      excerpt:
        "AI and predictive analytics are revolutionizing how cities maintain their public infrastructure.",
      content:
        "From predicting pothole formations to optimizing street light maintenance, AI is helping cities save millions while improving service quality.",
      author: "Robert Williams",
      date: "March 5, 2024",
      category: "Infrastructure",
      readTime: "6 min read",
      image: blog3,
      tags: ["AI", "Infrastructure", "Predictive Analytics"],
      featured: false,
    },
    {
      id: 4,
      title: "Sustainable Urban Development Strategies",
      excerpt:
        "How cities are balancing growth with environmental sustainability through innovative planning.",
      content:
        "Explore green initiatives, renewable energy integration, and sustainable transportation systems that are shaping the cities of tomorrow.",
      author: "Lisa Thompson",
      date: "February 28, 2024",
      category: "Sustainability",
      readTime: "7 min read",
      image: blog4,
      tags: ["Sustainability", "Green Cities", "Urban Development"],
      featured: false,
    },
    {
      id: 5,
      title: "Digital Transformation in Municipal Governance",
      excerpt:
        "How digital platforms are making local government more transparent and efficient.",
      content:
        "Case studies showing how digital transformation has improved service delivery, citizen satisfaction, and operational efficiency in municipalities.",
      author: "David Rodriguez",
      date: "February 20, 2024",
      category: "Governance",
      readTime: "5 min read",
      image: blog5,
      tags: ["Digital Governance", "Transparency", "Efficiency"],
      featured: false,
    },
  ];

  const categories = [
    "All Posts",
    "Smart Cities",
    "Community",
    "Infrastructure",
    "Sustainability",
    "Governance",
    "Technology",
  ];

  const recentPosts = blogPosts.slice(0, 3);
  const popularTags = [
    "Smart Cities",
    "Citizen Engagement",
    "AI",
    "Sustainability",
    "Urban Planning",
    "IoT",
    "Digital Governance",
    "Community",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <FaBookOpen className="text-accent" />
              <span className="text-accent font-semibold">CityFix Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Insights &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Innovations
              </span>
            </h1>
            <p className="text-lg text-base-content/70 mb-8">
              Explore the latest trends, case studies, and insights in urban
              development, smart cities, and community engagement.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Blog Content */}
          <div className="lg:col-span-8">
            {/* Featured Posts */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
                <span className="w-3 h-8 bg-accent rounded-full"></span>
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts
                  .filter((post) => post.featured)
                  .map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group"
                    >
                      <div className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                              Featured
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="flex items-center gap-1 text-sm text-base-content/60">
                              <FaCalendar />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-base-content/60">
                              <FaUser />
                              {post.author}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-base-content/70 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-base-200 text-base-content/80 rounded-full text-sm">
                              {post.category}
                            </span>
                            <Link
                              to={`/blog/${post.id}`}
                              className="flex items-center gap-2 text-accent hover:text-primary transition-colors duration-300"
                            >
                              Read More
                              <FaArrowRight className="text-sm" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
              </div>
            </div>

            {/* All Posts */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
                <span className="w-3 h-8 bg-primary rounded-full"></span>
                Latest Articles
              </h2>
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="flex items-center gap-1 text-sm text-base-content/60">
                            <FaCalendar />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-base-content/60">
                            <FaUser />
                            {post.author}
                          </span>
                          <span className="text-sm text-base-content/60">
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-base-content/70 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-base-200 text-base-content/80 rounded-full text-sm flex items-center gap-1"
                              >
                                <FaTag className="text-xs" />
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={`/blog/${post.id}`}
                            className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 font-medium"
                          >
                            Continue Reading
                            <FaChevronRight className="text-sm" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-accent" />
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-base-200 transition-colors duration-300 flex items-center justify-between group">
                        <span>{category}</span>
                        <FaChevronRight className="text-base-content/40 group-hover:text-accent transition-colors duration-300" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaCalendar className="text-primary" />
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors duration-300 group"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium group-hover:text-accent transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-base-content/60">
                          {post.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaTag className="text-secondary" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 bg-base-200 hover:bg-accent hover:text-white text-base-content/80 rounded-lg transition-all duration-300 text-sm"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-base-content/70 mb-4">
                  Subscribe to our newsletter for the latest insights and
                  updates.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-accent to-primary rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Contribute?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Share your insights and experiences with urban development and
              community engagement.
            </p>
            <button className="px-8 py-3 bg-white text-accent font-bold rounded-xl hover:bg-white/90 transition-all duration-300">
              Write for Our Blog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
