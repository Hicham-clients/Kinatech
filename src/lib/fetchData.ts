import axiosInstance from "./axios";

export async function fetchWithCache<T>(url: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    next: { revalidate: 60 }, 
  });
  return res.json();
}
