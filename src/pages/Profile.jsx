import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [editMode, setEditMode] = useState(false);
  const formSubmit = async () => {
    try {
      //updating the auth

      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        email: formData.email,
      });
      //updating the fire store
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        name: formData.name,
        email: formData.email,
      });
      toast.success("Profile data has been updated");
    } catch (e) {
      toast.error("Something went wrong while updating data");
    }
  };
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
              disabled={!editMode}
              className={`w-full px-4 py-2 bg-white border rounded-xl transition-all ease-in-out ${
                editMode && "focus:bg-gray-700 focus:text-white"
              }`}
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
              type="text"
              value={formData.email}
              name="email"
              disabled={!editMode}
              className={`w-full px-4 py-2 my-4 bg-white border rounded-xl transition-all ease-in-out ${
                editMode && "focus:bg-gray-700 focus:text-white"
              }`}
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                });
              }}
            />
            <div className="flex justify-center items-center flex-col w-full md:flex-row md:justify-between whitespace-nowrap text-sm sm:text-base">
              <button
                type="button"
                className={`w-full my-2 md:w-auto  py-2 px-4 rounded ${
                  editMode
                    ? "bg-blue-500 text-white"
                    : " bg-green-300 text-white"
                }`}
                // className="w-full my-2 md:w-auto py-2 px-4 rounded bg-green-400"
                onClick={() => {
                  editMode && formSubmit();
                  setEditMode((prev) => !prev);
                }}
              >
                {editMode ? "Submit" : "Edit"}
              </button>
              <button
                onClick={() => {
                  auth.signOut();
                  navigate("/");
                }}
                className=" w-full  md:w-auto bg-pink-600 text-white font-semibold py-2 px-4  rounded"
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
