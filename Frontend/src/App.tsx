import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import PostIdea from "./pages/PostIdea";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import IdeaDetail from "./pages/IdeaDetail";
import NotFound from "./pages/NotFound";
import Feed from "./pages/feed";
import Auth from "./pages/Auth";

import axios from "axios";
import { useAuth } from "./context/authContext";
import RandomIdea from "./pages/RandomIdea";
useAuth;

const queryClient = new QueryClient();

function AppWrapper() {
  const location = useLocation();
  const hideNavigationRoutes = ["/auth"];
  const { isAuthorized, setIsAuthorized, setUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://sparkswipebackend.onrender.com/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <div className="min-h-screen bg-white">
      {!hideNavigationRoutes.includes(location.pathname) && <Navigation />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post" element={<PostIdea />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/idea/:id" element={<IdeaDetail />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/rand-idea" element={<RandomIdea />} />
        {/* <Route path="/feed/:id" element={<Idea />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// without authentication
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import Navigation from "./components/Navigation";
// import Index from "./pages/Index";
// import Explore from "./pages/Explore";
// import PostIdea from "./pages/PostIdea";
// import Saved from "./pages/Saved";
// import Profile from "./pages/Profile";
// import IdeaDetail from "./pages/IdeaDetail";
// import NotFound from "./pages/NotFound";
// import Feed from "./pages/feed";
// import Auth from "./pages/Auth";

// const queryClient = new QueryClient();

// function AppWrapper() {
//   const location = useLocation();
//   const hideNavigationRoutes = ["/auth"];

//   return (
//     <div className="min-h-screen bg-white">
//       {!hideNavigationRoutes.includes(location.pathname) && <Navigation />}

//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/post" element={<PostIdea />} />
//         <Route path="/saved" element={<Saved />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/idea/:id" element={<IdeaDetail />} />
//         <Route path="/feed" element={<Feed />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AppWrapper />
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navigation from "./components/Navigation";
// import Index from "./pages/Index";
// import Explore from "./pages/Explore";
// import PostIdea from "./pages/PostIdea";
// import Saved from "./pages/Saved";
// import Profile from "./pages/Profile";
// import IdeaDetail from "./pages/IdeaDetail";
// import NotFound from "./pages/NotFound";
// import Feed from "./pages/feed";
// import Auth from "./pages/Auth";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <div className="min-h-screen bg-white">
//           <Navigation/>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/explore" element={<Explore />} />
//             <Route path="/post" element={<PostIdea />} />
//             <Route path="/saved" element={<Saved />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/idea/:id" element={<IdeaDetail />} />
//             <Route path="/feed" element={<Feed/>} />
//              <Route path="/auth" element={<Auth />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
