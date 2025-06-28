import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Grid, List, Filter, Clock, Heart, Eye, MessageCircle } from 'lucide-react';

const Saved = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch saved projects from backend
  const fetchSavedProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:4000/api/v1/project/saved', {
        withCredentials: true,
      });
      
      // Transform data to match frontend structure
      const transformedData = response.data.projects.map((project: any) => ({
        ...project,
        id: project._id,
        comments: project.commentsCount,
        author: project.postedBy?.name || 'Unknown',
        avatar: project.postedBy?.profilepic?.url || 'https://via.placeholder.com/150',
        savedAt: project.createdAt
      }));
      
      // Sort projects based on selected option
      let sortedData = [...transformedData];
      switch (sortBy) {
        case 'recent':
          sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'likes':
          sortedData.sort((a, b) => b.likes - a.likes);
          break;
        case 'category':
          sortedData.sort((a, b) => a.category.localeCompare(b.category));
          break;
        default:
          break;
      }
      
      setSavedProjects(sortedData);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load saved projects');
      console.error('Error fetching saved projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedProjects();
  }, [sortBy]); // Refetch when sortBy changes

  const handleViewIdea = (ideaId: string) => {
    console.log('Viewing idea:', ideaId);
    // You can implement navigation to the idea detail page here
    // Example: router.push(`/ideas/${ideaId}`);
  };

  // Calculate stats
 const stats = [
  { label: 'Total Saved', value: savedProjects.length, icon: <Heart className="w-5 h-5" /> },
  { 
    label: 'This Week',
    value: (savedProjects.filter(p => 
      new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    )).length,
    icon: <Clock className="w-5 h-5" />
  },
  {
    label: 'Categories',
    value: new Set(savedProjects.map(p => p.category)).size,
    icon: <Filter className="w-5 h-5" />
  },
  {
    label: 'Total Likes',
    value: savedProjects.reduce((sum, p) => sum + p.likes, 0),
    icon: <Heart className="w-5 h-5" />
  }
];


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 md:pt-24 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 md:pt-24 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <button 
              onClick={fetchSavedProjects}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-4 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Ideas</h1>
            <p className="text-gray-600">Your collection of inspiring startup concepts</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="likes">Most Liked</option>
              <option value="category">Category</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-green-600">{stat.icon}</div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Ideas Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {savedProjects.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                viewMode === 'list' ? 'p-6' : 'overflow-hidden'
              }`}
              onClick={() => handleViewIdea(idea.id)}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={idea.avatar}
                          alt={idea.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{idea.author}</p>
                          <p className="text-xs text-gray-500">{idea.category}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(idea.savedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {idea.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {idea.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.tags?.slice(0, 2).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {idea.tags?.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{idea.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={14} />
                          <span>{idea.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{idea.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={14} />
                          <span>{idea.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={idea.avatar}
                      alt={idea.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{idea.author}</p>
                      <p className="text-sm text-gray-500">{idea.category}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{idea.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {idea.tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-gray-500 text-sm mb-2">
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>{idea.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{idea.views}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(idea.savedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {savedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved ideas yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring and save ideas that inspire you
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Explore Ideas
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Saved;