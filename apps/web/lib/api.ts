export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export async function api<T>(
	path: string,
	options: { method?: HttpMethod; body?: any; token?: string; headers?: Record<string, string> } = {}
): Promise<T> {
	const { method = "GET", body, token, headers = {} } = options;
	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers: {
			"Content-Type": body instanceof FormData ? undefined : "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		} as HeadersInit,
		body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
		cache: "no-store",
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
	}
	return res.json();
}



