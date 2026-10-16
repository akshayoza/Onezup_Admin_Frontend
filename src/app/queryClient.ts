import { QueryClient } from "@tanstack/react-query";

/** Shared cache policy. Feature hooks own their query keys and endpoint calls. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
