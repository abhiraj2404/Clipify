import { provider, auth } from "./firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Clipboard from "./pages/Clipboard.jsx";
import TestPage from "./pages/TestPage.jsx";

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
        </Routes>
      </NextUIProvider>
    </>
  );
}

export default App;
