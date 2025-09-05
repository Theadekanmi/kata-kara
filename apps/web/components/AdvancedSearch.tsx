"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFilters {
  query: string;
  category: string;
  budgetMin: string;
  budgetMax: string;
  experienceLevel: string;
  projectLength: string;
  skills: string[];
  location: string;
  sortBy: string;
}

interface AdvancedSearchProps {
  onFiltersChange?: (filters: SearchFilters) => void;
  currentResults?: number;
}

const categories = [
  "Development & IT",
  "Design & Creative",
  "Sales & Marketing", 
  "Writing & Translation",
  "Admin & Customer Support",
  "Finance & Accounting",
  "Engineering & Architecture",
  "Legal"
];

const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" }
];

const projectLengths = [
  "Less than 1 month",
  "1 to 3 months",
  "3 to 6 months", 
  "More than 6 months"
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "budget_high", label: "Highest Budget" },
  { value: "budget_low", label: "Lowest Budget" },
  { value: "most_relevant", label: "Most Relevant" }
];

const popularSkills = [
  "JavaScript", "React", "Node.js", "Python", "PHP", "WordPress", 
  "UI/UX Design", "Graphic Design", "SEO", "Content Writing",
  "Data Entry", "Virtual Assistant", "Digital Marketing", "Social Media"
];

export function AdvancedSearch({ onFiltersChange, currentResults = 0 }: AdvancedSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams?.get("q") || "",
    category: searchParams?.get("category") || "",
    budgetMin: searchParams?.get("budget_min") || "",
    budgetMax: searchParams?.get("budget_max") || "",
    experienceLevel: searchParams?.get("experience") || "",
    projectLength: searchParams?.get("duration") || "",
    skills: searchParams?.get("skills")?.split(",").filter(Boolean) || [],
    location: searchParams?.get("location") || "",
    sortBy: searchParams?.get("sort") || "newest"
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = (key: keyof SearchFilters, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      updateFilter("skills", [...filters.skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFilter("skills", filters.skills.filter(skill => skill !== skillToRemove));
  };

  const clearAllFilters = () => {
    setFilters({
      query: "",
      category: "",
      budgetMin: "",
      budgetMax: "",
      experienceLevel: "",
      projectLength: "",
      skills: [],
      location: "",
      sortBy: "newest"
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.query) params.set("q", filters.query);
    if (filters.category) params.set("category", filters.category);
    if (filters.budgetMin) params.set("budget_min", filters.budgetMin);
    if (filters.budgetMax) params.set("budget_max", filters.budgetMax);
    if (filters.experienceLevel) params.set("experience", filters.experienceLevel);
    if (filters.projectLength) params.set("duration", filters.projectLength);
    if (filters.skills.length > 0) params.set("skills", filters.skills.join(","));
    if (filters.location) params.set("location", filters.location);
    if (filters.sortBy !== "newest") params.set("sort", filters.sortBy);

    router.push(`/jobs?${params.toString()}`);
  };

  const hasActiveFilters = () => {
    return filters.category || filters.budgetMin || filters.budgetMax || 
           filters.experienceLevel || filters.projectLength || 
           filters.skills.length > 0 || filters.location || filters.sortBy !== "newest";
  };

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && applyFilters()}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                placeholder="Search for jobs, skills, or companies..."
              />
            </div>
          </div>
          
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white min-w-[150px]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={applyFilters}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filters {hasActiveFilters() && `(${Object.values(filters).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length})`}
          </button>

          {filters.skills.map(skill => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}

          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {currentResults > 0 ? (
            <>Found <span className="font-semibold">{currentResults.toLocaleString()}</span> jobs</>
          ) : (
            <>No jobs found matching your criteria</>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Filters</h3>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range ($)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={filters.budgetMin}
                  onChange={(e) => updateFilter("budgetMin", e.target.value)}
                  placeholder="Min"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="number"
                  value={filters.budgetMax}
                  onChange={(e) => updateFilter("budgetMax", e.target.value)}
                  placeholder="Max"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => updateFilter("experienceLevel", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Any Level</option>
                {experienceLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            {/* Project Length */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Length</label>
              <select
                value={filters.projectLength}
                onChange={(e) => updateFilter("projectLength", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Any Duration</option>
                {projectLengths.map(length => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                placeholder="Remote, New York, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            
            {/* Add Skill Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(newSkill))}
                placeholder="Add a skill..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={() => addSkill(newSkill)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>

            {/* Popular Skills */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    disabled={filters.skills.includes(skill)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Skills */}
            {filters.skills.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Selected skills:</p>
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Apply/Clear Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

