import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Video from "./pages/video";
import Saved from "./pages/saved";
import Liked from "./pages/liked";
import Following from "./pages/following";
import Profile from "./pages/profile";
import Live from "./pages/Live";
import Test from "./utils/Test";

function App() {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/video" element={<Video />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/following" element={<Following />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/live" element={<Live />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
