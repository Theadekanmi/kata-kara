"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type User = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_client: boolean;
  is_freelancer: boolean;
  is_verified: boolean;
};

type Profile = {
  bio: string;
  skills: string[];
  hourlyRate: number;
  location: string;
  languages: string[];
  experience: string;
  portfolio: Array<{
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
  stats: {
    jobsCompleted: number;
    clientSatisfaction: number;
    totalEarnings: number;
    responseTime: string;
  };
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      
      // Mock profile data
      setProfile({
        bio: "Experienced full-stack developer with 5+ years of expertise in React, Node.js, and modern web technologies. Passionate about creating beautiful, user-friendly applications that solve real-world problems.",
        skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "MongoDB", "PostgreSQL", "AWS"],
        hourlyRate: 45,
        location: "Lagos, Nigeria",
        languages: ["English", "French", "Hausa"],
        experience: "5+ years",
        portfolio: [
          {
            title: "E-commerce Platform",
            description: "Full-stack e-commerce solution built with React and Node.js",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
            link: "#"
          },
          {
            title: "Task Management App",
            description: "React Native mobile app for project management",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
            link: "#"
          },
          {
            title: "Analytics Dashboard",
            description: "Real-time data visualization dashboard using D3.js",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
            link: "#"
          }
        ],
        stats: {
          jobsCompleted: 47,
          clientSatisfaction: 98,
          totalEarnings: 15420,
          responseTime: "< 2 hours"
        }
      });
    }
  }, []);

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "settings", label: "Settings", icon: "⚙️" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user.first_name?.[0] || user.email?.[0] || 'U'}
                </div>
              </div>
              {user.is_verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="text-white mb-4">
              <h1 className="text-3xl font-bold">
                {user.first_name} {user.last_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-xl opacity-90">
                {user.is_freelancer ? "Freelancer" : "Client"} • {profile.location}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>4.9 (23 reviews)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>💰</span>
                  <span>${profile.hourlyRate}/hr</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🏆</span>
                  <span>{profile.stats.jobsCompleted} jobs completed</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="ml-auto mb-4 flex space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            <Link
              href="/messages"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Message
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "overview" && (
              <>
                {/* About Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">About</h3>
                  {isEditing ? (
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                      defaultValue={profile.bio}
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Experience</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold">Senior Full Stack Developer</h4>
                      <p className="text-gray-600">TechCorp Ltd • 2021 - Present</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Leading development of enterprise web applications using React and Node.js
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold">Frontend Developer</h4>
                      <p className="text-gray-600">StartupXYZ • 2019 - 2021</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Built responsive web applications and improved user experience
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.portfolio.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <a
                          href={item.link}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          View Project →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Client Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                          JD
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">John Doe</h4>
                            <div className="flex text-yellow-500">
                              {"⭐".repeat(5)}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            "Excellent work! Delivered exactly what was needed on time and with great attention to detail."
                          </p>
                          <span className="text-xs text-gray-500">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Jobs Completed</span>
                  <span className="font-semibold">{profile.stats.jobsCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Client Satisfaction</span>
                  <span className="font-semibold">{profile.stats.clientSatisfaction}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-semibold">${profile.stats.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{profile.stats.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Languages Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              <div className="space-y-2">
                {profile.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{language}</span>
                    <span className="text-sm text-gray-500">Fluent</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <Link
                  href="/messages"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
                >
                  Send Message
                </Link>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  Save Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}