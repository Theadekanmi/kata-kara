"use client";
import { useState, useEffect } from "react";
import { EarningsChart } from "@/components/charts/EarningsChart";
import { ProjectsChart } from "@/components/charts/ProjectsChart";

type Me = {
	id: number;
	username: string;
	email: string;
	is_client: boolean;
	is_freelancer: boolean;
};

export default function DashboardPage() {
	const [me, setMe] = useState<Me | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const token = localStorage.getItem("access_token") || localStorage.getItem("access");
				const userStr = localStorage.getItem("user");
				
				if (!token) {
					// No token, redirect to login
					window.location.href = "/auth/login";
					return;
				}

				if (userStr) {
					// Use stored user data first
					const user = JSON.parse(userStr);
					setMe({
						id: user.id,
						username: user.email,
						email: user.email,
						is_client: user.is_client || false,
						is_freelancer: user.is_freelancer || true
					});
					setLoading(false);
					return;
				}
				
				// Try to fetch from backend
				const base = process.env.NEXT_PUBLIC_API_BASE || "http://prowebnigeria.pythonanywhere.com";
				const res = await fetch(`${base}/api/accounts/me/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				
				if (res.ok) {
					const user = await res.json();
					setMe(user);
				} else {
					// Backend not available, create mock user from token
					const mockUser = {
						id: Math.floor(Math.random() * 1000),
						username: "demo_user",
						email: "user@example.com",
						is_client: false,
						is_freelancer: true
					};
					setMe(mockUser);
				}
			} catch (error) {
				console.error("Failed to fetch user:", error);
				// Create mock user for demo
				const mockUser = {
					id: Math.floor(Math.random() * 1000),
					username: "demo_user", 
					email: "user@example.com",
					is_client: false,
					is_freelancer: true
				};
				setMe(mockUser);
			} finally {
				setLoading(false);
			}
		}
		fetchUser();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		window.location.href = "/auth/login";
	};

	if (!me) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
					<a href="/auth/login" className="btn-primary">Sign In</a>
				</div>
			</div>
		);
	}

	const stats = [
		{
			title: "Total Earnings",
			value: "$24,560",
			change: "+12%",
			changeType: "positive" as const,
			icon: "💰"
		},
		{
			title: "Active Projects", 
			value: "8",
			change: "+2",
			changeType: "positive" as const,
			icon: "📋"
		},
		{
			title: "Completed Jobs",
			value: "42",
			change: "+5",
			changeType: "positive" as const,
			icon: "✅"
		},
		{
			title: "Client Rating",
			value: "4.9",
			change: "+0.1",
			changeType: "positive" as const,
			icon: "⭐"
		}
	];

	const recentJobs = [
		{ title: "E-commerce Website", client: "TechCorp", status: "In Progress", amount: "$2,500" },
		{ title: "Mobile App Design", client: "StartupXYZ", status: "Completed", amount: "$1,800" },
		{ title: "Logo Design", client: "BrandCo", status: "Under Review", amount: "$500" },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="mx-auto max-w-7xl px-6 py-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Welcome back, {me.username}!
							</h1>
							<p className="mt-2 text-gray-600">
								{me.is_freelancer ? "Freelancer" : "Client"} Dashboard
							</p>
						</div>
						<div className="flex items-center gap-4">
							<button className="btn-secondary">Download Report</button>
							<button className="btn-primary">New Project</button>
							<button
								onClick={handleLogout}
								className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-8">
				{/* Stats Grid */}
				<div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat, index) => (
						<div key={index} className="card-premium hover-lift animate-fade-in">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600">{stat.title}</p>
									<p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
									<p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
										{stat.change} from last month
									</p>
								</div>
								<div className="text-3xl">{stat.icon}</div>
							</div>
						</div>
					))}
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					{/* Charts */}
					<div className="lg:col-span-2 space-y-8">
						{/* Earnings Chart */}
						<div className="card-premium">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
								<select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
									<option>Last 6 months</option>
									<option>Last year</option>
								</select>
							</div>
							<EarningsChart />
						</div>

						{/* Projects Chart */}
						<div className="card-premium">
							<h3 className="text-lg font-semibold text-gray-900 mb-6">Project Status</h3>
							<ProjectsChart />
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-8">
						{/* Recent Activity */}
						<div className="card-premium">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Jobs</h3>
							<div className="space-y-4">
								{recentJobs.map((job, index) => (
									<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
										<div className="flex-1">
											<p className="font-medium text-gray-900 text-sm">{job.title}</p>
											<p className="text-xs text-gray-600">{job.client}</p>
										</div>
										<div className="text-right">
											<p className="font-semibold text-gray-900 text-sm">{job.amount}</p>
											<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
												job.status === 'Completed' ? 'bg-green-100 text-green-800' :
												job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
												'bg-yellow-100 text-yellow-800'
											}`}>
												{job.status}
											</span>
										</div>
									</div>
								))}
							</div>
							<a href="/jobs" className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-500">
								View all jobs →
							</a>
						</div>

						{/* Quick Actions */}
						<div className="card-premium">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
							<div className="space-y-3">
								<a href="/jobs" className="btn-secondary w-full justify-center">
									Browse Jobs
								</a>
								<a href="/profile" className="btn-secondary w-full justify-center">
									Edit Profile
								</a>
								<a href="/messages" className="btn-secondary w-full justify-center">
									Messages
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


