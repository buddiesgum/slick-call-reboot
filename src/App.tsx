import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocationProvider } from "@/context/LocationContext";
import Index from "./pages/Index.tsx";
import Plumbing from "./pages/Plumbing.tsx";
import DrainCleaning from "./pages/DrainCleaning.tsx";
import LeakDetection from "./pages/LeakDetection.tsx";
import WaterHeaters from "./pages/WaterHeaters.tsx";
import SepticServices from "./pages/SepticServices.tsx";
import NewBuildPlumbing from "./pages/NewBuildPlumbing.tsx";
import CommercialPlumbing from "./pages/CommercialPlumbing.tsx";
import Excavation from "./pages/Excavation.tsx";
import Restoration from "./pages/Restoration.tsx";
import Remodels from "./pages/Remodels.tsx";
import Foundations from "./pages/Foundations.tsx";
import Projects from "./pages/Projects.tsx";
import About from "./pages/About.tsx";
import Careers from "./pages/Careers.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocationProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/drain-cleaning" element={<DrainCleaning />} />
          <Route path="/leak-detection" element={<LeakDetection />} />
          <Route path="/water-heaters" element={<WaterHeaters />} />
          <Route path="/septic-services" element={<SepticServices />} />
          <Route path="/new-build-plumbing" element={<NewBuildPlumbing />} />
          <Route path="/commercial-plumbing" element={<CommercialPlumbing />} />
          <Route path="/excavation" element={<Excavation />} />
          <Route path="/restoration" element={<Restoration />} />
          <Route path="/remodels" element={<Remodels />} />
          <Route path="/foundations" element={<Foundations />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/call-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </LocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
