import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card, CardText, CardTitle } from "@/components/ui/Card";

type Job = {
	id: number;
	client: string;
	title: string;
	description: string;
	budget: string;
	created_at: string;
};

export default async function JobDetail({ params }: { params: { id: string } }) {
	const job = await api<Job>(`/api/jobs/${params.id}/`);

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<Card>
				<CardTitle>{job.title}</CardTitle>
				<CardText>{job.description}</CardText>
				<div className="mt-4 flex items-center justify-between text-sm text-gray-600">
					<span>Budget: ${job.budget}</span>
					<span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
				</div>
			</Card>

			<form
				className="mt-6 space-y-3 rounded-lg border border-black/10 bg-white p-4"
				action={async (formData) => {
					"use server";
					const cover_letter = String(formData.get("cover_letter") || "");
					const bid_amount = String(formData.get("bid_amount") || "");
					try {
						await api(`/api/proposals/`, {
							method: "POST",
							body: { job: Number(params.id), cover_letter, bid_amount },
						});
					} catch (e) {}
				}}
			>
				<h3 className="text-sm font-semibold">Submit a proposal</h3>
				<textarea
					name="cover_letter"
					placeholder="Cover letter"
					className="mt-2 w-full rounded border border-black/10 p-2 text-sm"
					rows={5}
				/>
				<input
					name="bid_amount"
					type="number"
					step="0.01"
					placeholder="Your bid"
					className="w-full rounded border border-black/10 p-2 text-sm"
				/>
				<Button type="submit">Send proposal</Button>
			</form>
		</div>
	);
}



