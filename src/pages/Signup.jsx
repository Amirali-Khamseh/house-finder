import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div
        className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
      >
        <h2 className="text-center text-xl font-semibold mx-2">
          Create an account
        </h2>
      </div>
      <div className="flex justify-center flex-wrap items-center px-5 py-12  max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="/signup-img.jpg"
            alt="black and white towers"
            className="w-[505px]  rounded-xl object-cover"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-[2rem]">
          <form>
            <input
              className="w-full mb-[1rem] px-4 py-2 bg-white
               border-gray-300 rounded-xl transition ease-in "
              type="text"
              value={formData.name}
              placeholder="Name & Familyname"
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                });
              }}
            />

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

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 px-7 py-3 text-white mt-4 rounded-xl hover:bg-blue-400 hover:scale-90 hover:transition-all ease-in-out duration-150"
              >
                Sign-up
              </button>
              <div
                className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
              >
                <p className="text-center font-semibold mx-2">Or</p>
              </div>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
