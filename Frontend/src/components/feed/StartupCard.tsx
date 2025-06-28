import { Heart, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export interface Startup {
  _id: string;
  title: string;
  description: string;
  category: 
    | "AI/ML"
    | "FinTech"
    | "HealthTech"
    | "EdTech"
    | "CleanTech"
    | "Enterprise"
    | "Consumer"
    | "Social"
    | "Gaming"
    | "Other";
  postedBy: {
    _id: string;
    name: string;
    profilepic?: {
      url: string;
    };
  };
  tags: string[];
  media: {
    imageUrls: {
      public_id: string;
      url: string;
    }[];
    video?: {
      public_id: string;
      url: string;
    };
  };
  likes: number;
  views: number;
  commentsCount: number;
  createdAt: string;
}

interface StartupCardProps {
  startup: Startup;
}

const StartupCard = ({ startup }: StartupCardProps) => {
  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  // Get first image URL if available
  const mediaUrl = startup.media?.imageUrls?.[0]?.url || '';

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {/* Media Thumbnail */}
        {mediaUrl && (
          <div className="relative">
            <img
              src={mediaUrl}
              alt={startup.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <CardContent className="p-5">
          {/* Header with User Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage 
                src={startup.postedBy?.profilepic?.url} 
                alt={startup.postedBy?.name} 
              />
              <AvatarFallback>
                {startup.postedBy?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {startup.postedBy?.name || 'Unknown User'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                {startup.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {startup.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {startup.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {startup.tags?.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{startup.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Category */}
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                {startup.category}
              </Badge>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <motion.button
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatCount(startup.likes || 0)}
                </span>
              </motion.button>
              
              <div className="flex items-center gap-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span className="text-sm">
                  {formatCount(startup.views || 0)}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">
                  {formatCount(startup.commentsCount || 0)}
                </span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400">
              {new Date(startup.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StartupCard;