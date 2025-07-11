import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import { TrendingUp, Undo, Clock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/authContext';

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  likes: number;
  views: number;
  creator: {
    _id: string;
    name: string;
    profilepic?: {
      url: string;
    };
  };
  media?: {
    url: string;
  };
  createdAt: string;
}

interface TrendingProject {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  likes: number;
  views: number;
  media?: {
    imageUrls: Array<{
      url: string;
    }>;
  };
  creator: {
    _id: string;
    name: string;
    profilepic?: {
      url: string;
    };
  };
  trendingScore: number;
}

interface SwipeHistoryItem {
  _id: string;
  action: string;
  timestamp: string;
  project: {
    _id: string;
    title: string;
    media?: {
      url: string;
    };
  };
}

const Explore = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [trendingProjects, setTrendingProjects] = useState<TrendingProject[]>([]);
  const [recentSwipes, setRecentSwipes] = useState<SwipeHistoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [swipeHistoryLoading, setSwipeHistoryLoading] = useState(true);
  const [error, setError] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [lastSwipe, setLastSwipe] = useState<{projectId: string, action: string} | null>(null);

  const fetchProjects = async (reset = false) => {
    try {
      setLoading(true);
      if (reset) {
        setProjects([]);
        setCurrentIndex(0);
      }

      const res = await axios.get('https://sparkswipebackend.onrender.com/api/v1/swipe/next', {
        withCredentials: true,
      });

      if (res.data.cards.length === 0) {
        setRemaining(0);
      } else {
        setProjects(prev => reset ? res.data.cards : [...prev, ...res.data.cards]);
        setRemaining(res.data.remaining);
      }
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingProjects = async () => {
    try {
      setTrendingLoading(true);
      const res = await axios.get('https://sparkswipebackend.onrender.com/api/v1/project/trending', {
        params: {
          limit: 10,
          timeWindow: 'weekly',
          update: 'false'
        },
        withCredentials: true,
      });
      
      if (res.data.success) {
        setTrendingProjects(res.data.trending);
      }
    } catch (error) {
      console.error('Failed to fetch trending projects', error);
    } finally {
      setTrendingLoading(false);
    }
  };

  const fetchSwipeHistory = async () => {
    try {
      setSwipeHistoryLoading(true);
      const res = await axios.get('https://sparkswipebackend.onrender.com/api/v1/swipe/history', {
        params: {
          limit: 5
        },
        withCredentials: true,
      });
      
      if (res.data.history) {
        setRecentSwipes(res.data.history);
      }
    } catch (error) {
      console.error('Failed to fetch swipe history', error);
    } finally {
      setSwipeHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(true);
    fetchTrendingProjects();
    fetchSwipeHistory();
  }, [setIsAuthorized]);

  const handleSwipe = async (direction: 'left' | 'right' | 'up') => {
    const currentProject = projects[currentIndex];
    if (!currentProject) return;

    try {
      const action = 
        direction === 'right' ? 'like' : 
        direction === 'left' ? 'dislike' : 'skip';
      
      await axios.post('https://sparkswipebackend.onrender.com/api/v1/swipe/', {
        projectId: currentProject._id,
        action
      }, {
        withCredentials: true
      });

      // Store last swipe for undo
      setLastSwipe({projectId: currentProject._id, action});
      
      setCurrentIndex(prev => prev + 1);

      // Refresh swipe history
      fetchSwipeHistory();

      // Fetch more projects when we're near the end
      if (currentIndex >= projects.length - 3 && remaining > 0) {
        fetchProjects();
      }
    } catch (err) {
      console.error('Swipe error:', err);
    }
  };

  const handleUndoSwipe = async () => {
    if (!lastSwipe) return;
    
    try {
      // FIXED: Changed to DELETE request to correct endpoint
      await axios.delete('https://sparkswipebackend.onrender.com/api/v1/swipe/last', {
        withCredentials: true
      });

      // Update project stats locally
      const updatedProjects = [...projects];
      const projectIndex = currentIndex - 1;
      
      if (lastSwipe.action === 'like') {
        updatedProjects[projectIndex].likes -= 1;
      }
      
      updatedProjects[projectIndex].views -= 1;
      setProjects(updatedProjects);
      setCurrentIndex(prev => prev - 1);
      setLastSwipe(null);
      
      // Refresh swipe history
      fetchSwipeHistory();
    } catch (err) {
      console.error('Undo error:', err);
    }
  };

  const handleCardClick = () => {
    const projectId = projects[currentIndex]?._id;
    if (projectId) {
      window.location.href = `/idea/${projectId}`;
    }
  };

  const formatProjectForCard = (project: Project) => {
    return {
      id: project._id,
      title: project.title,
      description: project.description,
      tags: project.tags,
      category: project.category,
      likes: project.likes,
      views: project.views,
      comments: 0, // Added default value to fix TypeScript error
      author: project.creator?.name || 'Unknown',
      avatar: project.creator?.profilepic?.url || '/default-avatar.png',
      image: project.media?.url || '/default-project.jpg'
    };
  };

  const currentProject = projects[currentIndex];
  const nextProject = projects[currentIndex + 1];

  // Action icon mapping
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'like': 
        return <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>;
      case 'dislike':
        return <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-8 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Ideas</h1>
            <p className="text-gray-600">Discover recently swiped startup concepts</p>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUndoSwipe}
              disabled={!lastSwipe}
              className={`flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md transition-all ${
                !lastSwipe ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              <Undo size={20} />
              <span>Undo</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Recently Swiped */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Recently Swiped</h3>
              </div>
              {swipeHistoryLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : recentSwipes.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">No recent swipes</p>
              ) : (
                <div className="space-y-3">
                  {recentSwipes.map((swipe) => (
                    <motion.div 
                      key={swipe._id}
                      whileHover={{ y: -2 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100"
                      onClick={() => (window.location.href = `/idea/${swipe.project._id}`)}
                    >
                      {getActionIcon(swipe.action)}
                      <img 
                        src={swipe.project.media?.url || '/default-project.jpg'} 
                        alt={swipe.project.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{swipe.project.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(swipe.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Center Panel - Swipe Cards */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-[600px] md:h-[700px]">
              {loading && !projects.length ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <AnimatePresence>
                  {currentProject ? (
                    <SwipeCard
                      key={currentProject._id}
                      idea={formatProjectForCard(currentProject)}
                      onSwipe={handleSwipe}
                      onClick={handleCardClick}
                    />
                  ) : null}
                  
                  {nextProject ? (
                    <motion.div
                      key={nextProject._id}
                      className="absolute inset-0 -z-10"
                      initial={{ scale: 0.95, opacity: 0.5 }}
                      animate={{ scale: 0.95, opacity: 0.5 }}
                    >
                      <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100" />
                    </motion.div>
                  ) : null}

                  {!currentProject && !loading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center h-full bg-white rounded-2xl shadow-xl border border-gray-100"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-600">Check back later for more ideas</p>
                        {remaining > 0 && (
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => fetchProjects()}
                            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg font-medium"
                          >
                            Load More
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Right Sidebar - Trending */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-gray-900">Trending Now</h3>
              </div>
              {trendingLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : trendingProjects.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">No trending projects found</p>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {trendingProjects.map((project) => (
                    <motion.div 
                      key={project._id} 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100"
                      onClick={() => (window.location.href = `/idea/${project._id}`)}
                    >
                      <img 
                        // FIXED: Updated to correct image URL structure
                        src={project.media?.imageUrls?.[0]?.url || '/default-project.jpg'} 
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{project.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{project.likes} likes</span>
                          <span>•</span>
                          <span>{project.views} views</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <TrendingUp size={12} className="mr-1 text-orange-500" /> 
                            {project.trendingScore}
                          </span>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Swipe Actions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Swipe Right</p>
                    <p className="text-sm text-gray-500">Like this idea</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Swipe Left</p>
                    <p className="text-sm text-gray-500">Dislike this idea</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Swipe Up</p>
                    <p className="text-sm text-gray-500"> Skip this idea</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Explore;