import { provider, auth } from "./firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Clipboard from "./pages/Clipboard.jsx";
import TestPage from "./pages/TestPage.jsx";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/clipboard" element={<Clipboard />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route
            path="/metadata"
            element={<Navigate to={"../public/metadata.json"} />}
          />
        </Routes>
      </NextUIProvider>
      <Analytics />
    </>
  );
}

export default App;
