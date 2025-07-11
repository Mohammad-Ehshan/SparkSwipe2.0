import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useAuth();
    const navigate = useNavigate();

  const [isSubmitting, setisSubmitting] = useState(false)
  
    useEffect(() => {
      if (isAuthorized) {
        navigate('/');
      }
    }, [isAuthorized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    try {
      const { data } = await axios.post(
        'https://sparkswipebackend.onrender.com/api/v1/user/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      toast.success(data.message || 'Login successful!');
      // Save user/token if needed
      // localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/'); // Redirect to homepage or dashboard
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setisSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </motion.div>

        {/* Password Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Forgot Password */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <button
            type="button"
            className="text-sm text-emerald-600 hover:text-emerald-500"
          >
            Forgot your password?
          </button>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </motion.button>
        </motion.div>

        {/* Toggle to Register */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-emerald-600 hover:text-emerald-500 font-medium"
            >
              Register
            </button>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
