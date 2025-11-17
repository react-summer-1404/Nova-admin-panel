import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// ** Router Import
import Router from "./router/Router";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
