import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

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
        <div>
          <ul className="flex space-x-10 sm-mr-2">
            <li
              className={` cursor-pointer py-3 border-b-[3px] border-b-transparent ${
                location.pathname === "/" && "font-semibold border-b-slate-950"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={` cursor-pointer py-3 border-b-[3px] border-b-transparent ${
                location.pathname === "/offers" &&
                "font-semibold  border-b-slate-950"
              }`}
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>
            <li
              className={` cursor-pointer py-3 border-b-[3px] border-b-transparent ${
                location.pathname === "/sign-in" &&
                "font-semibold  border-b-slate-950"
              }`}
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Sign-in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
