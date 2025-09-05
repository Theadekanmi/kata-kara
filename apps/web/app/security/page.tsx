import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Trust - KataKara",
  description: "Learn about KataKara's security measures, data protection, and trust & safety features that keep our marketplace secure.",
};

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: "🔐",
      title: "SSL Encryption",
      description: "All data is encrypted in transit using industry-standard SSL/TLS protocols."
    },
    {
      icon: "🛡️",
      title: "Data Protection",
      description: "Your personal and financial information is protected with bank-level security."
    },
    {
      icon: "🔍",
      title: "Identity Verification",
      description: "We verify user identities to ensure authentic profiles and prevent fraud."
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "All payments are processed through PCI-compliant payment processors."
    },
    {
      icon: "🚨",
      title: "24/7 Monitoring",
      description: "Our security team monitors the platform around the clock for suspicious activity."
    },
    {
      icon: "📋",
      title: "Compliance",
      description: "We comply with GDPR, CCPA, and other international privacy regulations."
    }
  ];

  const trustSafetyMeasures = [
    {
      title: "Profile Verification",
      description: "All freelancers undergo identity verification before they can start working on projects.",
      icon: "✅"
    },
    {
      title: "Secure Escrow System",
      description: "Payments are held in escrow until work is completed and approved by the client.",
      icon: "🏦"
    },
    {
      title: "Rating & Review System",
      description: "Transparent feedback system helps maintain quality and accountability.",
      icon: "⭐"
    },
    {
      title: "Dispute Resolution",
      description: "Professional mediation services for resolving conflicts between parties.",
      icon: "⚖️"
    },
    {
      title: "Background Checks",
      description: "Optional enhanced background checks for sensitive projects.",
      icon: "🔍"
    },
    {
      title: "Insurance Coverage",
      description: "Optional insurance coverage for high-value projects.",
      icon: "🛡️"
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Security & Trust</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Your security and privacy are our top priorities. Learn about the measures we take to protect our community.
            </p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We implement multiple layers of security to protect your data and ensure safe transactions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="section-padding relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-60"></div>
        <div className="relative container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trust & Safety Measures</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Building trust through transparency, verification, and comprehensive safety measures.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trustSafetyMeasures.map((measure, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{measure.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{measure.title}</h3>
                </div>
                <p className="text-gray-600">{measure.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Protection & Privacy</h2>
              <p className="text-gray-600">
                We are committed to protecting your personal information and respecting your privacy rights.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Protect Your Data</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    End-to-end encryption for all sensitive data
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Regular security audits and penetration testing
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Secure data centers with physical access controls
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Employee background checks and security training
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Automated backup and disaster recovery systems
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Right to access your personal data
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Right to correct inaccurate information
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Right to delete your data (right to be forgotten)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Right to data portability
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Right to opt-out of data processing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Issues */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Report Security Issues</h2>
            <p className="text-gray-600 mb-8">
              If you discover a security vulnerability or have concerns about the safety of our platform, 
              please report it immediately. We take all security reports seriously.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Vulnerabilities</h3>
                <p className="text-gray-600 mb-4">
                  Report technical security issues or vulnerabilities
                </p>
                <a 
                  href="mailto:security@katakara.com" 
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Report Vulnerability
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trust & Safety Issues</h3>
                <p className="text-gray-600 mb-4">
                  Report fraudulent activity or safety concerns
                </p>
                <a 
                  href="mailto:safety@katakara.com" 
                  className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Report Safety Issue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
            <p className="text-gray-600">
              We maintain the highest security standards and comply with international regulations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-semibold text-gray-900">SOC 2 Type II</h3>
              </div>
              <p className="text-sm text-gray-600">Security, availability, and confidentiality</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold text-gray-900">PCI DSS</h3>
              </div>
              <p className="text-sm text-gray-600">Payment card data security</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <div className="text-3xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-900">GDPR</h3>
              </div>
              <p className="text-sm text-gray-600">European data protection</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-semibold text-gray-900">ISO 27001</h3>
              </div>
              <p className="text-sm text-gray-600">Information security management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

