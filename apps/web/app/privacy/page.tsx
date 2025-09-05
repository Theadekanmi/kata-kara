import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - KataKara",
  description: "Learn how KataKara collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, complete your profile,
                post a job, submit a proposal, or communicate with other users.
              </p>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Profile information (skills, experience, portfolio)</li>
                <li>Payment information (processed securely by our payment partners)</li>
                <li>Communication data (messages, reviews, feedback)</li>
              </ul>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP address and location data</li>
                <li>Device information and browser type</li>
                <li>Usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>With other users:</strong> Profile information is visible to help facilitate connections</li>
                <li><strong>With service providers:</strong> Third parties who provide services on our behalf</li>
                <li><strong>For legal reasons:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We take reasonable measures to help protect your personal information from loss, theft, misuse,
                unauthorized access, disclosure, alteration, and destruction. However, no internet or email
                transmission is ever fully secure or error-free.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-900 mb-2">Security Measures:</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-1">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect and track information and to improve our service.
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc pl-6 text-yellow-800 space-y-1">
                  <li>Essential cookies for site functionality</li>
                  <li>Analytics cookies to understand usage</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for relevant advertisements</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our service may contain links to third-party websites or services. We are not responsible for
                the privacy practices of these third parties. We encourage you to read their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our service is not intended for use by children under the age of 18. We do not knowingly collect
                personal information from children under 18. If you become aware that a child has provided us
                with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by
                posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

