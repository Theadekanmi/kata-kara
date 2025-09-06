// Security utilities for IP tracking and enhanced security measures

export interface SecurityLog {
  id: string;
  userId?: number;
  email?: string;
  ipAddress: string;
  userAgent: string;
  action: string;
  timestamp: Date;
  location?: {
    country: string;
    city: string;
    region: string;
  };
  suspicious: boolean;
  blocked: boolean;
}

export interface LoginAttempt {
  ipAddress: string;
  email: string;
  success: boolean;
  timestamp: Date;
}

class SecurityManager {
  private static instance: SecurityManager;
  private loginAttempts: Map<string, LoginAttempt[]> = new Map();
  private blockedIPs: Set<string> = new Set();
  private maxLoginAttempts = 5;
  private blockDuration = 15 * 60 * 1000; // 15 minutes

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  // Get client IP address
  async getClientIP(): Promise<string> {
    try {
      // In a real implementation, you'd get this from the request headers
      // For demo purposes, we'll use a mock IP or get it from a service
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      // Fallback to local IP detection
      return this.getLocalIP();
    }
  }

  private getLocalIP(): string {
    // Mock IP for demo purposes
    const mockIPs = ['192.168.1.100', '10.0.0.50', '172.16.0.25'];
    return mockIPs[Math.floor(Math.random() * mockIPs.length)];
  }

  // Get location from IP address
  async getLocationFromIP(ip: string): Promise<{ country: string; city: string; region: string } | null> {
    try {
      // In production, you'd use a real IP geolocation service
      // For demo, return mock location data
      const mockLocations = [
        { country: 'United States', city: 'New York', region: 'NY' },
        { country: 'United Kingdom', city: 'London', region: 'England' },
        { country: 'Canada', city: 'Toronto', region: 'ON' },
        { country: 'Australia', city: 'Sydney', region: 'NSW' },
        { country: 'Nigeria', city: 'Lagos', region: 'Lagos State' }
      ];
      
      return mockLocations[Math.floor(Math.random() * mockLocations.length)];
    } catch (error) {
      console.error('Failed to get location:', error);
      return null;
    }
  }

  // Track login attempt
  trackLoginAttempt(ipAddress: string, email: string, success: boolean): boolean {
    const attempt: LoginAttempt = {
      ipAddress,
      email,
      success,
      timestamp: new Date()
    };

    const key = `${ipAddress}_${email}`;
    const attempts = this.loginAttempts.get(key) || [];
    
    // Remove old attempts (older than 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentAttempts = attempts.filter(a => a.timestamp > oneHourAgo);
    
    recentAttempts.push(attempt);
    this.loginAttempts.set(key, recentAttempts);

    // Check if IP should be blocked
    if (!success) {
      const failedAttempts = recentAttempts.filter(a => !a.success);
      if (failedAttempts.length >= this.maxLoginAttempts) {
        this.blockIP(ipAddress);
        return false;
      }
    }

    return true;
  }

  // Block IP address
  blockIP(ipAddress: string): void {
    this.blockedIPs.add(ipAddress);
    
    // Auto-unblock after duration
    setTimeout(() => {
      this.blockedIPs.delete(ipAddress);
    }, this.blockDuration);

    // Log security event
    this.logSecurityEvent({
      id: this.generateId(),
      ipAddress,
      userAgent: navigator.userAgent,
      action: 'IP_BLOCKED',
      timestamp: new Date(),
      suspicious: true,
      blocked: true
    });
  }

  // Check if IP is blocked
  isIPBlocked(ipAddress: string): boolean {
    return this.blockedIPs.has(ipAddress);
  }

