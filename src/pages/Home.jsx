import { useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { db } from "../firebase";
import { toast } from "react-toastify";
import VideoHeroSection from "../components/VideoHeroSection";
import Spinner from "../components/Spinner";
import Headline from "../components/Headline";
export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  //Fetching Discounted Properties
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        toast.error("Something wen wrong while fetching the data");
      }
    }
    fetchListings();
  }, []);
  //Fetching rent Properties
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        toast.error("Something wen wrong while fetching the data");
      }
    }
    fetchListings();
  }, []);
  //Fetching Sale Properties
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        toast.error("Something went wrong while fetching data");
      }
    }
    fetchListings();
  }, []);

  return (
    <main className="h-full w-full">
      <VideoHeroSection />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {/*Discounted properties */}

        {offerListings && offerListings.length > 0 && (
          <Headline title="Discounted properties" />
        )}
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6 flex flex-wrap justify-center items-center">
            {offerListings.map((item) => {
              return <ListingItem listing={item} key={item.id} />;
            })}
          </div>
        )}
        {offerListings && offerListings.length > 0 && (
          <div className="w-full flex justify-center items-center">
            <Link to="/offers">
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                See all offers
              </button>
            </Link>
          </div>
        )}

        {/*Rental properties */}
        {rentListings && rentListings.length > 0 && (
          <Headline title="Rental properties" />
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6 flex flex-wrap  justify-center items-center">
            {rentListings.map((item) => {
              return <ListingItem listing={item} key={item.id} />;
            })}
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="w-full flex justify-center items-center">
            <Link to="/category/rent">
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                See all rental properties
              </button>
            </Link>
          </div>
        )}

        {/*Properties for sale */}

        {saleListings && saleListings.length > 0 && (
          <Headline title="Sell properties" />
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6 flex flex-wrap  justify-center items-center">
            {saleListings.map((item) => {
              return <ListingItem listing={item} key={item.id} />;
            })}
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="w-full flex justify-center items-center">
            <Link to="/category/sell">
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                See all for sell properties
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
