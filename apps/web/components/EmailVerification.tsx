"use client";
import { useState, useEffect } from "react";

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

export function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://prowebnigeria.pythonanywhere.com";
      const response = await fetch(`${base}/api/auth/verify-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verification_code: verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onVerified();
        }, 2000);
      } else {
        setError(data.detail || "Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);
    setError("");

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://prowebnigeria.pythonanywhere.com";
      const response = await fetch(`${base}/api/auth/resend-verification/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setResendTimer(60); // 60 second cooldown
        alert("Verification code sent! Check your email.");
      } else {
        setError("Failed to resend code. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Verified!
          </h2>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. Redirecting you to the platform...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            We've sent a verification code to <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleVerification} className="space-y-6">
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the 6-digit code from your email
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || verificationCode.length !== 6}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Didn't receive the code?
          </p>
          <button
            onClick={resendCode}
            disabled={loading || resendTimer > 0}
            className="text-green-600 hover:text-green-500 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? <a href="/contact" className="text-green-600 hover:text-green-500">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}

