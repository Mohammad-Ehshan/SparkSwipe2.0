import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthHero from '@/components/auth/AuthHero';
import RegisterForm from '@/components/auth/RegisterFrom';
import LoginForm from '@/components/auth/LoginForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)]">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <AuthHero />
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                
                {/* Logo/Brand */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Spark<span className="text-emerald-600">Swipe</span>
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isLogin ? "Welcome back! Ready to discover amazing startup ideas?" : "Join the community of innovators and entrepreneurs"}
                  </p>
                </motion.div>

                {/* Form Container */}
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LoginForm onToggleMode={toggleMode} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="register"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RegisterForm onToggleMode={toggleMode} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;