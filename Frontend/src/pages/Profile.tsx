// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Settings, Edit3, Heart, Eye, MessageCircle, TrendingUp } from 'lucide-react';
// import axios from 'axios';
// import { useAuth } from '../context/authContext';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('posted');
//   const [loading, setLoading] = useState(true);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [projects, setProjects] = useState<any[]>([]);
//   const { user, setIsAuthorized,setUser, logout } = useAuth();

//   // Fetch user profile data
//  const fetchUserProfile = async () => {
//   try {
//     const response = await axios.get('http://localhost:4000/api/v1/user/getuser', {
//       withCredentials: true,
//     });

//     if (response?.data?.success) {
//       setUserProfile(response.data.user);
//     } else {
//       console.error("User fetch failed: ", response);
//     }

//   } catch (error: any) {
//     console.error('❌ Failed to fetch profile:', error?.response?.data || error.message || error);
//   }
// };


//   // Fetch projects based on active tab
//   const fetchProjects = async (tab: string) => {
//     setLoading(true);
//     try {
//       let endpoint = '';
//       if (tab === 'posted') endpoint = 'http://localhost:4000/api/v1/project/posted';
//       if (tab === 'liked') endpoint = 'http://localhost:4000/api/v1/project/liked';
//       if (tab === 'saved') endpoint = 'http://localhost:4000/api/v1/project/saved';
      
//       const { data } = await axios.get(endpoint, {
//         withCredentials: true,
//       });
//       setProjects(data.projects || []);
//     } catch (error) {
//       console.error(`Failed to fetch ${tab} projects:`, error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (setIsAuthorized) {
//       fetchUserProfile();
//     }
//   }, [setIsAuthorized,setUser]);

//   useEffect(() => {
//     if (setIsAuthorized && activeTab) {
//       fetchProjects(activeTab);
//     }
//   }, [activeTab, setIsAuthorized,setUser]);

//   const tabs = [
//     { id: 'posted', label: 'Posted', count: userProfile?.postedCount || 0 },
//     { id: 'liked', label: 'Liked', count: userProfile?.likedCount || 0 },
//     { id: 'saved', label: 'Saved', count: userProfile?.savedCount || 0 }
//   ];


