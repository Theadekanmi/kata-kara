import Link from "next/link";
import { api } from "@/lib/api";
import { AdvancedSearch } from "@/components/AdvancedSearch";

type Job = {
	id: number;
	client: string;
	title: string;
	description: string;
	budget: string;
	created_at: string;
	skills?: string[];
	category?: { name: string };
};

const jobCategories = [
	"All Categories",
	"Web Development", 
	"Mobile Development",
	"Design & Creative",
	"Writing & Translation",
	"Digital Marketing",
	"Video & Animation",
	"Music & Audio",
	"Business",
	"Data Science"
];

const budgetRanges = [
	"All Budgets",
	"$0 - $500",
	"$500 - $2,000", 
	"$2,000 - $5,000",
	"$5,000+"
];

export default async function JobsPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; budget?: string }> }) {
	const resolvedSearchParams = await searchParams;
	const params = new URLSearchParams();
	if (resolvedSearchParams?.q) params.set('search', resolvedSearchParams.q);
	const queryString = params.toString() ? `?${params.toString()}` : "";
	
	let jobs: Job[] = [];
	try {
		jobs = await api<Job[]>(`/api/jobs/${queryString}`);
	} catch {
		jobs = [];
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Page Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="container-max py-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
							<p className="text-gray-600 mt-2">Discover amazing opportunities from clients worldwide</p>
						</div>
						<Link 
							href="/jobs/new" 
							className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
						>
							Post a Job
						</Link>
					</div>
				</div>
			</div>

			{/* Advanced Search */}
			<div className="container-max py-8">
				<AdvancedSearch currentResults={jobs.length} />
			</div>

			<div className="container-max py-12">
				<div className="grid gap-8 lg:grid-cols-4">
					{/* Enhanced Filters Sidebar */}
					<div className="lg:col-span-1">
						{/* Mobile Filter Toggle */}
						<div className="lg:hidden mb-6">
							<button className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors">
								<span className="flex items-center font-medium">
									<span className="mr-2">🔍</span>
									Filters
								</span>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</div>
						
						<div className="hidden lg:block bg-white rounded-xl shadow-sm p-6 sticky top-8 border border-gray-100">
							<h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
								<span className="mr-2">🔍</span>
								Filter Jobs
							</h3>
							
							{/* Categories */}
							<div className="mb-8">
								<h4 className="font-semibold text-gray-900 mb-4 flex items-center">
									<span className="mr-2">📂</span>
									Category
								</h4>
								<div className="space-y-3">
									{jobCategories.map((category) => (
										<label key={category} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
											<input type="radio" name="category" className="text-green-600 focus:ring-green-500" />
											<span className="ml-3 text-gray-700 font-medium">{category}</span>
										</label>
									))}
								</div>
							</div>

							{/* Budget */}
							<div className="mb-8">
								<h4 className="font-semibold text-gray-900 mb-4 flex items-center">
									<span className="mr-2">💰</span>
									Budget Range
								</h4>
								<div className="space-y-3">
									{budgetRanges.map((range) => (
										<label key={range} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
											<input type="radio" name="budget" className="text-green-600 focus:ring-green-500" />
											<span className="ml-3 text-gray-700 font-medium">{range}</span>
										</label>
									))}
								</div>
							</div>

							{/* Apply Filters Button */}
							<button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
								Apply Filters
							</button>
						</div>
					</div>

					{/* Jobs Grid with Enhanced Header */}
					<div className="lg:col-span-3">
						<div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<h2 className="text-xl sm:text-2xl font-bold text-gray-900">
								{jobs.length} Jobs Found
							</h2>
							<select 
								className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white min-w-0 sm:min-w-[180px]"
								title="Sort jobs by"
								aria-label="Sort jobs by"
							>
								<option>Most Recent</option>
								<option>Highest Budget</option>
								<option>Lowest Budget</option>
								<option>Most Relevant</option>
							</select>
						</div>
						<div className="space-y-6">
							{jobs.length > 0 ? jobs.map((job) => (
								<div
									key={job.id}
									className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
								>
									<div className="p-6">
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-3">
													<div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold">
														{job.client?.charAt(0)?.toUpperCase() || 'C'}
													</div>
													<div>
														<Link 
															href={`/jobs/${job.id}`}
															className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors group-hover:text-green-600"
														>
															{job.title}
														</Link>
														<p className="text-sm text-gray-600">by {job.client}</p>
													</div>
												</div>
												<div className="flex items-center mt-2 text-sm text-gray-500">
													<span className="mr-4 flex items-center">
														<span className="mr-1">⏰</span>
														Posted {job.created_at}
													</span>
													<span className="flex items-center">
														<span className="mr-1">📍</span>
														{job.location || 'Remote'}
													</span>
												</div>
											</div>
											<div className="text-right">
												<div className="text-2xl font-bold text-green-600">${job.budget}</div>
												<div className="text-sm text-gray-500">Fixed Price</div>
											</div>
										</div>
											
											<p className="text-gray-700 mb-4 line-clamp-3">
												{job.description}
											</p>
											
											{/* Skills */}
											{job.skills && job.skills.length > 0 && (
												<div className="flex flex-wrap gap-2 mb-4">
													{job.skills.slice(0, 5).map((skill, index) => (
														<span key={index} className="skill-badge">
															{skill}
														</span>
													))}
													{job.skills.length > 5 && (
														<span className="text-sm text-gray-500">
															+{job.skills.length - 5} more
														</span>
													)}
												</div>
											)}
											
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
													{job.category}
												</span>
												<span className="text-sm text-gray-500">
													{Math.floor(Math.random() * 20) + 1} proposals
												</span>
											</div>
											<div className="flex items-center space-x-3">
												<button className="text-gray-400 hover:text-red-500 transition-colors">
													<span className="text-lg">❤️</span>
												</button>
												<Link 
													href={`/jobs/${job.id}`}
													className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
												>
													Apply Now
												</Link>
											</div>
										</div>
									</div>
								</div>
							)) : (
								<div className="text-center py-12">
									<div className="text-6xl mb-4">🔍</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
									<p className="text-gray-600">Try adjusting your search criteria</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


