
// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Home, Search, Plus, Heart, User, Menu, X, List } from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// import axios from 'axios';
// import { toast } from 'sonner';

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
  
//   const [show, setShow] = useState(false);
//   const {isAuthorized,setIsAuthorized,user}=useAuth();
//   const navigateTo=useNavigate();

//   const handleLogout=async()=>{
//     try{
//       const response = await axios.get('http://localhost:4000/api/v1/user/logout', {
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       setIsAuthorized(false);
//       navigateTo('/auth');
//     } catch (error) {
//       toast.error(error.response.data.message || 'Logout failed');
//       setIsAuthorized(true);
//     }
//   }

//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/explore', label: 'Explore', icon: Search },
//     { path: '/feed', label: 'Feed', icon: List },
//     { path: '/post', label: 'Post Idea', icon: Plus },
//     { path: '/saved', label: 'Saved', icon: Heart },
//     { path: '/profile', label: 'Profile', icon: User },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   // if(!isAuthorized) return null;

//   return (
//     <>
//       {/* Enhanced Desktop Navigation */}
//       <motion.nav 
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="hidden md:flex fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-100 z-50 shadow-sm"
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
//           <Link to="/" className="flex items-center space-x-3">
//             <motion.div
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               whileTap={{ scale: 0.9 }}
//               className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
//             >
//               <span className="text-white font-bold text-lg">S</span>
//             </motion.div>
//             <motion.span 
//               className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
//               whileHover={{ scale: 1.05 }}
//             >
//               SparkSwipe
//             </motion.span>
//           </Link>

//           <div className="flex items-center space-x-2">
//             {navItems.map((item) => (
//               <Link key={item.path} to={item.path}>
//                 <motion.div
//                   className={`relative px-6 py-3 rounded-xl transition-all duration-200 ${
//                     isActive(item.path)
//                       ? 'text-green-600 bg-green-50 shadow-sm'
//                       : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {isActive(item.path) && (
//                     <motion.div
//                       layoutId="desktop-nav-indicator"
//                       className="absolute inset-0 bg-green-50 rounded-xl border border-green-200"
//                       initial={false}
//                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                     />
//                   )}
//                   <span className="relative z-10 font-medium">{item.label}</span>
//                   {isActive(item.path) && (
//                     <motion.div
//                       className="absolute bottom-0 left-1/2 w-6 h-1 bg-green-600 rounded-full"
//                       layoutId="nav-underline"
//                       style={{ x: '-50%' }}
//                     />
//                   )}
//                 </motion.div>
//               </Link>
//             ))}
//           </div>

//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </motion.nav>

//       {/* Enhanced Mobile Bottom Navigation */}
//       <motion.nav 
//         initial={{ y: 100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-100 z-50 shadow-lg"
//       >
//         <div className="flex items-center justify-around py-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <Link key={item.path} to={item.path}>
//                 <motion.div
//                   className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
//                     isActive(item.path)
//                       ? 'text-green-600'
//                       : 'text-gray-400 hover:text-green-600'
//                   }`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   {isActive(item.path) && (
//                     <motion.div
//                       layoutId="mobile-nav-indicator"
//                       className="absolute inset-0 bg-green-50 rounded-xl"
//                       initial={false}
//                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                     />
//                   )}
//                   <motion.div
//                     className="relative z-10"
//                     animate={isActive(item.path) ? { scale: 1.2 } : { scale: 1 }}
//                   >
//                     <Icon size={22} />
//                   </motion.div>
//                   <span className="text-xs mt-1 relative z-10 font-medium">
//                     {item.label.split(' ')[0]}
//                   </span>
//                   {isActive(item.path) && (
//                     <motion.div
//                       className="absolute -top-1 left-1/2 w-2 h-2 bg-green-600 rounded-full"
//                       layoutId="mobile-nav-dot"
//                       style={{ x: '-50%' }}
//                     />
//                   )}
//                 </motion.div>
//               </Link>
//             );
//           })}
//         </div>
//       </motion.nav>
//     </>
//   );
// };

// export default Navigation;

















import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Plus, Heart, User, Menu, X, List } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/context/authContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthorized, setIsAuthorized, user } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/user/logout', {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate('/auth');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Search },
    { path: '/feed', label: 'Feed', icon: List },
    { path: '/post', label: 'Post Idea', icon: Plus },
    { path: '/saved', label: 'Saved', icon: Heart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isAuthorized ? (
        <>
          {/* Desktop Navigation */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden md:flex fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-100 z-50 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-lg">S</span>
                </motion.div>
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  SparkSwipe
                </motion.span>
              </Link>

              {/* Nav Items */}
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`relative px-5 py-2 rounded-xl transition-all duration-200 ${
                        isActive(item.path)
                          ? 'text-green-600 bg-green-50 shadow-sm'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.nav>

          {/* Mobile Bottom Navigation */}
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-100 z-50 shadow-lg"
          >
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive(item.path)
                          ? 'text-green-600'
                          : 'text-gray-400 hover:text-green-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={22} />
                      <span className="text-xs mt-1 relative z-10 font-medium">
                        {item.label.split(' ')[0]}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        </>
      ) : (
        // Unauthenticated user: minimal top nav with Login
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-green-100 z-50 shadow-sm py-3 px-6 flex justify-between items-center"
        >
          <Link to="/" className="text-xl font-bold text-green-700">
            SparkSwipe
          </Link>
          <Link
            to="/auth"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
        </motion.nav>
      )}
    </>
  );
};

export default Navigation;
