import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("Sign-in");
  const auth = getAuth();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign-in");
      }
    });
  }, [auth]);

  // Function to handle navigation and close the mobile menu
  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <div className="bg-white border-b  shadow-sm sticky top-0 z-50">
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
        {/* Responsive Hamburger Menu */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="block text-gray-600 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          >
            &#9776;
          </button>
        </div>
        {/* Mobile Menu */}
        {showMenu && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200">
            <ul className="flex flex-col items-center">
              <li
                className={`cursor-pointer py-3 ${
                  location.pathname === "/" &&
                  "font-semibold border-b-slate-950 border-b-[3px]"
                }`}
                onClick={() => handleNavigation("/")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer py-3 ${
                  location.pathname === "/offers" &&
                  "font-semibold border-b-slate-950 border-b-[3px]"
                }`}
                onClick={() => handleNavigation("/offers")}
              >
                Offers
              </li>
              <li
                className={`cursor-pointer py-3 ${
                  (location.pathname === "/sign-in" ||
                    location.pathname === "/profile") &&
                  "font-semibold border-b-slate-950 border-b-[3px]"
                }`}
                onClick={() => handleNavigation("/profile")}
              >
                {pageState}
              </li>
            </ul>
          </div>
        )}
        {/* Desktop Menu */}
        <div className="hidden sm:block">
          <ul className="flex space-x-10 sm-mr-2">
            <li
              className={`cursor-pointer py-3 ${
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
              className={`cursor-pointer py-3 ${
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
              className={`cursor-pointer py-3 ${
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