  // Log security event
  async logSecurityEvent(log: Partial<SecurityLog>): Promise<void> {
    const securityLog: SecurityLog = {
      id: log.id || this.generateId(),
      userId: log.userId,
      email: log.email,
      ipAddress: log.ipAddress || await this.getClientIP(),
      userAgent: log.userAgent || navigator.userAgent,
      action: log.action || 'UNKNOWN',
      timestamp: log.timestamp || new Date(),
      location: log.location || await this.getLocationFromIP(log.ipAddress || ''),
      suspicious: log.suspicious || false,
      blocked: log.blocked || false
    };

    // In production, send to backend
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "https://prowebnigeria.pythonanywhere.com";
      await fetch(`${base}/api/security/log/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(securityLog)
      });
    } catch (error) {
      // Store locally if backend is unavailable
      this.storeLocalSecurityLog(securityLog);
    }
  }

  // Store security log locally
  private storeLocalSecurityLog(log: SecurityLog): void {
    const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    logs.push(log);
    
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    localStorage.setItem('security_logs', JSON.stringify(logs));
  }

  // Detect suspicious activity
  detectSuspiciousActivity(action: string, context: any = {}): boolean {
    const suspiciousPatterns = [
      'rapid_requests',
      'invalid_tokens',
      'sql_injection_attempt',
      'xss_attempt',
      'unusual_user_agent',
      'multiple_failed_logins'
    ];

    // Simple pattern detection
    if (action.includes('failed_login')) {
      const attempts = context.recentAttempts || 0;
      return attempts > 3;
    }

    if (action.includes('request') && context.requestCount) {
      return context.requestCount > 100; // More than 100 requests in short time
    }

    return suspiciousPatterns.some(pattern => action.includes(pattern));
  }

  // Rate limiting
  private rateLimitMap: Map<string, { count: number; resetTime: number }> = new Map();

  checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = this.rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
      this.rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Device fingerprinting
  generateDeviceFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
    }

    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvas: canvas.toDataURL(),
      webgl: this.getWebGLFingerprint()
    };

    return btoa(JSON.stringify(fingerprint)).substring(0, 32);
  }

  private getWebGLFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return 'no-webgl';
      
      const renderer = gl.getParameter(gl.RENDERER);
      const vendor = gl.getParameter(gl.VENDOR);
      return `${vendor}-${renderer}`;
    } catch {
      return 'webgl-error';
    }
  }

  // Enhanced session validation
  validateSession(token: string): boolean {
    try {
      // In production, validate with backend
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  // Monitor for security headers
  checkSecurityHeaders(): { [key: string]: boolean } {
    const headers = {
      'Content-Security-Policy': false,
      'X-Frame-Options': false,
      'X-XSS-Protection': false,
      'X-Content-Type-Options': false,
      'Strict-Transport-Security': false
    };

    // In production, you'd check actual response headers
    // For demo, simulate checking
    Object.keys(headers).forEach(header => {
      headers[header] = Math.random() > 0.3; // 70% chance header is present
    });

    return headers;
  }
}

export const securityManager = SecurityManager.getInstance();

// Utility functions
export const trackUserAction = async (action: string, details: any = {}) => {
  const ipAddress = await securityManager.getClientIP();
  const suspicious = securityManager.detectSuspiciousActivity(action, details);
  
  await securityManager.logSecurityEvent({
    action,
    ipAddress,
    suspicious,
    ...details
  });
};

export const validateLogin = async (email: string, success: boolean) => {
  const ipAddress = await securityManager.getClientIP();
  
  if (securityManager.isIPBlocked(ipAddress)) {
    throw new Error('IP address is temporarily blocked due to suspicious activity');
  }

  const allowed = securityManager.trackLoginAttempt(ipAddress, email, success);
  
  if (!allowed) {
    throw new Error('Too many failed login attempts. Please try again later.');
  }

  await trackUserAction(success ? 'login_success' : 'login_failed', { email });
};

export const checkRateLimit = async (action: string, maxRequests: number = 100): Promise<boolean> => {
  const ipAddress = await securityManager.getClientIP();
  const identifier = `${ipAddress}_${action}`;
  
  return securityManager.checkRateLimit(identifier, maxRequests);
};

