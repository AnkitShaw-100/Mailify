import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleEmailSent = () => setRefreshKey((k) => k + 1);

  if (!auth) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <Login
        onLogin={() => setAuth(true)}
        onSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <>
      <Navbar onLogout={() => setAuth(false)} />
      <Body refreshKey={refreshKey} onEmailSent={handleEmailSent} />
      <div className="absolute w-[30%] bottom-0 right-20 z-10"></div>
    </>
  );
};

export default App;
