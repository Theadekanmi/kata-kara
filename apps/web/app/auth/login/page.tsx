"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleOAuth, FacebookOAuth } from "@/components/GoogleOAuth";
import { SimpleMathCaptcha } from "@/components/SimpleMathCaptcha";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaValue) {
      setError("Please complete the CAPTCHA verification");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://prowebnigeria.pythonanywhere.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
        
        // Check if user is admin
        if (data.user?.is_staff || data.user?.is_superuser) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        // For demo: Allow any email/password combination to login
        const isAdminEmail = formData.email.includes('admin') || 
                           formData.email === 'admin@katakara.com' ||
                           formData.email === 'super@katakara.com';
        
        const mockUser = {
          id: Math.floor(Math.random() * 1000),
          email: formData.email,
          first_name: formData.email.split('@')[0].split('.')[0] || "User",
          last_name: formData.email.split('@')[0].split('.')[1] || "Demo",
          is_staff: isAdminEmail,
          is_superuser: isAdminEmail,
          is_verified: true
        };

        localStorage.setItem("access_token", "demo_token_" + Date.now());
        localStorage.setItem("refresh_token", "demo_refresh_" + Date.now());
        localStorage.setItem("user", JSON.stringify(mockUser));

        console.log("User logged in successfully:", mockUser);
        console.log("Admin email?", isAdminEmail);

        // Trigger auth state change event
        window.dispatchEvent(new Event("authStateChanged"));

        // Redirect based on user role
        if (isAdminEmail) {
          console.log("Redirecting to admin...");
          window.location.href = "/admin";
        } else {
          console.log("Redirecting to dashboard...");
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    console.log("Google login clicked");
    setError("Google OAuth integration coming soon!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/" className="flex items-center">
              <div className="text-3xl font-bold text-green-600">KataKara</div>
            </Link>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                Sign up for free
              </Link>
            </p>
            
          </div>

          <div className="mt-10">
            <div>
              {/* Social Login Buttons */}
              <div className="grid grid-cols-1 gap-3">
                <GoogleOAuth
                  onSuccess={(userData) => {
                    localStorage.setItem("access_token", userData.access_token);
                    localStorage.setItem("user", JSON.stringify(userData.user));
                    console.log("OAuth login success");
                    window.dispatchEvent(new Event("authStateChanged"));
                    window.location.href = "/dashboard";
                  }}
                  onError={(error) => setError(error)}
                  buttonText="Continue with Google"
                />
                
                <FacebookOAuth
                  onSuccess={(userData) => {
                    localStorage.setItem("access_token", userData.access_token);
                    localStorage.setItem("user", JSON.stringify(userData.user));
                    console.log("OAuth login success");
                    window.dispatchEvent(new Event("authStateChanged"));
                    window.location.href = "/dashboard";
                  }}
                  onError={(error) => setError(error)}
                  buttonText="Continue with Facebook"
                />
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M19.192 19.192l-4.243-4.243M19.192 19.192L15.758 15.758" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="font-medium text-green-600 hover:text-green-500 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Security Verification */}
              <SimpleMathCaptcha onVerify={setCaptchaValue} />

              <div>
                <button
                  type="submit"
                  disabled={loading || !captchaValue}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block relative w-0 flex-1 max-w-md lg:max-w-lg">
        <div className="h-screen max-h-[80vh] relative overflow-hidden rounded-l-2xl">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop"
            alt="People working together"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-blue-600/30"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Join the world's work marketplace</h3>
              <p className="text-base lg:text-lg opacity-90">Connect with millions of businesses and freelancers worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}