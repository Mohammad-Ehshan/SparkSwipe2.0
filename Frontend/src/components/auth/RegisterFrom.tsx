
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Github, Camera } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// interface RegisterFormProps {
//   onToggleMode: () => void;
// }

// const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Register attempt:', { ...formData, profileImage });
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         {/* Profile Image Upload */}
//         <motion.div variants={itemVariants} className="flex justify-center">
//           <div className="relative">
//             <Avatar className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-700">
//               <AvatarImage src={profileImage || undefined} />
//               <AvatarFallback className="bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400 text-2xl">
//                 {formData.name.charAt(0).toUpperCase() || '+'}
//               </AvatarFallback>
//             </Avatar>
//             <motion.label
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="absolute -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
//             >
//               <Camera size={16} />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </motion.label>
//           </div>
//         </motion.div>

//         {/* Name Field */}
//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
//             Full Name
//           </Label>
//           <Input
//             id="name"
//             type="text"
//             value={formData.name}
//             onChange={(e) => handleInputChange('name', e.target.value)}
//             placeholder="John Doe"
//             className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             required
//           />
//         </motion.div>

//         {/* Email Field */}
//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
//             Email Address
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => handleInputChange('email', e.target.value)}
//             placeholder="you@example.com"
//             className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             required
//           />
//         </motion.div>

//         {/* Password Field */}
//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
//             Password
//           </Label>
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={(e) => handleInputChange('password', e.target.value)}
//               placeholder="••••••••"
//               className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </motion.div>

//         {/* Confirm Password Field */}
//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
//             Confirm Password
//           </Label>
//           <div className="relative">
//             <Input
//               id="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               value={formData.confirmPassword}
//               onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//               placeholder="••••••••"
//               className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </motion.div>

//         {/* Register Button */}
//         <motion.div variants={itemVariants}>
//           <Button
//             type="submit"
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
//           >
//             Create Account
//           </Button>
//         </motion.div>

//         {/* Divider */}
//         <motion.div variants={itemVariants} className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
//           </div>
//         </motion.div>

//         {/* Social Login */}
//         <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
//           <motion.button
//             type="button"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//               <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//               <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//               <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//             </svg>
//             Google
//           </motion.button>
          
//           <motion.button
//             type="button"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//           >
//             <Github className="w-5 h-5 mr-2" />
//             GitHub
//           </motion.button>
//         </motion.div>

//         {/* Toggle to Login */}
//         <motion.div variants={itemVariants} className="text-center">
//           <p className="text-gray-600 dark:text-gray-300">
//             Already have an account?{' '}
//             <button
//               type="button"
//               onClick={onToggleMode}
//               className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
//             >
//               Login
//             </button>
//           </p>
//         </motion.div>

//       </form>
//     </motion.div>
//   );
// };

// export default RegisterForm;
















// import { useState, useContext, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Github, Camera } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { useAuth } from '@/context/authContext';

// const RegisterForm = ({ onToggleMode }: { onToggleMode: () => void }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { isAuthorized, setIsAuthorized, setUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthorized) {
//       navigate('/');
//     }
//   }, [isAuthorized]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("name", formData.name);
//     payload.append("email", formData.email);
//     payload.append("password", formData.password);
//     if (profileImage) {
//       payload.append("profilepic", profileImage);
//     }

//     try {
//       const { data } = await axios.post(
//         "https://sparkswipebackend.onrender.com/api/v1/user/register",
//         payload,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setIsAuthorized(true);
//       setUser(data.user);
//       navigate('/');
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Registration failed");
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div variants={containerVariants} initial="hidden" animate="visible">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <motion.div variants={itemVariants} className="flex justify-center">
//           <div className="relative">
//             <Avatar className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-700">
//               <AvatarImage src={previewImage || undefined} />
//               <AvatarFallback>
//                 {formData.name.charAt(0).toUpperCase() || '+'}
//               </AvatarFallback>
//             </Avatar>
//             <motion.label
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="absolute -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer"
//             >
//               <Camera size={16} />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </motion.label>
//           </div>
//         </motion.div>

//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="name">Full Name</Label>
//           <Input
//             id="name"
//             type="text"
//             value={formData.name}
//             onChange={(e) => handleInputChange('name', e.target.value)}
//             placeholder="John Doe"
//             required
//           />
//         </motion.div>

//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => handleInputChange('email', e.target.value)}
//             placeholder="you@example.com"
//             required
//           />
//         </motion.div>

//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="password">Password</Label>
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={(e) => handleInputChange('password', e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </motion.div>

//         <motion.div variants={itemVariants} className="space-y-2">
//           <Label htmlFor="confirmPassword">Confirm Password</Label>
//           <div className="relative">
//             <Input
//               id="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               value={formData.confirmPassword}
//               onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             >
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </motion.div>

//         <motion.div variants={itemVariants}>
//           <Button type="submit" className="w-full bg-emerald-600 text-white">
//             Create Account
//           </Button>
//         </motion.div>

//         <motion.div variants={itemVariants} className="text-center">
//           <p className="text-sm">
//             Already have an account?{' '}
//             <button
//               type="button"
//               onClick={onToggleMode}
//               className="text-emerald-600 hover:underline"
//             >
//               Login
//             </button>
//           </p>
//         </motion.div>
//       </form>
//     </motion.div>
//   );
// };

// export default RegisterForm;





import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '@/context/authContext';

const RegisterForm = ({ onToggleMode }: { onToggleMode: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio:'',
    password: '',
    confirmPassword: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("password", formData.password);
    payload.append("bio", formData.bio);
    if (profileImage) {
      payload.append("profilepic", profileImage);
    }

    try {
      const { data } = await axios.post(
        "https://sparkswipebackend.onrender.com/api/v1/user/register",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);
      setUser(data.user);
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-700">
              <AvatarImage src={previewImage || undefined} />
              <AvatarFallback>
                {formData.name.charAt(0).toUpperCase() || '+'}
              </AvatarFallback>
            </Avatar>
            <motion.label
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer"
            >
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.label>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="John Doe"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="you@example.com"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="name">Bio</Label>
          <Input
            id="bio"
            type="text"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Engineer by Choice, Developer by Passion"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="1234567890"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button disabled={submitting} type="submit" className="w-full bg-emerald-600 text-white">
            {submitting ? 'Creating Account...' : 'Create Account'} 
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-emerald-600 hover:underline"
            >
              Login
            </button>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
