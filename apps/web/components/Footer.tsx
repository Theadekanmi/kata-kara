"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Footer() {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		// Check for authenticated user
		const checkAuth = () => {
			const token = localStorage.getItem("access_token");
			const userStr = localStorage.getItem("user");
			
			if (token && userStr) {
				try {
					const userData = JSON.parse(userStr);
					setUser(userData);
				} catch (error) {
					console.error("Error parsing user data:", error);
					setUser(null);
				}
			} else {
				setUser(null);
			}
		};

		checkAuth();

		// Listen for auth state changes
		window.addEventListener("authStateChanged", checkAuth);
		window.addEventListener("storage", checkAuth);

		return () => {
			window.removeEventListener("authStateChanged", checkAuth);
			window.removeEventListener("storage", checkAuth);
		};
	}, []);

	const socialLinks = [
		{ 
			name: "Instagram", 
			href: "https://instagram.com/katakara", 
			icon: "📷" 
		},
		{ 
			name: "Twitter", 
			href: "https://twitter.com/katakara", 
			icon: "🐦" 
		},
		{ 
			name: "Facebook", 
			href: "https://facebook.com/katakara", 
			icon: "📘" 
		},
		{ 
			name: "LinkedIn", 
			href: "https://linkedin.com/company/katakara", 
			icon: "💼" 
		},
	];

	return (
		<footer className="bg-gray-900 text-white">
			<div className="container-max">
				<div className="py-12 md:py-16">
					<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
						{/* Brand Section */}
						<div className="lg:col-span-2">
							<h4 className="text-2xl font-bold text-green-400 mb-4">KataKara</h4>
							<p className="text-gray-300 mb-6 max-w-md">
								The world's work marketplace connecting businesses with independent talent from across the globe.
							</p>
							
							{/* Social Links */}
							<div className="flex space-x-4 mb-6">
								{socialLinks.map((social) => (
									<a
										key={social.name}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-green-600 transition-colors"
										aria-label={social.name}
									>
										<span className="text-lg">{social.icon}</span>
									</a>
								))}
							</div>

							{/* Contact */}
							<div className="text-gray-300">
								<p className="mb-2">
									<span className="text-green-400">📧</span>{" "}
									<a href="mailto:hello@katakara.com" className="hover:text-green-400 transition-colors">
										hello@katakara.com
									</a>
								</p>
								<p>
									<span className="text-green-400">🎧</span>{" "}
									<Link href="/contact" className="hover:text-green-400 transition-colors">
										24/7 Support
									</Link>
								</p>
							</div>
						</div>

						{/* Mobile: 2 columns, Desktop: 3 columns for links */}
						<div className="grid grid-cols-2 gap-8 sm:gap-12 lg:col-span-3 lg:grid-cols-3">
							{/* Explore */}
							<div>
								<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Explore</h5>
								<ul className="space-y-3 text-gray-300">
									<li><Link href="/jobs" className="hover:text-green-400 transition-colors">Browse Jobs</Link></li>
									<li><Link href="/jobs/new" className="hover:text-green-400 transition-colors">Post a Job</Link></li>
									<li><Link href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link></li>
									<li><Link href="/freelancers" className="hover:text-green-400 transition-colors">Find Talent</Link></li>
									<li><Link href="/enterprise" className="hover:text-green-400 transition-colors">Enterprise</Link></li>
								</ul>
							</div>

							{/* Company */}
							<div>
								<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Company</h5>
								<ul className="space-y-3 text-gray-300">
									<li><Link href="/about" className="hover:text-green-400 transition-colors">About</Link></li>
									<li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
									<li><Link href="/careers" className="hover:text-green-400 transition-colors">Careers</Link></li>
									<li><Link href="/press" className="hover:text-green-400 transition-colors">Press</Link></li>
									<li><Link href="/investors" className="hover:text-green-400 transition-colors">Investors</Link></li>
								</ul>
							</div>

							{/* Legal & Support combined */}
							<div className="col-span-2 lg:col-span-1">
								<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Support & Legal</h5>
								<ul className="space-y-3 text-gray-300">
									<li><Link href="/help" className="hover:text-green-400 transition-colors">Help Center</Link></li>
									<li><Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
									<li><Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
									<li><Link href="/cookies" className="hover:text-green-400 transition-colors">Cookie Policy</Link></li>
									<li><Link href="/security" className="hover:text-green-400 transition-colors">Security</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="container-max">
					<div className="py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
						<div className="flex items-center space-x-4 mb-4 sm:mb-0">
							<p>© {new Date().getFullYear()} KataKara. All rights reserved.</p>
							<span className="hidden sm:block">•</span>
							<p className="text-xs">
								Developed by{" "}
								<a 
									href="https://prowebnigeria.ng" 
									target="_blank" 
									rel="noopener noreferrer"
									className="text-green-400 hover:text-green-300 transition-colors font-medium"
								>
									ProWebNigeria.ng
								</a>
							</p>
						</div>
						
						<div className="flex items-center space-x-6">
							{user ? (
								<Link href="/dashboard" className="hover:text-green-400 transition-colors">
									Dashboard
								</Link>
							) : (
								<>
									<Link href="/auth/login" className="hover:text-green-400 transition-colors">Sign in</Link>
									<Link href="/auth/signup" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-colors">
										Sign up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}


