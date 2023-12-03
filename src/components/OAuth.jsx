import { FcGoogle } from "react-icons/fc";
function OAuth() {
  return (
    <button className=" bg-black  px-7 py-3  rounded-xl flex items-center justify-center w-full text-white  hover:bg-gray-700 hover:scale-90 hover:transition-all ease-in-out duration-150">
      <FcGoogle className="text-xl mr-2 bg-white rounded" />
      Continue with Google
    </button>
  );
}

export default OAuth;
