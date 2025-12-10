import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { SidebarProvider } from "./contexts/SidebarContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Personnel from "./pages/Personnel";
import Departments from "./pages/Departments";
import Grades from "./pages/Grades";
import Promotions from "./pages/Promotions";
import Certificates from "./pages/Certificates";
import Archives from "./pages/Archives";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";
import SignupSuccess from "./pages/SignupSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SidebarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup-success" element={<SignupSuccess />} />
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/personnel" element={<ProtectedRoute><Personnel /></ProtectedRoute>} />
              <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
              <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
              <Route path="/promotions" element={<ProtectedRoute><Promotions /></ProtectedRoute>} />
              <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
              <Route path="/archives" element={<ProtectedRoute><Archives /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
