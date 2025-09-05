import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - KataKara",
  description: "Learn about how KataKara uses cookies and similar technologies to improve your experience.",
};

export default function CookiesPage() {
  return (
    <div className="bg-white">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KataKara uses cookies for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To keep you signed in to your account</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how our website is used</li>
                <li>To provide personalized content and advertisements</li>
                <li>To improve our services and user experience</li>
                <li>To prevent fraud and enhance security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-blue-900 mb-3">Essential Cookies</h3>
                  <p className="text-blue-800 mb-3">
                    These cookies are necessary for the website to function and cannot be switched off in our systems.
                  </p>
                  <ul className="list-disc pl-6 text-blue-800 space-y-1">
                    <li>Authentication cookies (keeping you logged in)</li>
                    <li>Security cookies (preventing fraud)</li>
                    <li>Load balancing cookies (distributing traffic)</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-green-900 mb-3">Performance Cookies</h3>
                  <p className="text-green-800 mb-3">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 text-green-800 space-y-1">
                    <li>Google Analytics cookies</li>
                    <li>Page load time measurement</li>
                    <li>Error tracking and debugging</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-yellow-900 mb-3">Functionality Cookies</h3>
                  <p className="text-yellow-800 mb-3">
                    These cookies enable the website to provide enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc pl-6 text-yellow-800 space-y-1">
                    <li>Language preferences</li>
                    <li>Theme and display settings</li>
                    <li>Form data temporary storage</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-purple-900 mb-3">Marketing Cookies</h3>
                  <p className="text-purple-800 mb-3">
                    These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                  </p>
                  <ul className="list-disc pl-6 text-purple-800 space-y-1">
                    <li>Google Ads tracking</li>
                    <li>Social media advertising pixels</li>
                    <li>Retargeting campaigns</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We also use third-party services that may set their own cookies:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google Ads:</strong> For advertising and remarketing campaigns</li>
                  <li><strong>Facebook Pixel:</strong> For social media advertising</li>
                  <li><strong>Stripe:</strong> For payment processing (essential for transactions)</li>
                  <li><strong>Intercom:</strong> For customer support chat functionality</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings preferences. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete cookies when you close your browser</li>
                <li>Get notifications when cookies are set</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Cookie Consent Management</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you first visit our website, you'll see a cookie consent banner where you can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your cookie preferences</li>
                <li>Learn more about each cookie category</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Different cookies have different lifespans:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                  <li><strong>Authentication Cookies:</strong> Usually expire after 30 days of inactivity</li>
                  <li><strong>Analytics Cookies:</strong> Typically expire after 2 years</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you choose to disable cookies, some features of our website may not work as intended:
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <ul className="list-disc pl-6 text-orange-800 space-y-2">
                  <li>You may need to log in repeatedly</li>
                  <li>Your preferences won't be saved</li>
                  <li>Some personalized features may not work</li>
                  <li>Website performance analytics won't function</li>
                  <li>You may see less relevant advertisements</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational,
                legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: privacy@katakara.com</p>
                <p className="text-gray-700">Address: Privacy Officer, KataKara Inc.</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

