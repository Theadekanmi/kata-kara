"use client";
import { useState, useEffect } from "react";

export default function TestAuthPage() {
  const [authData, setAuthData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    
    setAuthData({
      token: token ? "Present" : "Missing",
      tokenLength: token?.length || 0,
      user: user ? JSON.parse(user) : null,
      userStr: user
    });
  }, []);

  const testLogin = () => {
    const mockUser = {
      id: 123,
      email: "test@example.com",
      first_name: "Test",
      last_name: "User",
      is_client: false,
      is_freelancer: true,
      is_verified: true
    };

    localStorage.setItem("access_token", "test_token_" + Date.now());
    localStorage.setItem("user", JSON.stringify(mockUser));
    
    console.log("Test login complete");
    window.dispatchEvent(new Event("authStateChanged"));
    window.location.href = "/dashboard";
  };

  const clearAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setAuthData(null);
    window.dispatchEvent(new Event("authStateChanged"));
    console.log("Auth cleared");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(authData, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-4">
              <button
                onClick={testLogin}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium"
              >
                Test Login → Dashboard
              </button>
              
              <button
                onClick={clearAuth}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium"
              >
                Clear Auth
              </button>
              
              <a
                href="/auth/login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium text-center"
              >
                Go to Login
              </a>
              
              <a
                href="/auth/signup"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium text-center"
              >
                Go to Signup
              </a>
              
              <a
                href="/dashboard"
                className="block w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium text-center"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Debug Console</h2>
          <p className="text-gray-600">Open browser console to see authentication logs.</p>
          <p className="text-sm text-gray-500 mt-2">
            Check Network tab for any failed requests.
          </p>
        </div>
      </div>
    </div>
  );
}
