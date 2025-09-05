"use client";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "ghost" };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
	const base = "inline-flex items-center justify-center rounded px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-black/20";
	const styles =
		variant === "primary"
			? "bg-black text-white hover:-translate-y-0.5 hover:shadow"
			: "border border-black/10 bg-white text-gray-800 hover:bg-black/5";
	return <button className={`${base} ${styles} ${className}`} {...props} />;
}



