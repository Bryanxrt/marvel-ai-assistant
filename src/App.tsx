import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Movies from "./pages/Movies";
import Heroes from "./pages/Heroes";
import TimelinePage from "./pages/TimelinePage";
import About from "./pages/About";

function Layout() {
  const { pathname } = useLocation();
  const isChat = pathname === "/chat";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/heroes" element={<Heroes />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {!isChat && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
