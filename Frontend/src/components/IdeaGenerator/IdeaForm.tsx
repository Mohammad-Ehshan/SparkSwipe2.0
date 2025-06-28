import { useState } from "react";

type IdeaFormData = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  targetAudience: string;
  techPreference: string;
  budgetLevel: string;
  duration: string;
  includeAI: boolean;
  hardwareBased: boolean;
  researchOriented: boolean;
  surprise: boolean;
};

export default function IdeaForm({
  onSubmit,
}: {
  onSubmit: (data: IdeaFormData) => void;
}) {
  const [formData, setFormData] = useState<IdeaFormData>({
    title: "",
    description: "",
    tags: [],
    category: "",
    targetAudience: "",
    techPreference: "",
    budgetLevel: "",
    duration: "",
    includeAI: false,
    hardwareBased: false,
    researchOriented: false,
    surprise: false,
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-gray-50 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Generate Smart Ideas
      </h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title (Optional)
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Sustainable Farming"
        />
      </div>

      {/* Problem/Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Problem / Description *
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe what you want ideas around..."
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tags
        </label>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Blockchain, Education"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          <option value="Startup">Startup</option>
          <option value="Research Project">Research Project</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Side Project">Side Project</option>
        </select>
      </div>

      {/* Target Audience */}
      <div>
        <label
          htmlFor="targetAudience"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Target Audience (Optional)
        </label>
        <input
          type="text"
          name="targetAudience"
          id="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. college students, rural farmers"
        />
      </div>

      {/* Tech Preference */}
      <div>
        <label
          htmlFor="techPreference"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tech Preference (Optional)
        </label>
        <input
          type="text"
          name="techPreference"
          id="techPreference"
          value={formData.techPreference}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Python, no Web3 please"
        />
      </div>

      {/* Budget Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget Level
        </label>
        <div className="flex space-x-4">
          {["Low", "Medium", "High"].map((level) => (
            <label key={level} className="inline-flex items-center">
              <input
                type="radio"
                name="budgetLevel"
                value={level}
                checked={formData.budgetLevel === level}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Duration
        </label>
        <select
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select duration</option>
          <option value="Short-term (2 weeks)">Short-term (2 weeks)</option>
          <option value="Medium (1-2 months)">Medium (1-2 months)</option>
          <option value="Long-term (>3 months)">
            Long-term (&gt;3 months)
          </option>
        </select>
      </div>

      {/* Special Requirements */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Special Requirements
        </label>

        <div className="flex items-center">
          <input
            id="includeAI"
            name="includeAI"
            type="checkbox"
            checked={formData.includeAI}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="includeAI" className="ml-2 text-gray-700">
            Include AI/ML in the idea
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="hardwareBased"
            name="hardwareBased"
            type="checkbox"
            checked={formData.hardwareBased}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="hardwareBased" className="ml-2 text-gray-700">
            Prefer hardware-based ideas
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="researchOriented"
            name="researchOriented"
            type="checkbox"
            checked={formData.researchOriented}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="researchOriented" className="ml-2 text-gray-700">
            Should be innovative or research-oriented
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="surprise"
            name="surprise"
            type="checkbox"
            checked={formData.surprise}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="surprise" className="ml-2 text-gray-700">
            Surprise me with something opposite to my domain
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Generate Ideas
      </button>
    </form>
  );
}
