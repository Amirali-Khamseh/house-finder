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
import "swiper/css/bundle";
import { toast } from "react-toastify";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <main className="w-[67%] max-w-6xl mx-auto px-2 ">
      <div
        className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
      >
        <h2 className="text-center text-xl font-semibold mx-2">Details Page</h2>
      </div>
      <Swiper
        className="w-full rounded-xl md:w-[50%] "
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
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="cursor-pointer  bg-white text-black w-[35px] flex justify-center items-center h-[35px] p-2 rounded-[50%] border-gray-700 border-2 absolute top-[55%] right-[20%]  md:right-[34%] z-50"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Copied to clipboard");
        }}
      >
        <MdContentCopy className="text-xl" />
      </div>
    </main>
  );
}
