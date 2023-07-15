import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Video from "./pages/video";

function App() {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
