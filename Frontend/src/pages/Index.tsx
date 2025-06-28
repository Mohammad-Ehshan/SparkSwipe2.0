import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Heart,
  Share,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  PlusCircle,
  Linkedin,
  Twitter,
  Github,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Swipe Ideas",
      description:
        "Discover startup concepts with intuitive Tinder-style swiping",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Save & Engage",
      description: "Like, save, and comment on ideas that inspire you",
    },
    {
      icon: <Share className="w-8 h-8" />,
      title: "Share Your Vision",
      description: "Post your own startup ideas and get community feedback",
    },
  ];

  const testimonials = [
    {
      quote:
        "SparkSwipe helped me discover my co-founder and launch our AI startup!",
      name: "Sarah Chen",
      role: "Founder, TechFlow AI",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "The perfect platform to validate ideas before building. Love the community!",
      name: "Marcus Johnson",
      role: "Product Manager, InnovateLab",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Found incredible inspiration and mentorship through SparkSwipe's network.",
      name: "Alex Rivera",
      role: "Entrepreneur",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Revolutionary platform that connected me with investors for my healthtech startup.",
      name: "Emily Watson",
      role: "CEO, MedTech Solutions",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote: "The swipe mechanism makes discovering ideas fun and addictive!",
      name: "David Kim",
      role: "Serial Entrepreneur",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 pt-20 md:pt-32 pb-16 md:pb-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-24 h-24 bg-green-300 rounded-full opacity-30"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-100 rounded-full opacity-25"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Logo Placeholder */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                {/* <span className="text-white font-bold text-2xl">S</span> */}
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Your Next
              <motion.span
                className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Big Idea
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xl md:text-xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
                Swipe through innovative startup concepts, connect with
                entrepreneurs, and turn inspiration into action. Your next
                breakthrough is just a swipe away.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/explore">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  <span>Start Swiping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/post">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  Share Your Idea
                </motion.button>
              </Link>
            </motion.div>

            {/* Image/Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-full h-80 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mb-4">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/vn3rOSi5rVg?si=leiOofd43bC4jep7"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                  <p className="text-gray-600">
                    Interactive demo of the swipe experience
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SparkSwipe Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple, intuitive platform designed for the modern entrepreneur
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
              >
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                number: "10K+",
                label: "Active Users",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                number: "2.5M+",
                label: "Ideas Shared",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                number: "150+",
                label: "Startups Launched",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                number: "50+",
                label: "Countries",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4 text-green-200">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-green-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Auto-Scroll */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who found their next big
              opportunity
            </p>
          </motion.div>

          {/* Auto-scrolling testimonials */}
          <div className="relative">
            <motion.div
              className="flex space-x-6"
              animate={{
                x: [0, -100 * testimonials.length],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="mb-6">
                    <div className="text-yellow-400 mb-4">{"★".repeat(5)}</div>
                    <p className="text-gray-600 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Next Big Idea?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join SparkSwipe today and connect with a community of innovators,
              dreamers, and doers who are shaping tomorrow.
            </p>
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-700 hover:text-green-800 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-2xl font-bold">SparkSwipe</span>
              </div>
              <p className="text-gray-300 max-w-md mb-6">
                Discover, explore, and share innovative startup concepts.
                Connect with entrepreneurs and turn inspiration into action.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/mohammad-ehshan-4362a0298"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Linkedin className="text-green-300"/>
                </motion.a>
                <motion.a
                  href="https://twitter.com/ashmes16"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Twitter className="text-green-300"/>
                </motion.a>
                <motion.a
                  href="https://github.com/Mohammad-Ehshan"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Github className="text-green-300"/>
                </motion.a>
                <motion.a
                  href="mailto:ashmes16@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Contact className="text-green-300"/>
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/explore"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Explore Ideas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/post"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Post Idea
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Saved Ideas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:ashmes16@gmail.com"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Mohammad-Ehshan/SparkSwipe"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 SparkSwipe. All rights reserved. Built with ❤️ for
              entrepreneurs by <span className="font-bold">MOHAMMAD EHSHAN.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
