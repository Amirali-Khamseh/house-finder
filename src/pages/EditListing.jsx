import React, { useEffect, useState } from "react";
import DraggableMarker from "../components/DraggableMarker";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
//import { RxCross2 } from "react-icons/rx";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

function EditListing() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "sell",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    furnished: true,
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    lat: 0,
    lon: 0,
    address: "",
  });
  const [listing, setListing] = useState(null);

  //Autorizing the user for giving the dit and delete functionality
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [auth.currentUser.uid, listing, navigate]);
  //Fetching data to show the previous values on the form fields
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    }
    fetchData();
  }, [navigate, params.listingId]);
  //Reverse Geocoding based on the location user has specified via map interface
  useEffect(() => {
    const result = fetch(
      `https://geocode.maps.co/reverse?lat=${formData.lat}&lon=${formData.lon}`
    )
      .then((res) => res.json())
      .then((res) =>
        setFormData((prev) => {
          return {
            ...prev,
            address: res.display_name,
          };
        })
      );
  }, [formData.lat, formData.lon]);
  //Configuring lat and lon from the child component
  const handleMarkerDrag = (newPosition) => {
    setFormData((prevData) => ({
      ...prevData,
      lat: newPosition.lat,
      lon: newPosition.lng,
    }));
  };
  //Screening the changes in from
  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  //Uploading Images and generating their URLs
  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  //Form submission main function
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+formData.discountedPrice >= +formData.regularPrice) {
      toast.error("The discounted price is more than the normal price ");
      setLoading(false);
      return;
    }
    if (formData.images.length > 6) {
      toast.error("Maximum of 6 pictures are allowed");
      setLoading(false);
      return;
    }
    if (formData.lat === 0 && formData.lon === 0) {
      toast.error("Make sure you address is correct");
      setLoading(false);
      return;
    }
    const imgUrls = await Promise.all(
      [...formData.images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images could not be uploaded");
      return;
    });
    //Creating a new Object with the URL of uploaded photos
    const formDataCopy = {
      ...formData,
      imgUrls,
      userRef: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    await updateDoc(doc(db, "listings", params.listingId), formDataCopy);
    setLoading(false);
    toast.success("Property has been updated ");
    navigate(`/`);
  };
  //Spinner display function
  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-6xl mx-auto px-2 ">
      <div
        className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
      >
        <h2 className="text-center text-xl font-semibold mx-2 text-white">
          Edit your offer
        </h2>
      </div>
      <form className="text-center" onSubmit={onSubmit}>
        <p className="md:text-xl font-bold  text-white">Sell or Rent</p>
        <div className="flex justify-center">
          <button
            type="button"
            id="type"
            value="sell"
            className={`${
              formData.type === "sell" && "bg-gray-700  "
            } text-white  border-2 p-2 m-2 rounded-xl w-[33%] `}
            onClick={onChange}
          >
            Sell
          </button>

          <button
            type="button"
            id="type"
            value="rent"
            className={`${
              formData.type === "rent" && "bg-gray-700 "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <p className="md:text-xl font-bold text-white">Title</p>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={onChange}
          min="10"
          required
          className="block mb-2 w-[67%] text-sm font-medium mx-auto rounded border-none"
        />
        <div className="mx-auto  w-full  flex justify-evenly">
          <div>
            <p className="text-white">Bathroom</p>
            <input
              className="w-[4rem] border-none rounded text-center"
              type="number"
              name=""
              id="bathrooms"
              max="15"
              min="1"
              value={formData.bathrooms}
              onChange={onChange}
            />
          </div>
          <div className=" ">
            <p className="text-white">Bedroom</p>
            <input
              className="w-[4rem] border-none rounded text-center"
              type="number"
              name=""
              id="bedrooms"
              max="15"
              min="1"
              required
              value={formData.bedrooms}
              onChange={onChange}
            />
          </div>
        </div>
        <p className="md:text-xl font-bold text-white">Parking included</p>
        <div className="flex justify-center">
          <button
            id="parking"
            value={true}
            type="button"
            className={`${
              formData.parking && "bg-gray-700 "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%] `}
            onClick={onChange}
          >
            Yes
          </button>

          <button
            id="parking"
            value={false}
            type="button"
            className={`${
              !formData.parking && "bg-gray-700   "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="md:text-xl font-bold text-white">Furnished </p>
        <div className="flex justify-center">
          <button
            id="furnished"
            value={true}
            type="button"
            className={`${
              formData.furnished && "bg-gray-700 "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%] `}
            onClick={onChange}
          >
            Yes
          </button>

          <button
            id="furnished"
            value={false}
            type="button"
            className={`${
              !formData.furnished && "bg-gray-700  "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <div className="w-full">
          <p className="md:text-xl font-bold text-white">Address</p>
          <DraggableMarker
            onMarkerDrag={handleMarkerDrag}
            lat={formData.lat}
            lon={formData.lon}
          />
        </div>
        <div className="mx-auto  w-full  flex justify-evenly">
          <div
            className=" border-none rounded text-center  bg-white
            text-gray-700 text-sm p-2"
          >
            <p className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              Latitude
            </p>
            <div />
            {formData.lat.toFixed(8)}
          </div>
          <div
            className=" border-none rounded text-center  bg-white
            text-gray-700 text-sm p-2"
          >
            <p className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              Longtitude
            </p>
            <div />
            {formData.lon.toFixed(8)}
          </div>
        </div>
        <div
          className=" border-none rounded text-center  bg-white
            text-gray-700 text-sm p-2 w-[67%] mx-auto my-2"
        >
          <p className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            adress
          </p>
          <div />
          {formData.address}
        </div>

        <p className="md:text-xl font-bold text-gray-700">Description</p>
        <textarea
          type="text"
          style={{ resize: "none" }}
          id="description"
          value={formData.description}
          onChange={onChange}
          min="10"
          required
          className="block mb-2 w-[67%] text-sm font-medium  mx-auto rounded border-none"
        />
        <p className="md:text-xl font-bold text-gray-700">Offer</p>
        <div className="flex justify-center">
          <button
            type="button"
            id="offer"
            className={`${
              formData.offer && "bg-gray-700  "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%] transition ease-out `}
            value={true}
            onClick={onChange}
          >
            Yes
          </button>

          <button
            type="button"
            id="offer"
            className={`${
              !formData.offer && "bg-gray-700  "
            }  text-white border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
            value={false}
          >
            No
          </button>
        </div>
        <div className=" mb-4 flex flex-col justify-center items-center md:flex-row md:w-[50%] md:mx-auto ">
          <div className="w-full">
            <p className="md:text-xl font-bold text-gray-700">Regular Price</p>
            <input
              type="number"
              name=""
              id="regularPrice"
              className="w-[67%] border-none rounded text-center"
              value={formData.regularPrice}
              min="100"
              max="10000000"
              onChange={onChange}
            />
          </div>
          {formData.offer && (
            <div className="w-full">
              <p className="md:text-xl font-bold text-gray-700">
                Discounted Price
              </p>
              <input
                type="number"
                name=""
                id="discountedPrice"
                min="100"
                max="10000000"
                className="w-[67%] border-none rounded text-center "
                value={formData.discountedPrice}
                onChange={onChange}
              />
            </div>
          )}
        </div>
        <div className="w-[67%] flex flex-wrap mx-auto space-x-2 justify-center">
          {listing &&
            listing.imgUrls.map((item, index) => (
              <div className="relative">
                <img
                  key={index}
                  src={item}
                  alt={`Image ${index}`}
                  className="w-[150px] object-cover h-[100px]"
                />
                {/* <RxCross2
                  className="absolute top-2 right-2 bg-white text-red-500 rounded"
                  onClick={() => {
                    const modifiedPhotos = [...listing.imgUrls];
                    modifiedPhotos.splice(index, 1);
                    setListing({ ...listing, imgUrls: modifiedPhotos });
                    setFormData(listing);
                  }}
                /> */}
              </div>
            ))}
        </div>
        <div className="mb-2 flex flex-col justify-center items-center  md:mx-auto  w-full">
          <p className="md:text-xl font-bold text-gray-700">Upload Images</p>
          <span class=" bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 w-[67%] md:w-[50%] my-2">
            First image will be used as a cover and maximum of 6 photos are
            allowed to upload
          </span>
          <span class=" bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 w-[67%] md:w-[50%] my-2">
            Please ulpoad photos/photos again
          </span>
          <input
            type="file"
            name=""
            id="images"
            onChange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
            className="w-[67%] border-none rounded text-center bg-white my-2 text-gray-700 font-semibold "
          />
        </div>

        <button
          type="submit"
          className=" w-[67%] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update your offer
        </button>
      </form>
    </main>
  );
}

export default EditListing;
