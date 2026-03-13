import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fallbackDestinations = [
  { name: "Chandigarh", desc: "Clean & Beautiful City" },
  { name: "Delhi", desc: "Capital of India" },
  { name: "Jaipur", desc: "Pink City of Rajasthan" },
  { name: "Agra", desc: "Home of Taj Mahal" },
  { name: "Amritsar", desc: "Golden Temple City" },
  { name: "Shimla", desc: "Queen of Hills" },
  { name: "Manali", desc: "Snow & Adventure" },
  { name: "Dharamshala", desc: "Peace & Tibetan Culture" },
];

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const snapshot = await getDocs(collection(db, "destinations"));
        setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.warn("Failed to load destinations", err);
      }
    };

    load();
  }, []);

  const items = destinations.length ? destinations : fallbackDestinations;

  return (
    <div className="container">
      <h2>Popular Destinations We Cover</h2>
      <p>Comfortable & reliable taxi services to all major tourist locations</p>

      <div className="grid">
        {items.map((place, index) => (
          <div key={place.id ?? index} className="destination-card">
            <h3>{place.name}</h3>
            <p>{place.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
