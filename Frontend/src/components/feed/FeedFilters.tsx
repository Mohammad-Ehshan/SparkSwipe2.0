
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface FeedFiltersProps {
//   categories: string[];
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   sortOptions: string[];
//   sortBy: string;
//   onSortChange: (sort: string) => void;
// }

// const FeedFilters = ({ 
//   categories, 
//   selectedCategory, 
//   onCategoryChange,
//   sortOptions,
//   sortBy,
//   onSortChange 
// }: FeedFiltersProps) => {
//   return (
//     <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//       {/* Category Pills */}
//       <div className="flex flex-wrap gap-2">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => onCategoryChange(category)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//               selectedCategory === category
//                 ? 'bg-emerald-600 text-white'
//                 : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Sort Dropdown */}
//       <div className="flex items-center gap-2">
//         <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
//         <Select value={sortBy} onValueChange={onSortChange}>
//           <SelectTrigger className="w-32">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             {sortOptions.map((option) => (
//               <SelectItem key={option} value={option}>
//                 {option}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// };

// export default FeedFilters;



import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FeedFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOptions: string[];
  sortBy: string;
  onSortChange: (sortOption: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

const FeedFilters = ({ 
  categories = ['All', 'GreenTech', 'HealthTech', 'Social Impact', 'EdTech', 'AgriTech', 'FinTech', 'Enterprise', 'Consumer', 'Gaming', 'Other'],
  selectedCategory = 'All',
  onCategoryChange,
  sortOptions = ['Trending', 'Recent', 'Most Liked', 'Most Viewed'],
  sortBy = 'Trending',
  onSortChange,
  availableTags = [],
  selectedTags = [],
  onTagToggle,
  className = ''
}: FeedFiltersProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      {availableTags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FeedFilters;