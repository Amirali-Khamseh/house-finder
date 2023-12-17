import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="h-screen max-w-6xl mx-auto ">
      <div
        className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
      >
        <h1 className=" text-white text-center text-2xl font-semibold mx-2">
          Your Ultimate Real Estate Companion
        </h1>
      </div>
      <div className="flex justify-center flex-wrap items-center px-5 py-12  max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="/signin-img.png"
            alt="black and white towers"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-[2rem]">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const auth = getAuth();
                const userCredentials = await signInWithEmailAndPassword(
                  auth,
                  formData.email,
                  formData.password
                );
                if (userCredentials.user) {
                  navigate("/profile");
                }
              } catch (e) {
                toast.error("User credentials are incoreect");
              }
            }}
          >
            <input
              className="w-full mb-[1rem] px-4 py-2 bg-white
               border-gray-300 rounded-xl transition ease-in "
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                });
              }}
            />
            <div className="relative">
              <input
                className="w-full  px-4 py-2 bg-white
            border-gray-300 rounded-xl transition ease-in"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  });
                }}
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute top-3 right-3 text-xl cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              ) : (
                <FaRegEye
                  className="absolute top-3 right-3 text-xl cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              )}
            </div>
            <div className="mt-5 flex flex-col md:flex-row w-full  justify-between  items-center  md:justify-between  text-white">
              <p>
                Need an account?
                <Link
                  to="/sign-up"
                  className="text-xm text text-gray-100 hover:transition-all  hover:border-b-2"
                >
                  <span className="ml-1 hover:border-b text-sm">Sign-up</span>
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className=" hover:border-b-2 hover:transition-all text-white text-sm"
                >
                  Forgotten your password ?
                </Link>
              </p>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-4">
              <button
                type="submit"
                className="w-[200px] ml-1 mt-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign-in
              </button>
            </div>
          </form>
          <OAuth />
        </div>
      </div>
    </section>
  );
}
