import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_UID = process.env.REACT_APP_ADMIN_UID;

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Checking authentication…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  if (user.uid !== ADMIN_UID) {
    return (
      <div className="container" style={{ textAlign: "center", padding: 60 }}>
        <h2>Access denied</h2>
        <p>You are signed in, but you are not authorized to view this page.</p>
        <p>
          Please sign in with the correct admin account or contact the site administrator.
        </p>
      </div>
    );
  }

  return children;
}
