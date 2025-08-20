import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import BlogDetail from "@/pages/BlogDetail";
import CreateBlog from "@/pages/CreateBlog";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <TooltipProvider>
        <div className="min-h-screen relative overflow-x-hidden">
          <Navbar />
          <main className="relative z-10">
            <AppRoutes />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </Router>
  );
}

export default App;
