import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdContentCopy } from "react-icons/md";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "swiper/css/bundle";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import Contact from "../components/Contact";
import Headline from "../components/Headline";

export default function Listing() {
  const params = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactLanlord, setContactLanlord] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="w-[80%] max-w-6xl mx-auto px-2 h-full">
      <Headline title="Details page" />
      <Swiper
        className="w-full rounded-xl md:w-[100%] "
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="m-4 flex flex-col md:flex-row max-w-6xl mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5 w-full">
        <div className=" w-full lg-[400px] ">
          <div className="flex justify-between items-center md:justify-start">
            <p className="text-2xl font-bold mb-3 text-blue-900">
              {listing.name}
            </p>
            <div
              className="cursor-pointer  bg-white text-black border-2 border-black p-1  rounded-[50%] md:ml-3"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Copied to clipboard");
              }}
            >
              <MdContentCopy className="text-xl" />
            </div>
          </div>

          <div className="flex items-center">
            <p className=" text-gray-700  bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" ? " / month" : ""}
            </p>
            <p className="text-xl">&euro;</p>
          </div>

          <p className="flex items-center mt-4 mb-3 font-semibold  text-sm md:text-lg">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ">
              {listing.type === "rent" ? "Rent" : "Sell"}
            </p>
            {listing.offer && (
              <p className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className=" text-sm md:text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap ">
              <FaBath className=" text-sm md:text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className=" text-sm md:text-lg mr-1" />
              {listing.parking ? "Parking" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className=" text-sm md:text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLanlord && (
            <button
              onClick={() => {
                setContactLanlord(true);
              }}
              className=" mt-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Contact the property's owner
            </button>
          )}
          {contactLanlord && <Contact listing={listing} />}
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden mt-6 rounded-xl md:my-[4rem]">
          <MapContainer
            center={[listing.lat, listing.lon]}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.lat, listing.lon]}>
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
