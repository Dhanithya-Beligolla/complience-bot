import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaTrashAlt, FaRobot } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  const handleEdit = () => {
    // Add your edit logic here
    console.log("Edit button clicked");
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log("Delete button clicked");
  };

  return (
    <div className="profile-container  border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md shadow-md shadow-gray-400 m-5 lg:-0">
      {userDetails ? (
        <div className="profile-card">
          <div>
          <h1 className="text-center text-xl font-medium">Profile</h1>
          <br />
          <br />
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Mobile: {userDetails.mobile}</p>
          </div>
          <div className="profile-buttons">
          <div className="p-3 flex items-center justify-end gap-2">
          <button onClick={handleDelete} className="cursor-pointer text-red-700 hover:opacity-75">
            <FaTrashAlt />
          </button>
          <a href="https://compliance-bot101.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-600 hover:opacity-75">
            <FaRobot />
          </a>
          <button onClick={handleEdit} className="text-xl text-blue-600 hover:opacity-75">
            <MdEdit />
          </button>
            </div>
            <button className="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;