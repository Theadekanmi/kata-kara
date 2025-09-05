import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Top Freelancers - KataKara Talent Marketplace",
  description: "Discover and hire the world's best freelancers. Browse profiles, view portfolios, and connect with top talent in every skill category.",
};

const categories = [
  {
    name: "Development & IT",
    count: "2,438 freelancers",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=400&auto=format&fit=crop",
    skills: ["JavaScript", "Python", "React", "Node.js", "AWS"]
  },
  {
    name: "Design & Creative",
    count: "1,829 freelancers", 
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop",
    skills: ["UI/UX", "Graphic Design", "Figma", "Photoshop", "Branding"]
  },
  {
    name: "Sales & Marketing",
    count: "1,205 freelancers",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", 
    skills: ["Digital Marketing", "SEO", "Content Marketing", "Social Media", "PPC"]
  },
  {
    name: "Writing & Translation",
    count: "967 freelancers",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&auto=format&fit=crop",
    skills: ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Editing"]
  },
  {
    name: "Data & Analytics",
    count: "743 freelancers",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
    skills: ["Data Analysis", "Machine Learning", "SQL", "Tableau", "Python"]
  },
  {
    name: "Finance & Accounting",
    count: "521 freelancers",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop",
    skills: ["Bookkeeping", "Financial Planning", "QuickBooks", "Tax Preparation", "Auditing"]
  }
];

const topFreelancers = [
  {
    name: "Alex Rodriguez",
    title: "Full-Stack Developer",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 127,
    hourlyRate: "$85/hr",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    description: "Senior full-stack developer with 8+ years building scalable web applications."
  },
  {
    name: "Sarah Kim",
    title: "UI/UX Designer", 
    location: "New York, NY",
    rating: 4.8,
    reviews: 89,
    hourlyRate: "$75/hr",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?q=80&w=150&auto=format&fit=crop",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    description: "Award-winning designer creating beautiful, user-centered digital experiences."
  },
  {
    name: "Michael Chen",
    title: "Data Scientist",
    location: "Austin, TX", 
    rating: 5.0,
    reviews: 156,
    hourlyRate: "$95/hr",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    description: "PhD in Computer Science specializing in AI and machine learning solutions."
  },
  {
    name: "Emily Johnson",
    title: "Content Marketing Strategist",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 203,
    hourlyRate: "$65/hr", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    skills: ["Content Strategy", "SEO", "Social Media", "Analytics"],
    description: "Marketing expert helping brands grow through strategic content and campaigns."
  }
];

export default function FreelancersPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Top Freelancers for Any Project
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Connect with skilled professionals from around the world. Browse portfolios, 
              read reviews, and hire the perfect freelancer for your next project.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex rounded-lg shadow-2xl overflow-hidden bg-white">
                <div className="relative flex flex-grow items-stretch">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for freelancers..."
                    className="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 border-0 text-lg"
                  />
                </div>
                <button
                  type="button"
                  className="px-8 py-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top-Rated Freelancers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Work with proven professionals who have delivered exceptional results for clients worldwide.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {topFreelancers.map((freelancer, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Image
                    src={freelancer.image}
                    alt={freelancer.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
                  <p className="text-green-600 font-medium">{freelancer.title}</p>
                  <p className="text-gray-500 text-sm">{freelancer.location}</p>
                </div>

                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-medium">{freelancer.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({freelancer.reviews} reviews)</span>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-xl font-bold text-gray-900">{freelancer.hourlyRate}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 text-center">{freelancer.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{freelancer.skills.length - 3}</span>
                  )}
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find freelancers by expertise and get your project done by specialists in their field.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/freelancers?category=${encodeURIComponent(category.name)}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 4 && (
                      <span className="text-xs text-gray-500">+{category.skills.length - 4} more</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-40"></div>
        <div className="relative container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Hire on KataKara</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple process makes it easy to find and work with the perfect freelancer.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-white/50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Search & Browse</h3>
              <p className="text-gray-600 leading-relaxed">
                Search for freelancers by skill, browse categories, or post a job and let them come to you.
              </p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-white/50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Interview & Hire</h3>
              <p className="text-gray-600 leading-relaxed">
                Review portfolios, conduct interviews, and choose the perfect freelancer for your project.
              </p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-white/50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Collaborate & Pay</h3>
              <p className="text-gray-600 leading-relaxed">
                Work together using our platform tools and pay securely when you're satisfied with the work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-green-600 text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Freelancer?</h2>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              Join thousands of businesses who trust KataKara to connect them with world-class talent. 
              Start your project today and see the difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/jobs/new" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Post a Job
              </Link>
              <Link 
                href="/auth/signup" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Browse Freelancers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
