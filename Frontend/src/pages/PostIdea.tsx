import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Tag, Eye, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";

const PostIdea = () => {
  const { isAuthorized, setUser } = useAuth();
  const navigateTo = useNavigate();

  const [userData, setUserData] = useState({
    name: "Your Name",
    profilepic: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthorized) {
        navigateTo("/auth");
        return;
      }
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUserData({
          name: data.user.name || "Your Name",
          profilepic: data.user.profilepic?.url || null,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigateTo("/");
        } else {
          toast.error("Failed to fetch user data");
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [isAuthorized, navigateTo]);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    tags: [],
    image: null,
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.fullDescription);
      data.append("category", formData.category);
      formData.tags.forEach((tag) => data.append("tags", tag));
      if (formData.image) data.append("file", formData.image);

      const response = await axios.post(
        "http://localhost:4000/api/v1/project/post",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        tags: [],
        image: null,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-12 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Share Your Startup Idea <Link to="/rand-idea"> <span className="text-blue-600 underline">With AI</span></Link>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your vision into reality by sharing it with our community of
            innovators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Idea Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., AI-Powered Fitness Coach"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Short Description */}
              {/* Currently not updating in database because database don't have short desciption field  */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Short Description * (for card preview)
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) =>
                    handleInputChange("shortDescription", e.target.value)
                  }
                  placeholder="A brief, engaging description that will appear on your idea card..."
                  rows={3}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.shortDescription.length}/200 characters
                </p>
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Description *
                </label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) =>
                    handleInputChange("fullDescription", e.target.value)
                  }
                  placeholder="Provide detailed information about your idea, target market, potential impact, and implementation approach..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-green-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <Tag size={18} />
                  </button>
                </div>
              </div>

              {/* Image Upload */}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Image
                </label>

                {formData.image ? (
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="mx-auto h-48 object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: null }))
                      }
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100"
                    >
                      <X size={16} className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer block"
                  >
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drop an image here, or{" "}
                        <span className="text-green-600 font-medium">
                          browse
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sharing Your Idea...</span>
                  </div>
                ) : (
                  "Share Your Idea"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Live Preview</h3>
              </div>

              {/* Card Preview */}
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {userData.profilepic ? (
                    // Display Cloudinary profile picture if available
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={userData.profilepic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    // Fallback gradient circle with user's initial
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {userData.name
                          ? userData.name.charAt(0).toUpperCase()
                          : "Y"}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {userData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formData.category || "Category"}
                    </p>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {formData.title || "Your Idea Title"}
                </h4>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {formData.shortDescription ||
                    "Your short description will appear here..."}
                </p>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center space-x-4">
                    <span>❤️ 0</span>
                    <span>👁️ 0</span>
                    <span>💬 0</span>
                  </div>
                  <span className="text-green-600 font-medium">
                    View Details
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                💡 Tips for Success
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>
                    Write a clear, compelling title that grabs attention
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>
                    Use relevant tags to help others discover your idea
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Include market size and potential impact</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Add a high-quality image if possible</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PostIdea;
