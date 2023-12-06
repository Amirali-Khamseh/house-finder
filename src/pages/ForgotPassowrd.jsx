import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
export default function ForgotPassowrd() {
  const [email, setEmail] = useState("");
  return (
    <section>
      <div
        className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
      >
        <h2 className="text-center text-xl font-semibold mx-2">
          Reset your pasword
        </h2>
      </div>
      <div className="flex justify-center flex-wrap items-center px-5 py-12  max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="/forgotPassword-img.jpg"
            alt="black and white towers"
            className="w-full rounded-xl w-[505px]  h-[288px] rounded-xl object-cover"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-[2rem]">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const auth = getAuth();
              await sendPasswordResetEmail(auth, email);
              toast.success("Reset e-mail has been sent");
              try {
              } catch (e) {
                toast.error("Something went wrong while reseting password");
              }
            }}
          >
            <input
              className="w-full mb-[1rem] px-4 py-2 bg-white
               border-gray-300 rounded-xl transition ease-in "
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
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
                className="w-full bg-purple-700 px-7 py-3 text-white mt-4 rounded-xl hover:bg-purple-400 hover:scale-90 hover:transition-all ease-in-out duration-150"
              >
                Reset my password
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
