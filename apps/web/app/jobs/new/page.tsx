"use client";
import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";

interface JobFormData {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  budgetType: "fixed" | "hourly";
  budgetMin: string;
  budgetMax: string;
  duration: string;
  experienceLevel: "entry" | "intermediate" | "expert";
  skills: string[];
  location: string;
  timezone: string;
  deadline: string;
  attachments: File[];
  questions: string[];
}

const categories = [
  "Development & IT",
  "Design & Creative", 
  "Sales & Marketing",
  "Writing & Translation",
  "Admin & Customer Support",
  "Finance & Accounting",
  "Engineering & Architecture",
  "Legal",
];

const experienceLevels = [
  { value: "entry", label: "Entry Level", description: "Looking for freelancers with basic experience" },
  { value: "intermediate", label: "Intermediate", description: "Looking for substantial experience in this field" },
  { value: "expert", label: "Expert", description: "Looking for comprehensive and deep experience" },
];

const durations = [
  "Less than 1 month",
  "1 to 3 months", 
  "3 to 6 months",
  "More than 6 months",
];

export default function NewJobPage() {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    budgetType: "fixed",
    budgetMin: "",
    budgetMax: "",
    duration: "",
    experienceLevel: "intermediate",
    skills: [],
    location: "Remote",
    timezone: "",
    deadline: "",
    attachments: [],
    questions: [],
  });
  
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.trim()) {
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, currentQuestion.trim()]
      }));
      setCurrentQuestion("");
    }
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
      const access = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      
      if (!access) {
        setError("Please log in to post a job");
        setLoading(false);
        return;
      }

      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        budget: formData.budgetType === "fixed" ? formData.budgetMin : `${formData.budgetMin}-${formData.budgetMax}`,
        budget_type: formData.budgetType,
        duration: formData.duration,
        experience_level: formData.experienceLevel,
        skills: formData.skills,
        location: formData.location,
        deadline: formData.deadline || null,
        questions: formData.questions,
      };

      const response = await fetch(`${base}/api/marketplace/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          subCategory: "",
          budgetType: "fixed",
          budgetMin: "",
          budgetMax: "",
          duration: "",
          experienceLevel: "intermediate",
          skills: [],
          location: "Remote",
          timezone: "",
          deadline: "",
          attachments: [],
          questions: [],
        });
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to post job");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Posted Successfully!</h1>
          <p className="text-gray-600 mb-8">Your job has been published and is now live on KataKara.</p>
          <div className="space-y-4">
            <Link href="/jobs" className="block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View All Jobs
            </Link>
            <button 
              onClick={() => setSuccess(false)}
              className="block w-full border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">Tell us about your project and find the perfect freelancer</p>
        </div>
      </div>

      <div className="container-max py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g. Build a responsive website with React"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    id="description"
                    rows={8}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe your project in detail. Include specific requirements, deliverables, and any important information..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              </div>
            </div>

            {/* Budget */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Budget Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="budgetType"
                        value="fixed"
                        checked={formData.budgetType === "fixed"}
                        onChange={(e) => handleInputChange("budgetType", e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        formData.budgetType === "fixed" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <div className="text-2xl mb-2">💰</div>
                        <div className="font-medium">Fixed Price</div>
                        <div className="text-sm text-gray-500">Pay a set amount for the entire project</div>
                      </div>
                    </label>
                    
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="budgetType"
                        value="hourly"
                        checked={formData.budgetType === "hourly"}
                        onChange={(e) => handleInputChange("budgetType", e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        formData.budgetType === "hourly" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <div className="text-2xl mb-2">⏰</div>
                        <div className="font-medium">Hourly Rate</div>
                        <div className="text-sm text-gray-500">Pay by the hour for ongoing work</div>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.budgetType === "fixed" ? (
                  <div>
                    <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget ($) *
                    </label>
                    <input
                      type="number"
                      id="budgetMin"
                      value={formData.budgetMin}
                      onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="5000"
                      min="1"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Rate ($/hour) *
                      </label>
                      <input
                        type="number"
                        id="budgetMin"
                        value={formData.budgetMin}
                        onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="25"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Rate ($/hour) *
                      </label>
                      <input
                        type="number"
                        id="budgetMax"
                        value={formData.budgetMax}
                        onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="50"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Requirements</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Experience Level *</label>
                  <div className="space-y-3">
                    {experienceLevels.map((level) => (
                      <label key={level.value} className="flex items-start cursor-pointer">
                        <input
                          type="radio"
                          name="experienceLevel"
                          value={level.value}
                          checked={formData.experienceLevel === level.value}
                          onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                          className="mt-1 text-green-600 focus:ring-green-500"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{level.label}</div>
                          <div className="text-sm text-gray-500">{level.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Duration *
                  </label>
                  <select
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select duration</option>
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      id="skills"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. JavaScript, React, Node.js"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Remote, New York, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Screening Questions */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Screening Questions (Optional)</h2>
              <p className="text-gray-600 mb-6">Add questions to help screen freelancers before they apply.</p>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addQuestion())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g. How many years of experience do you have with React?"
                  />
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Add Question
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.questions.map((question, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{question}</span>
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-end">
              <Link
                href="/jobs"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Publishing..." : "Publish Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}