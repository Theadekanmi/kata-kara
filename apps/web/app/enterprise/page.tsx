import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KataKara Enterprise - Scale Your Business with Top Talent",
  description: "Enterprise solutions for large organizations. Access dedicated support, advanced security, and premium talent pools.",
};

export default function EnterprisePage() {
  const features = [
    {
      title: "Dedicated Account Management",
      description: "Get a dedicated account manager to help you navigate projects, find talent, and optimize your hiring process.",
      icon: "👨‍💼"
    },
    {
      title: "Advanced Security & Compliance",
      description: "Enterprise-grade security with SOC 2 compliance, advanced data protection, and customizable privacy controls.",
      icon: "🔐"
    },
    {
      title: "Custom Talent Pools",
      description: "Access to vetted, premium talent pools and the ability to create private talent communities for your organization.",
      icon: "🎯"
    },
    {
      title: "Priority Support",
      description: "24/7 priority support with dedicated channels and faster response times for critical business needs.",
      icon: "⚡"
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track spending, project outcomes, and talent performance.",
      icon: "📊"
    },
    {
      title: "Volume Discounts",
      description: "Flexible pricing models and volume discounts based on your organization's usage and commitment.",
      icon: "💰"
    }
  ];

  const benefits = [
    {
      title: "Reduce Hiring Costs",
      description: "Cut traditional hiring costs by up to 70% while accessing a global talent pool.",
      stat: "70%",
      statLabel: "Cost Reduction"
    },
    {
      title: "Faster Time to Hire",
      description: "Find and onboard qualified freelancers in days, not weeks or months.",
      stat: "5x",
      statLabel: "Faster Hiring"
    },
    {
      title: "Scale Flexibly",
      description: "Scale your team up or down based on project needs without long-term commitments.",
      stat: "100%",
      statLabel: "Flexibility"
    }
  ];

  const testimonials = [
    {
      quote: "KataKara Enterprise has transformed how we approach project staffing. The quality of talent and speed of delivery is exceptional.",
      author: "Sarah Johnson",
      title: "VP of Engineering",
      company: "TechCorp Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?q=80&w=100&auto=format&fit=crop"
    },
    {
      quote: "The dedicated account management and priority support have been game-changers for our large-scale projects.",
      author: "Michael Chen",
      title: "Director of Operations",
      company: "Global Solutions Ltd.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max section-padding">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Enterprise Solutions for Scale
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Empower your organization with dedicated support, advanced security, 
                and access to the world's top 1% of freelance talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  Contact Sales
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=600&auto=format&fit=crop"
                alt="Enterprise team collaboration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 opacity-70"></div>
        <div className="relative container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Enterprise?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for organizations that need more than just a marketplace - a strategic partner.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm text-center border border-white/50">
                <div className="text-4xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                <div className="text-sm text-gray-500 mb-4">{benefit.statLabel}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage large-scale projects and teams with confidence.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 opacity-60"></div>
        <div className="relative container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h2>
            <p className="text-xl text-gray-600">
              See what our enterprise clients say about their experience.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-white/50">
                <div className="text-gray-600 text-lg mb-6 italic">
                  "{testimonial.quote}"
                </div>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.title}</div>
                    <div className="text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Enterprise-Grade Security</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Your data and projects are protected by industry-leading security measures 
                  designed for enterprise requirements.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>SOC 2 Type II compliance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>End-to-end encryption for all communications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Advanced identity and access management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Custom data retention policies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Regular security audits and penetration testing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop"
                alt="Security and compliance"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Scale Your Business?</h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Join hundreds of enterprise clients who trust KataKara to deliver exceptional results. 
              Let's discuss how we can help your organization succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Schedule a Demo
              </Link>
              <Link 
                href="/auth/signup" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
