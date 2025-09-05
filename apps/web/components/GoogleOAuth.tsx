"use client";
import { useState } from "react";

// Helper function to create OAuth popup
const createOAuthPopup = (provider: string): Window | null => {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2.5;
  
  const popup = window.open(
    '',
    `${provider}_oauth`,
    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
  
  // Check if popup was blocked
  if (!popup) {
    return null;
  }
  
  // Additional check for popup blocker
  try {
    popup.focus();
  } catch (e) {
    return null;
  }
  
  return popup;
};

// Simulate OAuth flow with realistic popup
const simulateOAuthFlow = (popup: Window | null, provider: string): Promise<any> => {
  return new Promise((resolve) => {
    if (!popup) {
      resolve({ success: false, error: "Popup blocked" });
      return;
    }

    // Create realistic OAuth simulation page
    const oauthHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${provider === 'google' ? 'Sign in with Google' : 'Continue with Facebook'}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: ${provider === 'google' ? '#f8f9fa' : '#4267B2'};
              color: ${provider === 'google' ? '#333' : '#fff'};
            }
            .container {
              max-width: 400px;
              margin: 50px auto;
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              text-align: center;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: ${provider === 'google' ? '#4285f4' : '#4267B2'};
            }
            h2 {
              color: #333;
              margin-bottom: 20px;
            }
            .user-info {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .avatar {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin: 0 auto 10px;
              background: linear-gradient(45deg, #4285f4, #34a853);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: bold;
            }
            button {
              background: ${provider === 'google' ? '#4285f4' : '#4267B2'};
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              margin: 10px;
              min-width: 120px;
            }
            button:hover {
              opacity: 0.9;
            }
            .cancel {
              background: #6c757d;
            }
            .loading {
              display: none;
              text-align: center;
              padding: 20px;
            }
            .spinner {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #4285f4;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              animation: spin 1s linear infinite;
              margin: 0 auto 10px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">${provider === 'google' ? 'Google' : 'Facebook'}</div>
            <h2>Sign in to continue to KataKara</h2>
            
            <div class="user-info">
              <div class="avatar">JD</div>
              <div><strong>John Doe</strong></div>
              <div>john.doe@${provider === 'google' ? 'gmail.com' : 'facebook.com'}</div>
            </div>
            
            <p>KataKara wants to access your basic profile information.</p>
            
            <div id="buttons">
              <button onclick="allowAccess()">Continue</button>
              <button class="cancel" onclick="denyAccess()">Cancel</button>
            </div>
            
            <div class="loading" id="loading">
              <div class="spinner"></div>
              <p>Signing you in...</p>
            </div>
          </div>
          
          <script>
            function allowAccess() {
              document.getElementById('buttons').style.display = 'none';
              document.getElementById('loading').style.display = 'block';
              
              setTimeout(() => {
                window.postMessage({
                  type: 'oauth_success',
                  provider: '${provider}',
                  data: {
                    email: 'john.doe@${provider === 'google' ? 'gmail.com' : 'facebook.com'}',
                    name: 'John Doe',
                    picture: 'https://via.placeholder.com/150',
                    id: '${Date.now()}'
                  }
                }, '*');
                window.close();
              }, 2000);
            }
            
            function denyAccess() {
              window.postMessage({
                type: 'oauth_error',
                error: 'User cancelled authorization'
              }, '*');
              window.close();
            }
          </script>
        </body>
      </html>
    `;

    popup.document.write(oauthHtml);
    popup.document.close();

    // Listen for messages from popup
    const messageHandler = (event: MessageEvent) => {
      if (event.source !== popup) return;
      
      if (event.data.type === 'oauth_success') {
        window.removeEventListener('message', messageHandler);
        resolve({
          success: true,
          email: event.data.data.email,
          name: event.data.data.name,
          picture: event.data.data.picture,
          id: event.data.data.id
        });
      } else if (event.data.type === 'oauth_error') {
        window.removeEventListener('message', messageHandler);
        resolve({
          success: false,
          error: event.data.error
        });
      }
    };

    window.addEventListener('message', messageHandler);

    // Handle popup closed manually
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageHandler);
        resolve({
          success: false,
          error: 'Popup closed by user'
        });
      }
    }, 1000);
  });
};

interface GoogleOAuthProps {
  onSuccess: (userData: any) => void;
  onError: (error: string) => void;
  buttonText?: string;
  userType?: "client" | "freelancer";
}

export function GoogleOAuth({ 
  onSuccess, 
  onError, 
  buttonText = "Continue with Google",
  userType 
}: GoogleOAuthProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      // Create OAuth popup
      const popup = createOAuthPopup('google');
      
      if (!popup) {
        onError("Popup was blocked. Please allow popups for this site and try again.");
        return;
      }
      
      // Simulate OAuth flow
      const result = await simulateOAuthFlow(popup, 'google');
      
      if (result.success) {
        // Process successful OAuth
        const userData = {
          access_token: `google_token_${Date.now()}`,
          refresh_token: `google_refresh_${Date.now()}`,
          user: {
            id: Math.floor(Math.random() * 1000),
            email: result.email,
            first_name: result.name.split(' ')[0],
            last_name: result.name.split(' ')[1] || '',
            is_verified: true,
            provider: "google",
            avatar: result.picture
          }
        };

        localStorage.setItem("access_token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        
        console.log("OAuth success:", userData);
        
        onSuccess(userData);
      } else {
        onError(result.error || "Google sign-in was cancelled");
      }
    } catch (error) {
      onError("Failed to initialize Google sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
      ) : (
        <>
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
}

// Facebook OAuth Component
export function FacebookOAuth({ 
  onSuccess, 
  onError, 
  buttonText = "Continue with Facebook",
  userType 
}: GoogleOAuthProps) {
  const [loading, setLoading] = useState(false);

  const handleFacebookSignIn = async () => {
    setLoading(true);
    
    try {
      // Create OAuth popup
      const popup = createOAuthPopup('facebook');
      
      if (!popup) {
        onError("Popup was blocked. Please allow popups for this site and try again.");
        return;
      }
      
      // Simulate OAuth flow
      const result = await simulateOAuthFlow(popup, 'facebook');
      
      if (result.success) {
        // Process successful OAuth
        const userData = {
          access_token: `facebook_token_${Date.now()}`,
          refresh_token: `facebook_refresh_${Date.now()}`,
          user: {
            id: Math.floor(Math.random() * 1000),
            email: result.email,
            first_name: result.name.split(' ')[0],
            last_name: result.name.split(' ')[1] || '',
            is_verified: true,
            provider: "facebook",
            avatar: result.picture
          }
        };

        localStorage.setItem("access_token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        
        console.log("OAuth success:", userData);
        
        onSuccess(userData);
      } else {
        onError(result.error || "Facebook sign-in was cancelled");
      }
    } catch (error) {
      onError("Failed to initialize Facebook sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFacebookSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
      ) : (
        <>
          <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
}
