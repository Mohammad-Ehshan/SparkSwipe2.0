import { useEffect, useState, useRef } from "react";
import StartupCard from "@/components/feed/StartupCard";
import { motion, AnimatePresence } from "framer-motion";
import FeedTopBar from "@/components/feed/FeedTopBar";
import FeedFilters from "@/components/feed/FeedFilters";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";

const categories = [
  "All",
  "AI/ML",
  "FinTech",
  "HealthTech",
  "EdTech",
  "CleanTech",
  "Enterprise",
  "Consumer",
  "Social",
  "Gaming",
  "Other",
];

const sortOptions = ["Trending", "Recent", "Most Liked"];

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  const debouncedFetchRef = useRef(
    debounce(async (search, category, sort) => {
      try {
        setLoading(true);
        const params = {
          category: category === "All" ? null : category,
          sortBy: sort,
          search: search || null,
        };

        const response = await axios.get(
          "http://localhost:4000/api/v1/project/getall",
          {
            params,
            withCredentials: true,
          }
        );
        
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  useEffect(() => {
    debouncedFetchRef.current(searchQuery, selectedCategory, sortBy);
    return () => {
      debouncedFetchRef.current.cancel();
    };
  }, [searchQuery, selectedCategory, sortBy, isAuthorized]);

  // Paginate
  const displayedProjects = projects.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, projects.length));
  };

  const handleCardClick = (projectId) => {
    navigate(`/idea/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <FeedTopBar 
        initialQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search startups, tags, or categories..."
      />

      <div className="container mx-auto px-4 md:pt-20 pt-4 pb-24 lg:pb-8 max-w-3xl">
        <FeedFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOptions={sortOptions}
          sortBy={sortBy}
          onSortChange={setSortBy}
          availableTags={[]}
          selectedTags={[]}
          onTagToggle={() => {}}
        />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing {displayedProjects.length} of {projects.length} ideas
          </p>
        </div>

        {/* Single Column Feed */}
        {loading ? (
          <div className="min-h-[50vh] flex justify-center items-center">
            <div className="text-2xl font-semibold">Loading projects...</div>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  onClick={() => handleCardClick(project._id)}
                  className="cursor-pointer"
                >
                  <StartupCard 
                    startup={project} 
                    // className="hover:shadow-lg transition-shadow duration-200"
                  />
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < projects.length && (
              <div className="text-center">
                <motion.button
                  onClick={loadMore}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Load More Ideas
                </motion.button>
              </div>
            )}

            {/* Empty State */}
            {projects.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No ideas found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;