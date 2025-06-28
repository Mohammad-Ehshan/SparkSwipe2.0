import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, Eye, MessageCircle, Share, X, Check, Minus } from 'lucide-react';

interface SwipeCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    likes: number;
    views: number;
    comments?: number;
    trending?: boolean;
    author: string;
    avatar: string;
    image?: string;
  };
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  onClick: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ idea, onSwipe, onClick }) => {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Enhanced transforms for better visual feedback
  const rotate = useTransform(x, [-300, 300], [-15, 15]);
  const rotateY = useTransform(y, [-300, 300], [-7.5, 7.5]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-300, 0, 300], [0.8, 1, 0.8]);
  
  // Color overlays for swipe feedback
  const likeOpacity = useTransform(x, [0, 150], [0, 0.7]);
  const dislikeOpacity = useTransform(x, [-150, 0], [0.7, 0]);
  const skipOpacity = useTransform(y, [-150, 0], [0.7, 0]);

  const triggerSwipe = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'right') {
      setExitX(300);
    } else if (direction === 'left') {
      setExitX(-300);
    } else if (direction === 'up') {
      setExitY(-300);
    }
    
    setTimeout(() => onSwipe(direction), 700);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    const velocity = Math.abs(info.velocity.x) + Math.abs(info.velocity.y);
    
    if (info.offset.x > swipeThreshold || (info.offset.x > 50 && velocity > 500)) {
      triggerSwipe('right');
    } else if (info.offset.x < -swipeThreshold || (info.offset.x < -50 && velocity > 500)) {
      triggerSwipe('left');
    } else if (info.offset.y < -swipeThreshold || (info.offset.y < -50 && velocity > 500)) {
      triggerSwipe('up');
    }
    setIsDragging(false);
  };

  const handleAction = (action: 'like' | 'dislike' | 'skip') => {
    if (action === 'like') {
      triggerSwipe('right');
    } else if (action === 'dislike') {
      triggerSwipe('left');
    } else {
      triggerSwipe('up');
    }
  };

  const handleCardClick = () => {
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, y, rotate, rotateY, opacity, scale }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : exitY !== 0 ? { y: exitY } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Swipe Feedback Overlays */}
      <motion.div 
        className="absolute inset-0 bg-green-500 rounded-2xl flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        <div className="text-white text-6xl font-bold">LIKE</div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 bg-red-500 rounded-2xl flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: dislikeOpacity }}
      >
        <div className="text-white text-6xl font-bold">NOPE</div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 bg-gray-500 rounded-2xl flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: skipOpacity }}
      >
        <div className="text-white text-6xl font-bold">SKIP</div>
      </motion.div>

      <div 
        className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={idea.avatar}
                alt={idea.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{idea.author}</p>
                <p className="text-sm text-gray-500">{idea.category}</p>
              </div>
            </div>
            {idea.trending && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-semibold rounded-full"
              >
                🔥 Trending
              </motion.span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{idea.title}</h3>
          
          {idea.image && (
            <motion.div 
              className="mb-4 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={idea.image}
                alt="Idea preview"
                className="w-full h-48 object-cover"
              />
            </motion.div>
          )}
          
          <p className="text-gray-600 line-clamp-4 mb-4">{idea.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {idea.tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full font-medium"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-gray-500">
              <motion.div 
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.1 }}
              >
                <Heart size={16} />
                <span className="text-sm">{idea.likes}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.1 }}
              >
                <Eye size={16} />
                <span className="text-sm">{idea.views}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.1 }}
              >
                <MessageCircle size={16} />
                <span className="text-sm">{idea.comments}</span>
              </motion.div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 hover:text-green-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-green-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View Full Details
            </motion.button>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center justify-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                handleAction('dislike');
              }}
              className="w-14 h-14 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center text-red-500 transition-colors shadow-lg hover:shadow-xl"
            >
              <X size={24} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleAction('skip');
              }}
              className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors shadow-md hover:shadow-lg"
            >
              <Minus size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                handleAction('like');
              }}
              className="w-14 h-14 bg-green-50 hover:bg-green-100 rounded-full flex items-center justify-center text-green-500 transition-colors shadow-lg hover:shadow-xl"
            >
              <Check size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;