import React, { useEffect, useState } from 'react';
import './Bot.css';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Bot() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
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

  useEffect(() => {
    if (!document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to DFCC Compliance Bot</h1>
      <p>Interact with the bot in the bottom-right corner.</p>

      {userDetails ? (
        <div className="profile-card">
          <div>
          
          <br />
          <br />
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <h6>Email: {userDetails.email}</h6>
            <h6>First Name: {userDetails.firstName}</h6>
            <h6>Last Name: {userDetails.lastName}</h6>
            <h6>Mobile: {userDetails.mobile}</h6>
          </div>
          <div className="profile-buttons">

            <button className="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <df-messenger
        project-id="tokyo-analyst-431809-n3"
        agent-id="e593549a-ca6e-4b0b-b2b9-b09c0bd7430f"
        language-code="en"
        max-query-length="-1"
        allow-feedback="all"
      >
        <df-messenger-chat-bubble chat-title="DFCC Compliance Bot101"></df-messenger-chat-bubble>
      </df-messenger>
    </div>
  );
}

export default Bot;