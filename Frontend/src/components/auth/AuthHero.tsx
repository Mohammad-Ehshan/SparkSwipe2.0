
import { motion } from 'framer-motion';

const AuthHero = () => {
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        ease: "easeInOut" as const,
        repeat: Infinity
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <div className="relative h-full flex flex-col justify-center items-center lg:items-start">
      
      {/* Main Illustration Area */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-lg mx-auto lg:mx-0"
      >
        
        {/* Background Gradient Circle */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        
        {/* Central Hero Image */}
        <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
            alt="Team brainstorming startup ideas"
            className="w-full h-64 object-cover rounded-2xl"
          />
          
          {/* Floating Cards */}
          <div className="absolute -top-4 -right-4">
            <motion.div
              variants={cardVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="bg-emerald-500 text-white p-3 rounded-lg shadow-lg transform rotate-12"
            >
              <div className="text-xs font-medium">💡 New Idea</div>
            </motion.div>
          </div>
          
          <div className="absolute -bottom-4 -left-4">
            <motion.div
              variants={cardVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              className="bg-blue-500 text-white p-3 rounded-lg shadow-lg transform -rotate-12"
            >
              <div className="text-xs font-medium">🚀 Launch</div>
            </motion.div>
          </div>
          
          <div className="absolute top-1/2 -right-8 hidden lg:block">
            <motion.div
              variants={cardVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="bg-purple-500 text-white p-2 rounded-lg shadow-lg transform rotate-6"
            >
              <div className="text-xs">⭐</div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { duration: 20, ease: "linear" as const, repeat: Infinity }
          }}
          className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            transition: { duration: 15, ease: "linear" as const, repeat: Infinity }
          }}
          className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-center lg:text-left max-w-lg"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Where Great
          <span className="text-emerald-600 block">Ideas Come to Life</span>
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Join thousands of innovators sharing, discovering, and developing the next big startup ideas. 
          Swipe through creativity and let inspiration spark your entrepreneurial journey.
        </p>
        
        {/* Feature Icons */}
        <div className="flex justify-center lg:justify-start space-x-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">💡</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Discover</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🤝</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Connect</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Launch</span>
          </motion.div>
        </div>
      </motion.div>
      
    </div>
  );
};

export default AuthHero;