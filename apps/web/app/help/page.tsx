"use client";
import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
    description: "Learn the basics of using KataKara"
  },
  {
    id: "freelancers",
    title: "For Freelancers",
    icon: "💻",
    description: "Tips and guides for freelancers"
  },
  {
    id: "clients",
    title: "For Clients",
    icon: "💼",
    description: "How to hire and manage projects"
  },
  {
    id: "payments",
    title: "Payments & Billing",
    icon: "💳",
    description: "Payment methods and billing questions"
  },
  {
    id: "safety",
    title: "Safety & Security",
    icon: "🛡️",
    description: "Trust and safety guidelines"
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: "⚙️",
    description: "Platform and technical issues"
  }
];

const faqData = {
  "getting-started": [
    {
      question: "How do I create an account on KataKara?",
      answer: "Click 'Sign Up' in the top right corner, choose whether you're a freelancer or client, fill in your details, and verify your email address."
    },
    {
      question: "Is KataKara free to use?",
      answer: "Yes, creating an account and browsing is free. We charge a small service fee only when you complete transactions on the platform."
    },
    {
      question: "What types of services can I find on KataKara?",
      answer: "KataKara offers services across multiple categories including web development, design, writing, marketing, data entry, and many more professional services."
    }
  ],
  "freelancers": [
    {
      question: "How do I create an attractive freelancer profile?",
      answer: "Include a professional photo, write a compelling bio, list your relevant skills, showcase your portfolio, and maintain a high completion rate."
    },
    {
      question: "How do I set my hourly rate?",
      answer: "Research market rates for your skills and experience level. You can always adjust your rates as you gain more experience and positive reviews."
    },
    {
      question: "How do I win more projects?",
      answer: "Submit personalized proposals, respond quickly to opportunities, maintain high-quality work, and build strong client relationships."
    }
  ],
  "clients": [
    {
      question: "How do I post a job?",
      answer: "Click 'Post a Job', describe your project requirements, set your budget, and review proposals from qualified freelancers."
    },
    {
      question: "How do I choose the right freelancer?",
      answer: "Review portfolios, check ratings and reviews, conduct interviews, and start with a small test project if needed."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "Communicate with your freelancer first. If issues persist, you can request revisions or contact our dispute resolution team."
    }
  ],
  "payments": [
    {
      question: "How does the payment system work?",
      answer: "Payments are held in escrow when you hire a freelancer. Funds are released when you approve the completed work."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, bank transfers, and various local payment methods depending on your location."
    },
    {
      question: "What are the fees?",
      answer: "Freelancers pay a service fee of 5-20% depending on their lifetime billings. Clients pay a small payment processing fee."
    }
  ],
  "safety": [
    {
      question: "How do you verify freelancers?",
      answer: "We verify identity documents, conduct background checks for certain categories, and monitor user behavior for safety."
    },
    {
      question: "What should I do if I encounter fraud?",
      answer: "Report suspicious activity immediately through our platform. Never share personal information or make payments outside the platform."
    },
    {
      question: "How do you protect my personal information?",
      answer: "We use industry-standard encryption, secure servers, and comply with privacy regulations like GDPR and CCPA."
    }
  ],
  "technical": [
    {
      question: "Why can't I log into my account?",
      answer: "Check your email and password, clear your browser cache, or try resetting your password. Contact support if issues persist."
    },
    {
      question: "How do I upload files to my project?",
      answer: "Use the file upload feature in the project workspace. Supported formats include images, documents, and compressed files up to 100MB."
    },
    {
      question: "The website is running slowly. What should I do?",
      answer: "Try refreshing the page, checking your internet connection, or clearing your browser cache. Contact support if problems continue."
    }
  ]
};

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const currentFAQs = faqData[selectedCategory as keyof typeof faqData] || [];
  const filteredFAQs = currentFAQs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-green-100 mb-8">
              Find answers to your questions and get the help you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border-0 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-25 text-lg"
                  placeholder="Search for help articles..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Help Topics</h2>
            <p className="text-gray-600">Quick access to the most common questions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-left p-6 rounded-xl border transition-all ${
                  selectedCategory === category.id
                    ? "bg-green-50 border-green-200 shadow-md"
                    : "bg-white border-gray-200 hover:border-green-200 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {categories.find(cat => cat.id === selectedCategory)?.title} - FAQ
              </h2>
              <p className="text-gray-600">
                {searchQuery ? `Search results for "${searchQuery}"` : "Frequently asked questions"}
              </p>
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        <span className={`transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching your search. Try different keywords or browse our categories.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-padding relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-60"></div>
        <div className="relative container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4 text-sm">Get instant help from our support team</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4 text-sm">Send us a detailed message</p>
                <Link 
                  href="/contact"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Send Email
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Base</h3>
                <p className="text-gray-600 mb-4 text-sm">Browse our detailed guides</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Browse Guides
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How to Write a Winning Proposal
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn the key elements of proposals that get accepted by clients.
                </p>
                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                  Read Article →
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Setting Up Your Payment Method
                </h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step guide to configuring secure payments.
                </p>
                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                  Read Article →
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Understanding KataKara Fees
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete breakdown of all fees and pricing on the platform.
                </p>
                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                  Read Article →
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Safety Tips for Freelancers
                </h3>
                <p className="text-gray-600 mb-4">
                  Best practices to stay safe while working on projects.
                </p>
                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                  Read Article →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

