import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
	return <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
	return <h3 className="mb-2 text-base font-semibold">{children}</h3>;
}

export function CardText({ children }: { children: ReactNode }) {
	return <p className="text-sm text-gray-600">{children}</p>;
}



