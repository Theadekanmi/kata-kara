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

type Settings = {
  account: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    timezone: string;
    language: string;
  };
  notifications: {
    emailNewMessages: boolean;
    emailJobAlerts: boolean;
    emailMarketing: boolean;
    pushNewMessages: boolean;
    pushJobDeadlines: boolean;
    pushPayments: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "freelancers";
    showEmail: boolean;
    showPhone: boolean;
    showOnlineStatus: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: number;
  };
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

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
      
      // Mock settings data
      setSettings({
        account: {
          email: userData.email,
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          phone: "+234 801 234 5678",
          timezone: "Africa/Lagos",
          language: "English"
        },
        notifications: {
          emailNewMessages: true,
          emailJobAlerts: true,
          emailMarketing: false,
          pushNewMessages: true,
          pushJobDeadlines: true,
          pushPayments: true
        },
        privacy: {
          profileVisibility: "public",
          showEmail: false,
          showPhone: false,
          showOnlineStatus: true
        },
        security: {
          twoFactorAuth: false,
          loginAlerts: true,
          sessionTimeout: 30
        }
      });
    }
  }, []);

  const handleSave = async (section: string) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveMessage(`${section} settings saved successfully!`);
    setIsSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authStateChanged"));
    window.location.href = "/";
  };

  if (!user || !settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "account", label: "Account", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
    { id: "security", label: "Security", icon: "🛡️" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
            </div>
            <Link
              href="/profile"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {saveMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                {saveMessage}
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                  <p className="text-gray-600 mt-1">Update your personal information and preferences</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        defaultValue={settings.account.firstName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        defaultValue={settings.account.lastName}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      defaultValue={settings.account.email}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      defaultValue={settings.account.phone}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="ha">Hausa</option>
                        <option value="yo">Yoruba</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleSave("Account")}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="text-gray-600 mt-1">Choose how you want to be notified</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: "emailNewMessages", label: "New messages", description: "Get notified when you receive new messages" },
                        { key: "emailJobAlerts", label: "Job alerts", description: "Receive notifications about new job opportunities" },
                        { key: "emailMarketing", label: "Marketing emails", description: "Promotional content and platform updates" }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={settings.notifications[item.key as keyof typeof settings.notifications]}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: "pushNewMessages", label: "New messages", description: "Instant notifications for new messages" },
                        { key: "pushJobDeadlines", label: "Job deadlines", description: "Reminders about upcoming project deadlines" },
                        { key: "pushPayments", label: "Payments", description: "Notifications about payments and invoices" }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={settings.notifications[item.key as keyof typeof settings.notifications]}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleSave("Notification")}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isSaving ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                  <p className="text-gray-600 mt-1">Control your profile visibility and data sharing</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Visibility
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option value="public">Public - Visible to everyone</option>
                      <option value="freelancers">Freelancers only - Visible to other freelancers</option>
                      <option value="private">Private - Only visible to you</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Contact Information Visibility</h3>
                    {[
                      { key: "showEmail", label: "Show email address", description: "Allow others to see your email on your profile" },
                      { key: "showPhone", label: "Show phone number", description: "Display your phone number publicly" },
                      { key: "showOnlineStatus", label: "Show online status", description: "Let others see when you're online" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={settings.privacy[item.key as keyof typeof settings.privacy]}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleSave("Privacy")}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isSaving ? "Saving..." : "Save Privacy Settings"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                    <p className="text-gray-600 mt-1">Manage your account security and authentication</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        { key: "twoFactorAuth", label: "Two-Factor Authentication", description: "Add an extra layer of security to your account", critical: true },
                        { key: "loginAlerts", label: "Login Alerts", description: "Get notified when someone logs into your account" }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 flex items-center">
                              {item.label}
                              {item.critical && <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Recommended</span>}
                            </p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={settings.security[item.key as keyof typeof settings.security]}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={240}>4 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>

                    <div className="pt-4 flex space-x-4">
                      <button
                        onClick={() => handleSave("Security")}
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        {isSaving ? "Saving..." : "Save Security Settings"}
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-xl shadow-sm border border-red-200">
                  <div className="p-6 border-b border-red-200">
                    <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
                    <p className="text-red-600 mt-1">Actions that cannot be undone</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Log out of all devices</p>
                        <p className="text-sm text-gray-600">This will log you out of all devices and sessions</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Log Out All
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-red-200">
                      <div>
                        <p className="font-medium text-red-900">Delete Account</p>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Delete Account
                      </button>
                    </div>
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

