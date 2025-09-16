"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
	{ href: "/jobs", label: "Find Work" },
	{ href: "/freelancers", label: "Find Talent" },
	{ href: "/enterprise", label: "Enterprise" },
];

const exploreItems = [
	{ href: "/jobs", label: "Browse Jobs" },
	{ href: "/jobs/new", label: "Post a Job" },
	{ href: "/dashboard", label: "Dashboard" },
];

const companyItems = [
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/careers", label: "Careers" },
];

export function Navbar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isExploreOpen, setIsExploreOpen] = useState(false);
	const [isCompanyOpen, setIsCompanyOpen] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		setUser(null);
		
		// Trigger auth state change event
		window.dispatchEvent(new Event("authStateChanged"));
		
		window.location.href = "/";
	};

	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
			<div className="container-max">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<div className="text-2xl font-bold text-green-600">
							KataKara
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-1">
						{/* Explore Dropdown */}
						<div className="relative">
							<button
								onMouseEnter={() => setIsExploreOpen(true)}
								onMouseLeave={() => setIsExploreOpen(false)}
								className="nav-link flex items-center"
							>
								Explore
								<svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
							{isExploreOpen && (
								<div
									className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
									onMouseEnter={() => setIsExploreOpen(true)}
									onMouseLeave={() => setIsExploreOpen(false)}
								>
									{exploreItems.map((item) => (
										<Link
											key={item.href}
											href={item.href}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
										>
											{item.label}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* Company Dropdown */}
						<div className="relative">
							<button
								onMouseEnter={() => setIsCompanyOpen(true)}
								onMouseLeave={() => setIsCompanyOpen(false)}
								className="nav-link flex items-center"
							>
								Company
								<svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
							{isCompanyOpen && (
								<div
									className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
									onMouseEnter={() => setIsCompanyOpen(true)}
									onMouseLeave={() => setIsCompanyOpen(false)}
								>
									{companyItems.map((item) => (
										<Link
											key={item.href}
											href={item.href}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
										>
											{item.label}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* Regular nav items */}
						{navItems.map((item) => {
							const active = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`nav-link ${active ? 'nav-link-active' : ''}`}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>

					{/* Auth Section */}
					<div className="flex items-center space-x-3">
						{user ? (
							// Authenticated user menu
							<div className="relative">
								<button
									onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
									className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
								>
									<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
										{user.first_name?.[0] || user.email?.[0] || 'U'}
									</div>
									<span className="hidden md:block text-sm font-medium text-gray-700">
										{user.first_name || user.email?.split('@')[0] || 'User'}
									</span>
									<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>

								{/* User dropdown menu */}
								{isUserMenuOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
										<Link
											href="/dashboard"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setIsUserMenuOpen(false)}
										>
											Dashboard
										</Link>
										<Link
											href="/profile"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setIsUserMenuOpen(false)}
										>
											Profile
										</Link>
										<Link
											href="/messages"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setIsUserMenuOpen(false)}
										>
											Messages
										</Link>
										<Link
											href="/settings"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setIsUserMenuOpen(false)}
										>
											Settings
										</Link>
										<hr className="my-1" />
										<button
											onClick={handleLogout}
											className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
										>
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							// Guest user buttons
							<>
								<Link
									href="/auth/login"
									className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2"
								>
									Log In
								</Link>
								<Link
									href="/auth/signup"
									className="btn-primary"
								>
									Sign Up
								</Link>
							</>
						)}
						
						{/* Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
						>
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								{isMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="lg:hidden border-t border-gray-200 py-4">
						<div className="space-y-1">
							<div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Explore</div>
							{exploreItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="block px-6 py-2 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
							
							<div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide mt-4">Company</div>
							{companyItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="block px-6 py-2 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}

							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
							
							{user ? (
								// Mobile user menu when logged in
								<div className="border-t border-gray-200 mt-4 pt-4">
									<div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Account</div>
									<div className="flex items-center px-3 py-2 space-x-3">
										<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
											{user.first_name?.[0] || user.email?.[0] || 'U'}
										</div>
										<span className="text-base font-medium text-gray-700">
											{user.first_name || user.email?.split('@')[0] || 'User'}
										</span>
									</div>
									<Link
										href="/dashboard"
										className="block px-6 py-2 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										onClick={() => setIsMenuOpen(false)}
									>
										Dashboard
									</Link>
									<Link
										href="/profile"
										className="block px-6 py-2 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										onClick={() => setIsMenuOpen(false)}
									>
										Profile
									</Link>
									<Link
										href="/messages"
										className="block px-6 py-2 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										onClick={() => setIsMenuOpen(false)}
									>
										Messages
									</Link>
									<button
										onClick={() => {
											handleLogout();
											setIsMenuOpen(false);
										}}
										className="block w-full text-left px-6 py-2 text-base text-red-600 hover:bg-gray-50"
									>
										Logout
									</button>
								</div>
							) : (
								// Mobile login/signup when not logged in
								<Link
									href="/auth/login"
									className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
									onClick={() => setIsMenuOpen(false)}
								>
									Log In
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	);
}


