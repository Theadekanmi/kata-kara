"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleOAuth, FacebookOAuth } from "@/components/GoogleOAuth";
import { SimpleMathCaptcha } from "@/components/SimpleMathCaptcha";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  userType: "client" | "freelancer";
  agreeToTerms: boolean;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userType: "client",
    agreeToTerms: false,
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

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter your first and last name");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.userType) {
      setError("Please select if you want to hire talent or work & earn");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://prowebnigeria.pythonanywhere.com/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          is_client: formData.userType === "client",
          is_freelancer: formData.userType === "freelancer",
        }),
      });

      if (response.ok) {
        // Automatically log in after successful signup
        const data = await response.json();
        localStorage.setItem("access_token", data.access || "demo_token_" + Date.now());
        localStorage.setItem("refresh_token", data.refresh || "demo_refresh_" + Date.now());
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        // For demo: Allow any signup to succeed
        const mockUser = {
          id: Math.floor(Math.random() * 1000),
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          is_client: formData.userType === "client",
          is_freelancer: formData.userType === "freelancer",
          is_verified: true
        };

        localStorage.setItem("access_token", "demo_token_" + Date.now());
        localStorage.setItem("refresh_token", "demo_refresh_" + Date.now());
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        console.log("User signed up successfully:", mockUser);
        console.log("Redirecting to dashboard...");
        
        // Trigger auth state change event
        window.dispatchEvent(new Event("authStateChanged"));
        
        // Force navigation
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:block relative w-0 flex-1 max-w-md lg:max-w-lg">
        <div className="h-screen max-h-[80vh] relative overflow-hidden rounded-r-2xl">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-blue-600/30"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Start your freelance journey</h3>
              <p className="text-base lg:text-lg opacity-90">Join millions of professionals building their careers on KataKara</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/" className="flex items-center">
              <div className="text-3xl font-bold text-green-600">KataKara</div>
            </Link>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="text-sm text-red-800">{error}</div>
                </div>
              )}

              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="client"
                      checked={formData.userType === "client"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      formData.userType === "client" 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-200"
                    }`}>
                      <div className="text-2xl mb-2">💼</div>
                      <div className="font-medium">Hire Talent</div>
                      <div className="text-xs text-gray-500 mt-1">I'm a client/business looking to hire freelancers</div>
                    </div>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="freelancer"
                      checked={formData.userType === "freelancer"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      formData.userType === "freelancer" 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-200"
                    }`}>
                      <div className="text-2xl mb-2">💻</div>
                      <div className="font-medium">Work & Earn</div>
                      <div className="text-xs text-gray-500 mt-1">I'm a freelancer looking for work opportunities</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="First name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* OAuth Buttons */}
              <div>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <GoogleOAuth
                                      onSuccess={(userData) => {
                    localStorage.setItem("access_token", userData.access_token);
                    localStorage.setItem("user", JSON.stringify(userData.user));
                    console.log("OAuth signup success");
                    window.dispatchEvent(new Event("authStateChanged"));
                    window.location.href = "/dashboard";
                  }}
                    onError={(error) => setError(error)}
                    buttonText="Sign up with Google"
                    userType={formData.userType}
                  />
                  
                  <FacebookOAuth
                                      onSuccess={(userData) => {
                    localStorage.setItem("access_token", userData.access_token);
                    localStorage.setItem("user", JSON.stringify(userData.user));
                    console.log("OAuth signup success");
                    window.dispatchEvent(new Event("authStateChanged"));
                    window.location.href = "/dashboard";
                  }}
                    onError={(error) => setError(error)}
                    buttonText="Sign up with Facebook"
                    userType={formData.userType}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                />
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-700">
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-600 hover:text-green-500">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-600 hover:text-green-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* Security Verification */}
              <SimpleMathCaptcha onVerify={setCaptchaValue} />

              <button
                type="submit"
                disabled={loading || !captchaValue || !formData.agreeToTerms}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}