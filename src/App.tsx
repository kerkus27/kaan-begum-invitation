import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import PendingApprovals from "./pages/PendingApprovals";
import WaitingApproval from "./pages/WaitingApproval";
import UserManagement from "./pages/UserManagement";
import Export from "./pages/Export";
import NotFound from "./pages/NotFound";

// Component to handle wedding invitation routes
const WeddingInvitation = () => {
  useEffect(() => {
    window.location.href = "/wedding.html";
  }, []);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-xl text-muted-foreground">Yönlendiriliyor...</p>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kaan-begum" element={<WeddingInvitation />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pending-approvals" element={<PendingApprovals />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/waiting-approval" element={<WaitingApproval />} />
          <Route path="/export" element={<Export />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
