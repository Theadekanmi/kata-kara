import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - KataKara",
  description: "Read our terms of service and user agreements for using KataKara marketplace.",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using KataKara ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of KataKara's materials for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the Platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                You are responsible for safeguarding the password and for maintaining the confidentiality of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All payments are processed securely through our payment partners. KataKara uses an escrow system to protect both clients and freelancers.
                Payments are released to freelancers upon completion and approval of work.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The information on this Platform is provided on an 'as is' basis. To the fullest extent permitted by law,
                KataKara excludes all representations, warranties, conditions and terms whether express or implied,
                statutory or otherwise, to the fullest extent permitted by applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In no event shall KataKara or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on KataKara's Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Revisions and Errata</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The materials appearing on KataKara's Platform could include technical, typographical, or photographic errors.
                KataKara does not warrant that any of the materials on its Platform are accurate, complete, or current.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: legal@katakara.com</p>
                <p className="text-gray-700">Address: Legal Department, KataKara Inc.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

