import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Destinations.css";

const fallbackDestinations = [
  { name: "Chandigarh", desc: "Clean & Beautiful City", imageUrl: "https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&w=800&q=80" },
  { name: "Delhi", desc: "Capital of India", imageUrl: "https://images.unsplash.com/photo-1587474260584-1f20d4296c06?auto=format&fit=crop&w=800&q=80" },
  { name: "Jaipur", desc: "Pink City of Rajasthan", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80" },
  { name: "Agra", desc: "Home of Taj Mahal", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea023?auto=format&fit=crop&w=800&q=80" },
  { name: "Amritsar", desc: "Golden Temple City", imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80" },
  { name: "Shimla", desc: "Queen of Hills", imageUrl: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80" },
  { name: "Manali", desc: "Snow & Adventure", imageUrl: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80" },
  { name: "Dharamshala", desc: "Peace & Tibetan Culture", imageUrl: "https://images.unsplash.com/photo-1582211594533-268f4f1edeb9?auto=format&fit=crop&w=800&q=80" },
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
    <div className="destinations-container">
      {/* Hero Section */}
      <div className="destinations-hero">
        <div className="destinations-hero-overlay"></div>
        <div className="destinations-hero-content">
          <h1>Popular Destinations</h1>
          <p>Explore amazing places we cover with reliable taxi services</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="destinations-content">
        <div className="destinations-header">
          <h2>Destinations We Cover</h2>
          <p>Comfortable & reliable taxi services to all major tourist locations</p>
        </div>

        {items.length > 0 ? (
          <div className="destinations-grid">
            {items.map((place, index) => (
              <div key={place.id ?? index} className="destination-card">
                {place.imageUrl && (
                  <div className="destination-card-image">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                    />
                  </div>
                )}
                <div className="destination-card-content">
                  <div>
                    <h3>{place.name}</h3>
                    <p>{place.desc}</p>
                  </div>
                  <div className="destination-card-badge">→ Explore</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="destinations-empty">
            <h3>No destinations available</h3>
            <p>Check back soon for amazing travel destinations!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Destinations;
