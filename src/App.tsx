import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SelectType from "./pages/create/SelectType";
import SelectOccasion from "./pages/create/SelectOccasion";
import ChildDetails from "./pages/create/ChildDetails";
import Suggestions from "./pages/create/Suggestions";
import Confirm from "./pages/create/Confirm";
import Processing from "./pages/Processing";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create/type" element={<SelectType />} />
          <Route path="/create/occasion" element={<SelectOccasion />} />
          <Route path="/create/details" element={<ChildDetails />} />
          <Route path="/create/suggestions" element={<Suggestions />} />
          <Route path="/create/confirm" element={<Confirm />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
