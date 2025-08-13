import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/lib/language-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Success from "./pages/Success";
import StatusCheck from "./pages/StatusCheck";
import FAQ from "./pages/FAQ";
import CertificateVerification from "./pages/CertificateVerification";
import Grievance from "./pages/Grievance";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/success" element={<Success />} />
            <Route path="/status-check" element={<StatusCheck />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/verify-certificate" element={<CertificateVerification />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
