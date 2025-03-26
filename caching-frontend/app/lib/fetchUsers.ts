import useSWR from "swr";
import { api } from "@/app/lib/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

// 🟢 GET USERS with SWR (Caches API responses in memory)
export function useUsers() {
  const { data, error, mutate } = useSWR("/users", fetcher);

  return {
    users: data || [],  // Return cached users or empty array
    isLoading: !error && !data,  // Loading state
    isError: error,  // Error handling
    mutate,  // Used to refresh cache
  };
}
