import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { BsHouseAdd } from "react-icons/bs";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  //States and decleration
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [editMode, setEditMode] = useState(false);
  //Handling form submission
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
  //Fetching this Specific user's pyblished posts
  useEffect(() => {
    async function fetchData() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchData();
  }, [auth.currentUser.uid]);
  //Deleting published properties based on their id
  async function onDelete(id) {
    if (window.confirm("Do you want to delete this property ?")) {
      await deleteDoc(doc(db, "listings", id));
      const updatedList = listings.filter((item) => item.id !== id);
      setListings(updatedList);
      toast.success("Property has been deleted");
    }
  }
  function onEdit(id) {
    navigate(`/edit-listing/${id}`);
  }
  return (
    <>
      <section className="max-w-6xl mx-auto  ">
        <div
          className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
        >
          <h2 className="text-center text-xl font-semibold mx-2 text-white">
            My Profile
          </h2>
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
            <div className="flex justify-center items-center flex-col w-full md:justify-between whitespace-nowrap text-sm sm:text-base">
              <button
                type="button"
                className={
                  editMode
                    ? " w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    : "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                }
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
                className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign-out
              </button>
            </div>
          </form>
          <Link to="/create-listing">
            <button
              type="submit"
              className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-1"
            >
              <BsHouseAdd className="text-xl" />
              Publish your offer
            </button>
          </Link>
        </div>
      </section>
      <div>
        {!loading && listings.length > 0 && (
          <div className="max-w-6xl mx-auto  mt-6">
            <div
              className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
            >
              <h2 className="text-center text-xl font-semibold mx-2 text-white">
                Published offers
              </h2>
            </div>
            <ul className="flex flex-wrap justify-center">
              {listings.map((item) => (
                <ListingItem
                  listing={item}
                  key={item.id}
                  onDelete={() => onDelete(item.id)}
                  onEdit={() => onEdit(item.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
