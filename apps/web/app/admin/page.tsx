"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalEarnings: number;
  activeProjects: number;
  recentActivity: Array<{
    id: number;
    type: string;
    user: string;
    action: string;
    timestamp: string;
  }>;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalJobs: 0,
    totalEarnings: 0,
    activeProjects: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    checkAdminAccess();
    fetchAdminStats();
  }, []);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.is_staff && !user.is_superuser) {
      // Redirect non-admin users
      window.location.href = "/dashboard";
      return;
    }
  };

  const fetchAdminStats = async () => {
    try {
      const access = localStorage.getItem("access_token");
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://prowebnigeria.pythonanywhere.com";
      
      const response = await fetch(`${base}/api/admin/stats/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        // Mock data for demo
        setStats({
          totalUsers: 15847,
          totalJobs: 8952,
          totalEarnings: 2845700,
          activeProjects: 1205,
          recentActivity: [
            { id: 1, type: "user", user: "John Doe", action: "registered as freelancer", timestamp: "2 minutes ago" },
            { id: 2, type: "job", user: "TechCorp", action: "posted new job: React Developer", timestamp: "5 minutes ago" },
            { id: 3, type: "payment", user: "Sarah Johnson", action: "completed payment for $500", timestamp: "12 minutes ago" },
            { id: 4, type: "user", user: "Mike Chen", action: "verified identity", timestamp: "18 minutes ago" },
            { id: 5, type: "job", user: "DesignStudio", action: "hired freelancer for UI/UX project", timestamp: "25 minutes ago" }
          ]
        });
      }
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "jobs", label: "Jobs", icon: "💼" },
    { id: "payments", label: "Payments", icon: "💳" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage your KataKara platform</p>
            </div>
            <Link 
              href="/dashboard"
              className="text-green-600 hover:text-green-500 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container-max py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <span className="text-2xl">👥</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <span className="text-2xl">💼</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalJobs.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <span className="text-2xl">💰</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">${(stats.totalEarnings / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Projects</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeProjects.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {stats.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.type === "user" ? "bg-blue-100" :
                              activity.type === "job" ? "bg-green-100" :
                              "bg-yellow-100"
                            }`}>
                              <span className="text-lg">
                                {activity.type === "user" ? "👤" :
                                 activity.type === "job" ? "💼" : "💳"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <span className="font-semibold">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">👥</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
                    <p className="text-gray-600 mb-6">
                      Manage user accounts, verify identities, and handle user-related issues.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      View All Users
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Job Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">💼</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Management</h3>
                    <p className="text-gray-600 mb-6">
                      Monitor job postings, review flagged content, and manage job categories.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      View All Jobs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Management</h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">💳</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Management</h3>
                    <p className="text-gray-600 mb-6">
                      Handle payment disputes, process refunds, and monitor financial transactions.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      View Payments
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "reports" || activeTab === "settings") && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeTab === "reports" ? "Reports & Analytics" : "Platform Settings"}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">
                      {activeTab === "reports" ? "📈" : "⚙️"}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {activeTab === "reports" ? "Reports & Analytics" : "Platform Settings"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {activeTab === "reports" 
                        ? "Generate detailed reports and view platform analytics."
                        : "Configure platform settings, fees, and policies."
                      }
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      {activeTab === "reports" ? "View Reports" : "Manage Settings"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

