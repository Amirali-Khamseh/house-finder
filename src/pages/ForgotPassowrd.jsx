import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassowrd() {
  const [formData, setFormData] = useState({
    email: "",
  });

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-semibold"> </h1>
      <div className="flex justify-center flex-wrap items-center px-5 py-12  max-w-6xl mx-auto">
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

            <div className="mt-5 flex text-sm sm:text-base w-full  justify-between  items-center  md:justify-between md:flex-row ">
              <p>
                Need an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-xl text text-gray-100 hover:transition-all  hover:border-b-2"
                >
                  Sign-up
                </Link>{" "}
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-400 px-7 py-3 text-white mt-4 rounded-xl hover:bg-green-500 hover:scale-90 hover:transition-all ease-in-out duration-150"
              >
                Sign-in
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
