import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

function ListingItem({ listing, onEdit, onDelete }) {
  const [address, setAddress] = useState("");
  // useEffect(() => {
  //   const result = fetch(
  //     `https://geocode.maps.co/reverse?lat=${listing.data.lat}&lon=${listing.data.lon}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setAddress(res));
  // }, []);

  return (
    <li className="w-[250px] relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link to={`/category/${listing.type}/${listing.id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.data.imgUrls[0]}
        />
        <Moment
          fromNow
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
        >
          {listing.data.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationPin className="h-4 w-4 text-[#3377cc]" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {address && address.display_name.substring(0, 20)}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">
            {listing.data.name.substring(0, 20)}
          </p>
          <p className="font-semibold m-0 text-basic truncate">
            {listing.data.description &&
              listing.data.description.substring(0, 20) + " ..."}
          </p>
        </div>

        <p className="m-2 font-semibold">
          &euro;
          {listing.data.offer
            ? listing.data.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.data.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {listing.data.type === "rent" && " / month"}
        </p>
        <div className="flex items-center m-[10px] ">
          <div className="flex items-center space-x-1">
            <p className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
              {listing.data.bedrooms > 1
                ? `${listing.data.bedrooms} Beds`
                : "1 Bed"}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <p className=" bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {listing.data.bathrooms > 1
                ? `${listing.data.bathrooms} Baths`
                : "1 Bath"}
            </p>
          </div>
        </div>
      </Link>
      <div className=" absolute bottom-3 right-2 flex items-center mr-4 space-x-2">
        <MdOutlineModeEditOutline
          className="text-blue-500 cursor-pointer h-[18px]"
          onClick={(id) => {
            onEdit(id);
          }}
        />
        <BsTrash
          className="text-pink-500 cursor-pointer h-[18px]"
          onClick={(id) => {
            onDelete(id);
          }}
        />
      </div>
    </li>
  );
}

export default ListingItem;
