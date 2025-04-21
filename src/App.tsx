
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CertificateProvider } from "@/context/CertificateContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import AdminDashboard from "./pages/AdminDashboard";
import CertificateDetailPage from "./pages/CertificateDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CertificateProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/verify/:id" element={<VerifyPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/certificate/:id" element={<CertificateDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CertificateProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
