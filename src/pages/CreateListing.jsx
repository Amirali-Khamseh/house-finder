import React, { useState } from "react";

function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const onChange = () => {
    alert("hi");
  };
  return (
    <main className="max-w-6xl mx-auto px-2 ">
      <div
        className="my-4 before:border-t flex before:flex-1
             after:border-t  after:flex-1 items-center"
      >
        <h2 className="text-center text-xl font-semibold mx-2">
          Publish your offer
        </h2>
      </div>
      <form className="text-center border">
        <p className="md:text-xl font-bold text-gray-700">Sell or Rent</p>
        <div className="flex justify-center">
          <button
            type="button"
            className={`${
              formData.type === "sell" && "bg-gray-700  text-white"
            }  border-2 p-2 m-2 rounded-xl w-[33%] `}
            onClick={onChange}
          >
            Sell
          </button>

          <button
            type="button"
            className={`${
              formData.type === "rent" && "bg-gray-700  text-white "
            }  border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <p className="md:text-xl font-bold text-gray-700">Name</p>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={onChange}
          min="10"
          className="block mb-2 w-[67%] text-sm font-medium text-gray-900 dark:text-white mx-auto rounded border-none"
        />
        <div className="mx-auto  w-full  flex justify-evenly">
          <div className=" ">
            <p>Bathroom</p>
            <input
              className="w-[4rem] border-none rounded text-center"
              type="number"
              name=""
              id="bathrooms"
              max="15"
              min="1"
              value={formData.bathrooms}
              required
              onChange={onChange}
            />
          </div>
          <div className=" ">
            <p>Bedroom</p>
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
        <p className="md:text-xl font-bold text-gray-700">Parking included</p>
        <div className="flex justify-center">
          <button
            type="button"
            className={`${
              formData.parking && "bg-gray-700  text-white"
            }  border-2 p-2 m-2 rounded-xl w-[33%] `}
            onClick={onChange}
          >
            Yes
          </button>

          <button
            type="button"
            className={`${
              !formData.parking && "bg-gray-700  text-white "
            }  border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="md:text-xl font-bold text-gray-700">Furnished </p>
        <div className="flex justify-center">
          <button
            type="button"
            className={`${
              formData.furnished && "bg-gray-700  text-white"
            }  border-2 p-2 m-2 rounded-xl w-[33%] `}
            value={true}
            onClick={onChange}
          >
            Yes
          </button>

          <button
            type="button"
            className={`${
              !formData.furnished && "bg-gray-700  text-white "
            }  border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
            value={false}
          >
            No
          </button>
        </div>
        <p className="md:text-xl font-bold text-gray-700">Address</p>
        <textarea
          type="text"
          style={{ resize: "none" }}
          id="address"
          value={formData.address}
          onChange={onChange}
          min="10"
          className="block mb-2 w-[67%] text-sm font-medium text-gray-900 dark:text-white mx-auto rounded border-none"
        />
        <p className="md:text-xl font-bold text-gray-700">Description</p>
        <textarea
          type="text"
          style={{ resize: "none" }}
          id="description"
          value={formData.description}
          onChange={onChange}
          min="10"
          className="block mb-2 w-[67%] text-sm font-medium text-gray-900 dark:text-white mx-auto rounded border-none"
        />
        <p className="md:text-xl font-bold text-gray-700">Offer</p>
        <div className="flex justify-center">
          <button
            type="button"
            className={`${
              formData.offer && "bg-gray-700  text-white"
            }  border-2 p-2 m-2 rounded-xl w-[33%] `}
            value={formData.offer}
            onClick={onChange}
          >
            Yes
          </button>

          <button
            type="button"
            className={`${
              !formData.offer && "bg-gray-700  text-white "
            }  border-2 p-2 m-2 rounded-xl w-[33%]`}
            onClick={onChange}
            value={formData.offer}
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
        <div className="mb-4 flex flex-col justify-center items-center  md:mx-auto ">
          <p className="md:text-xl font-bold text-gray-700">Upload Images</p>
          <span class="  md:my-4 bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300 md:w-[50%]">
            First image will be used as a cover and maximum of 6 photos are
            allowed
          </span>
          <input
            type="file"
            name=""
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
          />
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
