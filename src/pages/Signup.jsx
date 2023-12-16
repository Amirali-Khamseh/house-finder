import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Headline from "../components/Headline";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="h-screen max-w-6xl mx-auto  ">
      <Headline title="Create an account" />
      <div className="flex justify-center flex-wrap items-center px-5 py-12  max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="/signup-img.jpg"
            alt="black and white towers"
            className="w-[505px]  rounded-xl object-cover"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-[2rem]">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const auth = getAuth();
                const userCredentials = await createUserWithEmailAndPassword(
                  auth,
                  formData.email,
                  formData.password
                );
                updateProfile(auth.currentUser, {
                  displayName: formData.name,
                });
                const user = userCredentials.user;
                //Deep copy and removing the password before storing in DB
                const formDataDB = {
                  ...formData,
                };
                delete formDataDB.password;
                //Adding the exact time use has been added
                formDataDB.timestamp = serverTimestamp();
                //Setting up the document in firestore
                await setDoc(doc(db, "users", user.uid), formDataDB);
                //Navigating use to the sign-in page
                toast.success("You have been registered.");
                navigate("/");
              } catch (error) {
                toast.error("Sign-up process failed !!!");
              }
            }}
          >
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
                    name: e.target.value,
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
                className="w-[195px] ml-[7.5rem] mt-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Register
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
