import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About KataKara - World's Leading Freelance Marketplace",
  description: "Learn about KataKara's mission to connect businesses with top talent worldwide. Discover our story, values, and commitment to empowering the future of work.",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Users", value: "250K+", icon: "👥" },
    { label: "Projects Completed", value: "1M+", icon: "✅" },
    { label: "Countries", value: "190+", icon: "🌍" },
    { label: "Total Earnings", value: "$15M+", icon: "💰" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      bio: "Former VP at Upwork with 10+ years in marketplace development."
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      bio: "Ex-Google engineer passionate about scalable platforms."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      bio: "Building communities that empower freelancers worldwide."
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      bio: "Product visionary focused on user experience innovation."
    }
  ];

  const values = [
    {
      title: "Empowerment",
      description: "We believe in empowering individuals to build their own careers and businesses.",
      icon: "💪"
    },
    {
      title: "Trust",
      description: "Building trust between clients and freelancers through transparency and security.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "Continuously innovating to make work more flexible and accessible.",
      icon: "🚀"
    },
    {
      title: "Diversity",
      description: "Celebrating diverse talents and perspectives from around the world.",
      icon: "🌈"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Empowering the Future of Work
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              KataKara is more than a marketplace – we're building the infrastructure for the new economy,
              where talent and opportunity connect without boundaries.
            </p>
            <Link 
              href="/auth/signup" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-50"></div>
        <div className="relative container-max">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020, KataKara emerged from a simple observation: the world's best talent 
                  wasn't limited by geography, but traditional employment was. We set out to create 
                  a platform that would break down these barriers.
                </p>
                <p>
                  Starting with a small team of passionate engineers and business leaders, we've grown 
                  into a global marketplace serving hundreds of thousands of users across 190+ countries. 
                  Our platform has facilitated over $15 million in earnings for freelancers worldwide.
                </p>
                <p>
                  Today, we continue to innovate and expand, always keeping our core mission in mind: 
                  empowering people to work on their own terms while helping businesses access the 
                  best talent globally.
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
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 opacity-60"></div>
        <div className="relative container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the culture we're building.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-white/50">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind KataKara who are dedicated to transforming how the world works.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-green-600 text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              To democratize access to opportunity by creating the world's most trusted and efficient 
              marketplace for digital services. We believe that when talent meets opportunity without 
              barriers, extraordinary things happen.
            </p>
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div>
                <h3 className="text-2xl font-semibold mb-3">For Freelancers</h3>
                <p className="text-green-100">Build your career, work with global clients, and earn on your terms.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">For Businesses</h3>
                <p className="text-green-100">Access top talent instantly, scale flexibly, and reduce hiring costs.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">For Everyone</h3>
                <p className="text-green-100">Creating a more connected, flexible, and inclusive future of work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a freelancer looking for opportunities or a business seeking talent, 
              we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Started Today
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
