import { FcGoogle } from "react-icons/fc";
function OAuth() {
  return (
    <button className=" bg-black  px-7 py-3  rounded-xl flex items-center justify-center w-full text-white">
      <FcGoogle className="text-xl mr-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;
