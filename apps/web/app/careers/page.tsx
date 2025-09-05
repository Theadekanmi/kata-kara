import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at KataKara - Join Our Mission",
  description: "Join our team and help shape the future of work. Explore open positions and build your career with KataKara.",
};

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Build and scale our marketplace platform using React, Node.js, and cloud technologies."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / New York", 
      type: "Full-time",
      description: "Drive product strategy and execution for our freelancer and client experiences."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / Austin",
      type: "Full-time",
      description: "Design beautiful, intuitive experiences that connect talent with opportunity."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Los Angeles",
      type: "Full-time",
      description: "Lead growth marketing initiatives and build our brand presence globally."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Chicago",
      type: "Full-time",
      description: "Ensure our enterprise clients achieve success on our platform."
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Remote / Seattle",
      type: "Full-time",
      description: "Use data to improve matching algorithms and platform recommendations."
    }
  ];

  const benefits = [
    {
      title: "Competitive Salary & Equity",
      description: "Market-competitive compensation with meaningful equity ownership.",
      icon: "💰"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness stipend.",
      icon: "🏥"
    },
    {
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and quarterly team retreats.",
      icon: "🌍"
    },
    {
      title: "Learning & Development",
      description: "$2,000 annual learning budget for courses, conferences, and books.",
      icon: "📚"
    },
    {
      title: "Unlimited PTO",
      description: "Take the time you need to recharge with our unlimited vacation policy.",
      icon: "🏖️"
    },
    {
      title: "Latest Equipment",
      description: "MacBook Pro, monitor, and $500 home office setup allowance.",
      icon: "💻"
    }
  ];

  const values = [
    {
      title: "Empowerment",
      description: "We believe in giving people the tools and autonomy to do their best work."
    },
    {
      title: "Innovation",
      description: "We're constantly pushing boundaries to solve complex problems."
    },
    {
      title: "Diversity",
      description: "We celebrate different perspectives and backgrounds."
    },
    {
      title: "Impact",
      description: "Everything we do is focused on creating meaningful change."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Shape the Future of Work
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join our mission to democratize opportunity and connect talent with meaningful work. 
              We're building something extraordinary, and we want you to be part of it.
            </p>
            <Link 
              href="#openings" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work Here Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why KataKara?</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At KataKara, you're not just joining a company – you're joining a movement to transform 
                  how the world works. We're building the infrastructure for the future economy, where 
                  talent and opportunity connect without barriers.
                </p>
                <p>
                  Our team is passionate, diverse, and committed to making a real impact. We move fast, 
                  think big, and always put our users first. If you're excited about solving complex 
                  problems and creating solutions that matter, you'll love it here.
                </p>
                <p>
                  We're backed by top investors and growing rapidly, but we've maintained our startup 
                  culture of innovation, collaboration, and continuous learning.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                alt="Team collaboration"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These values guide how we work, make decisions, and treat each other.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our growing team and help us build the future of work.
            </p>
          </div>
          
          <div className="space-y-6">
            {openings.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-3">
                      <span className="flex items-center">
                        <span className="mr-1">📍</span>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏰</span>
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see a position that fits? We're always looking for exceptional talent.
            </p>
            <Link 
              href="/contact" 
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Get in touch with us →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-green-600 text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Mission?</h2>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              Help us build the platform that's changing how the world works. Apply today and 
              be part of something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#openings" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Browse Open Roles
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Contact Recruiting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

