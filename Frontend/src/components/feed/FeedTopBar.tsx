
// import { Search, ArrowLeft } from 'lucide-react';
// import { Input } from '@/components/ui/input';

// interface FeedTopBarProps {
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
// }

// const FeedTopBar = ({ searchQuery, onSearchChange }: FeedTopBarProps) => {
//   return (
//     <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center gap-4">
//           {/* Back Button - Hidden on desktop */}
//           <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
          
//           {/* Title */}
//           {/* <div className="flex-shrink-0">
//             <h1 className="text-xl font-bold text-gray-900">Discover Ideas</h1>
//           </div> */}
          
//           {/* Search Bar */}
//           <div className="flex-1 max-w-md relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               type="text"
//               placeholder="Search startups, tags, or categories..."
//               value={searchQuery}
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedTopBar;




import { useState, useEffect, useCallback } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FeedTopBarProps {
  initialQuery?: string;
  onSearchChange?: (query: string) => void;
  debounceDelay?: number;
  placeholder?: string;
}

const FeedTopBar = ({ 
  initialQuery = '',
  onSearchChange,
  debounceDelay = 300,
  placeholder = 'Search startups, tags, or categories...'
}: FeedTopBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Handle back button click
  const handleBackClick = () => {
    // You can add navigation logic here if needed
    console.log('Back button clicked');
  };

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, debounceDelay]);

  // Notify parent when debounced query changes
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, onSearchChange]);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clear search query
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 sticky md:top-16 top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Back Button - Hidden on desktop */}
          <button 
            onClick={handleBackClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedTopBar;