import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "KataKara - World's Work Marketplace for Freelancers & Businesses",
  description: "Connect businesses with independent professionals and agencies around the globe. Where companies and freelancers work together in new ways that unlock their potential.",
  openGraph: {
    title: "KataKara - World's Work Marketplace for Freelancers & Businesses",
    description: "Connect with top freelancers and agencies worldwide. Get quality work done faster.",
  },
};

const categories = [
  { 
    name: "Development & IT", 
    icon: "💻", 
    jobs: "2,438 jobs posted",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=800&auto=format&fit=crop",
    skills: ["JavaScript", "Python", "React", "Node.js"]
  },
  { 
    name: "Design & Creative", 
    icon: "🎨", 
    jobs: "1,829 jobs posted",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    skills: ["UI/UX", "Graphic Design", "Photoshop", "Figma"]
  },
  { 
    name: "Sales & Marketing", 
    icon: "📈", 
    jobs: "1,205 jobs posted",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    skills: ["Digital Marketing", "SEO", "Social Media", "Content Marketing"]
  },
  { 
    name: "Writing & Translation", 
    icon: "✍️", 
    jobs: "967 jobs posted",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
    skills: ["Content Writing", "Copywriting", "Translation", "Proofreading"]
  },
  { 
    name: "Admin & Customer Support", 
    icon: "📞", 
    jobs: "743 jobs posted",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    skills: ["Virtual Assistant", "Data Entry", "Customer Service", "Project Management"]
  },
  { 
    name: "Finance & Accounting", 
    icon: "💰", 
    jobs: "521 jobs posted",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    skills: ["Bookkeeping", "Financial Analysis", "Tax Preparation", "QuickBooks"]
  },
];

const stats = [
  { label: "Registered Users", value: 250000, suffix: "+" },
  { label: "Total Jobs Posted", value: 50000, suffix: "+" },
  { label: "Total Earnings", value: 15, prefix: "$", suffix: "M+" },
];

const features = [
  {
    title: "Stick to your budget",
    description: "Find the right service for every price point. No hourly rates, just project-based pricing.",
    icon: "💰"
  },
  {
    title: "Get quality work done quickly", 
    description: "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
    icon: "⚡"
  },
  {
    title: "Pay when you're happy",
    description: "Upfront quotes mean no surprises. Payments only get released when you approve.",
    icon: "🛡️"
  },
  {
    title: "24/7 Support",
    description: "Get help when you need it from our expert support team around the clock.",
    icon: "🎧"
  }
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Enhanced Overlay */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
        <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            className="object-cover"
          priority
        />
          {/* Beautiful Transparent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-max">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              How work gets{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                done
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-7 sm:leading-8 text-gray-200">
              KataKara is the world's work marketplace that connects businesses with independent talent from across the globe.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row rounded-lg shadow-2xl overflow-hidden bg-white">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for any service..."
                    className="block w-full pl-12 pr-4 py-4 sm:py-5 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 border-0 text-base sm:text-lg"
                  />
                </div>
                <button
                  type="button"
                  className="relative px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Popular searches */}
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-3">Popular:</p>
              <div className="flex flex-wrap gap-3">
                {["Website Design", "WordPress", "Logo Design", "AI Services", "Mobile App"].map((term) => (
                  <Link
                    key={term}
                    href={`/jobs?search=${encodeURIComponent(term)}`}
                    className="text-sm text-white/90 hover:text-white border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"></div>
        <div className="relative container-max">
          <div className="py-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter 
                      end={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix}
                      duration={2 + index * 0.5}
                    />
                  </div>
                  <div className="text-green-100 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-lg">Browse talent by category</h2>
            <p className="body-lg mt-4">
              Looking for work? <Link href="/jobs" className="text-green-600 hover:text-green-500 font-semibold">Browse jobs</Link>
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
          <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="text-3xl bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      {category.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{category.jobs}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 3 && (
                      <span className="text-xs text-gray-500">+{category.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-lg">The best part? Everything.</h2>
            <p className="body-lg mt-4 text-gray-600">
              Here's what makes KataKara the world's leading freelance marketplace
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-6 group-hover:bg-green-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-blue-50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Join our community and get the latest updates on new features, job opportunities, and industry insights.
            </p>
            
                          <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-to-r from-green-600 to-green-500">
        <div className="container-max">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join millions of entrepreneurs who use KataKara to turn their ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="bg-white text-green-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors text-center">
                Get Started
              </Link>
              <Link href="/jobs" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors text-center">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}