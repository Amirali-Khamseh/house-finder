import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign-in</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12  max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="/signin-img.png"
            alt="black and white towers"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-[2rem]">
          <form>
            <input
              className="w-full mb-[1rem] px-4 py-2 bg-white
               border-gray-300 rounded-xl transition ease-in "
              type="email"
              value={formData.email}
              placeholder="email@domain.com"
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
          </form>
          <div className="mt-5 flex text-sm sm:text-base w-full flex-col justify-center items-center  md:justify-between md:flex-row ">
            <p>
              Need an account?{" "}
              <Link
                to="/sign-up"
                className="text-xl text text-gray-100 hover:border-b-2"
              >
                Sign-up
              </Link>{" "}
            </p>
            <p>
              <Link to="/forgot-password" className=" hover:border-b-2">
                {" "}
                Forgotten your password ?
              </Link>
            </p>
          </div>
        </div>

        <div></div>
      </div>
    </section>
  );
}
