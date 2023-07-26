import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

interface PrivateRoutesProps {}
const Saved = lazy(() => import("../pages/saved"));
const Liked = lazy(() => import("../pages/liked"));
const Following = lazy(() => import("../pages/following"));
const Profile = lazy(() => import("../pages/profile"));
const Live = lazy(() => import("../pages/Live"));
const PrivateRoutes: FC<PrivateRoutesProps> = ({}) => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/saved" element={<Saved />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/following" element={<Following />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
