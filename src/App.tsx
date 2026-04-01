import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Plumbing from "./pages/Plumbing.tsx";
import Excavation from "./pages/Excavation.tsx";
import Restoration from "./pages/Restoration.tsx";
import Remodels from "./pages/Remodels.tsx";
import Foundations from "./pages/Foundations.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/excavation" element={<Excavation />} />
          <Route path="/restoration" element={<Restoration />} />
          <Route path="/remodels" element={<Remodels />} />
          <Route path="/foundations" element={<Foundations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