//   if (!userProfile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-4 md:pt-24 pb-20 md:pb-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Profile Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="bg-white rounded-2xl shadow-xl p-8 mb-8"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center space-x-6">
//               <div className="relative">
//                 <img
//                   src={userProfile.profilepic.url}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
//                 />
//                 <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
//                   <span className="text-white text-xs font-bold">✓</span>
//                 </div>
//               </div>
              
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h1>
//                 <p className="text-gray-600 mb-2">{userProfile.bio}</p>
//                 <p className="text-sm text-gray-500 max-w-md">
//                   {userProfile.bio || 'Passionate about building innovative solutions'}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4 mt-6 md:mt-0">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//               >
//                 <Edit3 size={16} />
//                 <span>Edit Profile</span>
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Settings size={20} />
//               </motion.button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
//             {[
//               { label: 'Ideas Posted', value: userProfile.postedCount, icon: <Edit3 className="w-5 h-5" /> },
//               { label: 'Total Likes', value: userProfile.likedCount, icon: <Heart className="w-5 h-5" /> },
//               { label: 'Ideas Saved', value: userProfile.savedCount, icon: <Heart className="w-5 h-5" /> },
//               { label: 'Followers', value: userProfile.followersCount, icon: <TrendingUp className="w-5 h-5" /> }
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="flex justify-center mb-2 text-green-600">
//                   {stat.icon}
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
//                 <div className="text-sm text-gray-600">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-xl overflow-hidden"
//         >
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
//                     activeTab === tab.id
//                       ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
//                       : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   {tab.label} ({tab.count})
//                   {activeTab === tab.id && (
//                     <motion.div
//                       layoutId="tab-indicator"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
//                       initial={false}
//                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                     />
//                   )}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {loading ? (
//               <div className="text-center py-12">Loading projects...</div>
//             ) : projects.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Heart className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {activeTab === 'posted' 
//                     ? 'No posted ideas yet' 
//                     : activeTab === 'liked'
//                     ? 'No liked ideas yet'
//                     : 'No saved ideas yet'}
//                 </h3>
//                 <p className="text-gray-600">
//                   {activeTab === 'posted' 
//                     ? 'Your posted ideas will appear here' 
//                     : activeTab === 'liked'
//                     ? 'Ideas you like will appear here'
//                     : 'Ideas you save will appear here'}
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {projects.map((project, index) => (
//                   <motion.div
//                     key={project._id || index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-3 mb-2">
//                           <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
//                           {/* Status removed since not in schema */}
//                         </div>
//                         <p className="text-gray-600 mb-3">{project.description}</p>
//                         <div className="flex flex-wrap gap-2 mb-3">
//                           {project.tags.map((tag: string, tagIndex: number) => (
//                             <span
//                               key={tagIndex}
//                               className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
//                             >
//                               #{tag}
//                             </span>
//                           ))}
//                         </div>
//                         <div className="flex items-center space-x-6 text-gray-500 text-sm">
//                           <div className="flex items-center space-x-1">
//                             <Heart size={16} />
//                             <span>{project.likes}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Eye size={16} />
//                             <span>{project.views}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <MessageCircle size={16} />
//                             <span>{project.commentsCount}</span>
//                           </div>
//                           <span>Posted {new Date(project.createdAt).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
















import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit3, Heart, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { Transition,Dialog } from '@headlessui/react';

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  userProfile,
  onUpdate 
}: {
  isOpen: boolean
  onClose: () => void
  userProfile: any
  onUpdate: (data: { name: string, bio: string, profilepic?: File }) => Promise<void>
}) => {
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(userProfile.profilepic.url);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(userProfile.name);
    setBio(userProfile.bio);
    setPreviewImage(userProfile.profilepic.url);
  }, [userProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onUpdate({
        name,
        bio,
        profilepic: profilePic || undefined
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Profile
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-green-100 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white cursor-pointer">
                        <Edit3 className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posted');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, setIsAuthorized, setUser, logout } = useAuth();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/user/getuser', {
        withCredentials: true,
      });

      if (response?.data?.success) {
        setUserProfile(response.data.user);
      } else {
        console.error("User fetch failed: ", response);
      }
    } catch (error: any) {
      console.error('❌ Failed to fetch profile:', error?.response?.data || error.message || error);
    }
  };

  const fetchProjects = async (tab: string) => {
    setLoading(true);
    try {
      let endpoint = '';
      if (tab === 'posted') endpoint = 'http://localhost:4000/api/v1/project/posted';
      if (tab === 'liked') endpoint = 'http://localhost:4000/api/v1/project/liked';
      if (tab === 'saved') endpoint = 'http://localhost:4000/api/v1/project/saved';
      
      const { data } = await axios.get(endpoint, {
        withCredentials: true,
      });
      setProjects(data.projects || []);
    } catch (error) {
      console.error(`Failed to fetch ${tab} projects:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updateData: { 
    name: string, 
    bio: string, 
    profilepic?: File 
  }) => {
    try {
      const formData = new FormData();
      formData.append('name', updateData.name);
      formData.append('bio', updateData.bio);
      if (updateData.profilepic) {
        formData.append('profilepic', updateData.profilepic);
      }

      const response = await axios.put(
        'http://localhost:4000/api/v1/user/update_profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUserProfile(response.data.user);
        if (setUser) {
          setUser(response.data.user);
        }
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (setIsAuthorized) {
      fetchUserProfile();
    }
  }, [setIsAuthorized, setUser]);

  useEffect(() => {
    if (setIsAuthorized && activeTab) {
      fetchProjects(activeTab);
    }
  }, [activeTab, setIsAuthorized, setUser]);

  const tabs = [
    { id: 'posted', label: 'Posted', count: userProfile?.postedCount || 0 },
    { id: 'liked', label: 'Liked', count: userProfile?.likedCount || 0 },
    { id: 'saved', label: 'Saved', count: userProfile?.savedCount || 0 }
  ];

  if (!userProfile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-4 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={userProfile.profilepic.url}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h1>
                <p className="text-gray-600 mb-2">{userProfile.bio}</p>
                <p className="text-sm text-gray-500 max-w-md">
                  {userProfile.bio || 'Passionate about building innovative solutions'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings size={20} />
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
            {[
              { label: 'Ideas Posted', value: userProfile.postedCount, icon: <Edit3 className="w-5 h-5" /> },
              { label: 'Total Likes', value: userProfile.likedCount, icon: <Heart className="w-5 h-5" /> },
              { label: 'Ideas Saved', value: userProfile.savedCount, icon: <Heart className="w-5 h-5" /> },
              { label: 'Followers', value: userProfile.followersCount, icon: <TrendingUp className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab === 'posted' 
                    ? 'No posted ideas yet' 
                    : activeTab === 'liked'
                    ? 'No liked ideas yet'
                    : 'No saved ideas yet'}
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'posted' 
                    ? 'Your posted ideas will appear here' 
                    : activeTab === 'liked'
                    ? 'Ideas you like will appear here'
                    : 'Ideas you save will appear here'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags?.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-gray-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart size={16} />
                            <span>{project.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye size={16} />
                            <span>{project.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={16} />
                            <span>{project.commentsCount}</span>
                          </div>
                          <span>Posted {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userProfile={userProfile}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;