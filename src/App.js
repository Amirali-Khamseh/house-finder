import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassowrd from "./pages/ForgotPassowrd";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import Page404 from "./pages/Page404";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/forgot-password" element={<ForgotPassowrd />}></Route>
          <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
          <Route path="/*" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
