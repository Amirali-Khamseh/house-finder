import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      // check the db to see if this account has been registered or not and if not add a document with the new data
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  }
  return (
    <button
      onClick={onGoogleClick}
      className=" bg-black  px-7 py-3  rounded-xl flex items-center justify-center w-full text-white  hover:bg-gray-700 hover:scale-90 hover:transition-all ease-in-out duration-150"
      type="button"
    >
      <FcGoogle className="text-xl mr-2 bg-white rounded" />
      Continue with Google
    </button>
  );
}

export default OAuth;
