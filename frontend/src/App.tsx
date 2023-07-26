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
import LiveVideo from "./pages/LiveVideo";
import { useUserAuth } from "./context/userAuthContext";
import PageNotFound from "./components/pageNotFound";

function App() {
  const { currentUser, loading } = useUserAuth();

  return (
    <div className="h-screen w-full">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          LOADING...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/video" element={<Video />} />
          {currentUser && (
            <>
              <Route path="/saved" element={<Saved />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/following" element={<Following />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/live" element={<Live />} />
            </>
          )}
          <Route path="/live-video" element={<LiveVideo />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
