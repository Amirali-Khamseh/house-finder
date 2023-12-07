import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("Sign-in");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign-in");
      }
    });
  }, [auth]);
  return (
    <div className="bg-white border-b  shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="/logo.png"
            alt="House Finder logo"
            className="h-24 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div>
          <ul className="flex space-x-10 sm-mr-2">
            <li
              className={` cursor-pointer py-3   ${
                location.pathname === "/" &&
                "font-semibold border-b-slate-950 border-b-[3px]"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={` cursor-pointer py-3  ${
                location.pathname === "/offers" &&
                "font-semibold border-b-slate-950 border-b-[3px]"
              }`}
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>
            <li
              className={` cursor-pointer py-3  ${
                (location.pathname === "/sign-in" ||
                  location.pathname === "/profile") &&
                "font-semibold border-b-slate-950 border-b-[3px]"
              }`}
              onClick={() => {
                navigate("/profile");
              }}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
