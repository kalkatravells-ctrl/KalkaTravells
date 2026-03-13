const destinations = [
  // Cities
  { name: "Chandigarh", desc: "Clean & Beautiful City" },
  { name: "Delhi", desc: "Capital of India" },
  { name: "Jaipur", desc: "Pink City of Rajasthan" },
  { name: "Agra", desc: "Home of Taj Mahal" },
  { name: "Amritsar", desc: "Golden Temple City" },
  { name: "Pathankot", desc: "Gateway to Himachal" },
  { name: "Jammu & Kashmir", desc: "Paradise on Earth" },

  // Himachal Destinations
  { name: "Shimla", desc: "Queen of Hills" },
  { name: "Manali", desc: "Snow & Adventure" },
  { name: "Dharamshala", desc: "Peace & Tibetan Culture" },
  { name: "Dalhousie", desc: "Colonial Hill Station" },
  { name: "Chamba", desc: "Ancient Temples & Valleys" },
  { name: "Narkanda", desc: "Apple Orchards & Snow" },
  { name: "Chitkul", desc: "Last Village of India" },
  { name: "Spiti Valley", desc: "Cold Desert & Monasteries" },

  // Religious Destinations
  { name: "Haridwar", desc: "Gateway to the Gods" },
  { name: "Rishikesh", desc: "Yoga Capital of the World" },
  { name: "Badrinath", desc: "Sacred Char Dham" },
  { name: "Kedarnath", desc: "Holy Jyotirlinga" },
  { name: "Gangotri", desc: "Origin of River Ganga" },
  { name: "Yamunotri", desc: "Origin of River Yamuna" },
];

function Destinations() {
  return (
    <div className="container">
      <h2>Popular Destinations We Cover</h2>
      <p>Comfortable & reliable taxi services to all major tourist locations</p>

      <div className="grid">
        {destinations.map((place, index) => (
          <div key={index} className="destination-card">
            <h3>{place.name}</h3>
            <p>{place.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
