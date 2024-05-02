"use client";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 6000,
      retry: false,
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
