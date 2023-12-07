import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  return (
    <>
      <section className="max-w-6xl mx-auto  ">
        <div
          className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
        >
          <h2 className="text-center text-xl font-semibold mx-2">My Profile</h2>
        </div>
        <div className="w-full md:w-[50%] mt-6 px-3 mx-auto">
          <form action="">
            <input
              type="text"
              value={formData.name}
              name="name"
              disabled
              className="w-full px-4 py-2 bg-white border border-gray-700 rounded-xl transition-all ease-in-out"
            />
            <input
              type="text"
              value={formData.email}
              name="email"
              disabled
              className="w-full px-4 py-2 my-4 bg-white border border-gray-700 rounded-xl transition-all ease-in-out"
            />
            <div className="flex justify-center items-center flex-col w-full md:flex-row md:justify-between whitespace-nowrap text-sm sm:text-base">
              <button class=" w-full  md:w-auto bg-transparent hover:bg-gray-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded">
                Edit
              </button>
              <button
                onClick={() => {
                  auth.signOut();
                  navigate("/");
                }}
                class=" w-full  md:w-auto bg-transparent hover:bg-gray-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded"
              >
                Sign-out
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
