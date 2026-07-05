import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import bgIMG from "../Assets/bgIMG.jpg";
import whatsappIcon from "../Assets/WhatsApp_icon.png";
import "./Routes.css";
import "./RouteDetail.css";

const PHONE = "+91 9815948989";
const PHONE_DISPLAY = "+91 98159 48989";
const SITE_URL = "https://kalkatravells.in";

// ── Route-specific meta: distance, travel time, pickup points, unique content
const ROUTE_META = {
  "delhi-to-chandigarh": {
    distance: "~250 km", time: "4–5 hrs",
    waypoints: ["Delhi", "Chandigarh"],
    pickupPoints: ["IGI Airport", "Connaught Place", "Karol Bagh", "Dwarka", "Panipat NH-44"],
    highlights: ["4-lane expressway NH-44", "Smooth highway drive", "Optional Murthal dhaba stop"],
    content: [
      "The Delhi to Chandigarh taxi route runs entirely on NH-44, one of India's finest 4-lane expressways. After leaving Delhi, the cab passes through Panipat — famous for its historic battlefields — and then Karnal, known for its dairy farms and clean highway dhabas. Many travelers prefer a short break at Murthal, just after Sonipat, which is legendary for its parathas.",
      "Crossing Ambala, you enter Haryana's last stretch before the Punjab border. The road becomes noticeably greener past Ambala Cantonment. Chandigarh greets you with its wide sector roads and planned layout — a stark contrast to Delhi's busy lanes. Our drivers know every toll, fuel stop, and rest area on this stretch, making your Delhi to Chandigarh cab journey smooth from the first minute.",
      "This is one of our highest-demand routes and we operate multiple departures daily including early morning and late-night options. Whether you're traveling for a business meeting in Chandigarh or heading onward to the hills, book your Delhi to Chandigarh taxi with KalkaTravells for the most reliable and affordable ride.",
    ],
  },
  "chandigarh-to-delhi": {
    distance: "~250 km", time: "4–5 hrs",
    waypoints: ["Chandigarh", "Delhi"],
    pickupPoints: ["Chandigarh Railway Station", "Sector 17", "Sector 43 ISBT", "PGI", "Mohali Airport"],
    highlights: ["Early morning departure recommended", "Night travel available", "Drop at any Delhi location"],
    content: [
      "The Chandigarh to Delhi cab journey covers the NH-44 expressway in reverse — starting from the planned city of Chandigarh, passing through Ambala Cantonment and Karnal before arriving in the capital. Morning departures from Chandigarh typically reach Delhi well before afternoon, avoiding peak city traffic.",
      "Ambala is roughly the midpoint and a popular rest stop. The expressway between Ambala and Panipat is wide, well-lit, and toll-maintained, making it ideal for both day and night travel. Our drivers are experienced with drop-offs at IGI Airport, all major Delhi hotels, Connaught Place, Dwarka, and other Delhi NCR locations including Gurgaon and Noida.",
      "If you're heading to Delhi for a flight, we recommend booking at least 5–6 hours before departure to account for highway traffic and city congestion near Panipat. KalkaTravells offers one-way Chandigarh to Delhi taxi at transparent pricing with no hidden charges — call us anytime for instant confirmation.",
    ],
  },
  "delhi-to-manali": {
    distance: "~540 km", time: "12–14 hrs",
    waypoints: ["Delhi", "Chandigarh", "Bilaspur", "Mandi", "Kullu", "Manali"],
    pickupPoints: ["IGI Airport", "Connaught Place", "Kashmiri Gate ISBT", "Majnu Ka Tilla"],
    highlights: ["Overnight journey option", "Scenic Kullu Valley", "Rohtang Pass nearby"],
    content: [
      "The Delhi to Manali taxi is a long but breathtaking journey that most travelers do overnight to reach Manali fresh in the morning. After leaving Delhi, the route follows NH-44 through Panipat and Ambala, then branches off towards the hills via Chandigarh and Bilaspur. The landscape begins to change dramatically after Bilaspur — flat Punjab plains give way to Himachal Pradesh's forested hills.",
      "The most scenic stretch begins after Mandi, where the Beas river accompanies the highway all the way to Kullu. The Pandoh Dam near Mandi is a spectacular sight, with the reservoir flanked by steep rock faces. Through Kullu, the valley opens up into apple orchards and adventure camps before reaching Manali.",
      "Our Delhi to Manali cabs are fully sanitized and equipped for long-distance travel. We use experienced mountain drivers who know the Kullu-Manali road well, including how to navigate the narrow stretches near Aut Tunnel. Whether you're going for a honeymoon, group trip, or solo adventure, our fleet of Innova Crysta, SUV, and Tempo Traveller covers every group size.",
    ],
  },
  "chandigarh-to-manali": {
    distance: "~310 km", time: "7–9 hrs",
    waypoints: ["Chandigarh", "Bilaspur", "Sundernagar", "Mandi", "Pandoh Dam", "Kullu", "Manali"],
    pickupPoints: ["Sector 17 Bus Stand", "Railway Station", "Sector 43 ISBT", "Mohali Airport"],
    highlights: ["Via Bilaspur-Mandi highway", "Beas river views", "Kullu valley en route"],
    content: [
      "The Chandigarh to Manali taxi route is the most popular hill-station cab booking in North India during summer and winter seasons. From Chandigarh, the cab heads towards Bilaspur, passing through Ropar (Rupnagar) and crossing the Gobind Sagar reservoir — a stunning blue expanse surrounded by hills. This stretch sets the mood for the entire mountain journey.",
      "After Sundernagar and Mandi — the gateway to Himachal — the road enters the Beas river valley. Pandoh Dam is a must-see checkpoint around 25 km from Mandi; the turquoise reservoir and narrow gorge here are unforgettable. From Aut, the road enters the Kullu valley where pine forests, apple orchards, and adventure sports camps line both sides of the highway.",
      "Kullu town, famous for its Dussehra festival, is about 40 km before Manali. The final stretch to Manali is the most scenic — with snow-capped peaks visible from the highway on clear days. Our Chandigarh to Manali cabs are available in Sedan, Innova Crysta, SUV, and Tempo Traveller. Book early during peak season (May–June and December–January).",
    ],
  },
  "chandigarh-to-shimla": {
    distance: "~115 km", time: "3–4 hrs",
    waypoints: ["Chandigarh", "Kalka", "Timber Trail", "Dharampur", "Shimla"],
    pickupPoints: ["Sector 17", "Railway Station", "Sector 43 ISBT", "Panchkula", "Zirakpur"],
    highlights: ["Via Kalka-Shimla highway", "Mountain scenic drive", "Timber Trail viewpoint"],
    content: [
      "The Chandigarh to Shimla taxi route covers just 115 km but offers some of the most scenic mountain driving in Himachal Pradesh. From Chandigarh, the cab heads to Kalka — the last plains town — where the famous narrow-gauge Kalka-Shimla toy train also begins. From Kalka onwards, the road climbs steeply through thick oak and pine forests.",
      "The Timber Trail resort area near Parwanoo is a popular photo stop with its aerial ropeway and mountain views. As the cab winds up through Dharampur, Barog, and Solan, the temperature drops noticeably and the air gets noticeably fresher. The sharp hairpin bends after Solan are best navigated by our experienced mountain drivers who know every curve.",
      "Shimla, the former summer capital of British India, sits at 2,200 metres. Our Chandigarh to Shimla cab service includes drop-off at The Ridge, Cart Road, Lakkar Bazaar, or any hotel in Shimla. The route is open year-round, though fog and snowfall in December–January may slow travel time slightly. We recommend booking early morning for the clearest views.",
    ],
  },
  "shimla-to-chandigarh": {
    distance: "~115 km", time: "3–4 hrs",
    waypoints: ["Shimla", "Solan", "Barog", "Timber Trail", "Kalka", "Chandigarh"],
    pickupPoints: ["The Ridge Shimla", "Bus Stand Shimla", "Lakkar Bazaar", "Sanjauli"],
    highlights: ["Morning departures best", "Highway views en route", "Stop at Timber Trail optional"],
    content: [
      "The Shimla to Chandigarh cab is a popular downhill route that covers 115 km in about 3–4 hours. Starting from Shimla's Mall Road or bus stand, the cab descends through the winding mountain roads of Solan district — passing Barog, where the old Barog tunnel on the toy train route is a notable landmark, and Dharampur before reaching the plains.",
      "The Timber Trail area near Parwanoo is often a brief stop for passengers who want a chai and a last look at the Himalayan foothills before entering the plains. The descent from Kalka onwards is smooth and well-maintained, leading into Panchkula and then Chandigarh's familiar sectors.",
      "Our Shimla to Chandigarh taxi is ideal for those heading to Chandigarh airport or railway station for onward travel. We time departures carefully to ensure you reach your connecting transport with plenty of buffer time. All vehicles — Sedan, SUV, Innova — are fully serviced before each trip.",
    ],
  },
  "chandigarh-to-dharamshala": {
    distance: "~240 km", time: "5–6 hrs",
    waypoints: ["Chandigarh", "Ropar", "Anandpur Sahib", "Una", "Kangra", "Dharamshala"],
    pickupPoints: ["Sector 17", "Railway Station", "Sector 43 ISBT", "Mohali"],
    highlights: ["Via Pathankot bypass", "Dhauladhar range views", "McLeod Ganj nearby"],
    content: [
      "The Chandigarh to Dharamshala taxi route passes through some of Punjab and Himachal's most historically and spiritually significant towns. From Chandigarh, the cab heads towards Ropar and then through Anandpur Sahib — the holy Sikh pilgrimage town at the foothills — before crossing into Himachal Pradesh via Una.",
      "The Kangra valley stretch after Una is particularly beautiful. The Kangra Fort — one of the oldest and largest forts in the Himalayas — is visible from the highway near Kangra town. The snowcapped Dhauladhar range serves as a constant backdrop from this point onwards, growing more dramatic as you approach Dharamshala.",
      "Dharamshala, home to His Holiness the Dalai Lama and the Tibetan government-in-exile, sits at around 1,457 metres. McLeod Ganj — the upper town — is 10 km further up and is the main tourist hub. Our Chandigarh to Dharamshala cab drops you at any location in lower or upper Dharamshala, including Bhagsu, Dharamkot, and McLeod Ganj.",
    ],
  },
  "dharamshala-to-chandigarh": {
    distance: "~240 km", time: "5–6 hrs",
    waypoints: ["Dharamshala", "Kangra", "Una", "Anandpur Sahib", "Ropar", "Chandigarh"],
    pickupPoints: ["McLeod Ganj", "Dharamshala Bus Stand", "Kotwali Bazaar", "Gaggal Airport"],
    highlights: ["Via Pathankot bypass", "Smooth highway after Pathankot", "Drop anywhere in Chandigarh"],
    content: [
      "The Dharamshala to Chandigarh cab journey is a comfortable 5–6 hour drive that takes you from the Dhauladhar foothills down to the plains of Punjab and Chandigarh. Leaving Dharamshala, the road descends through Kangra — home to one of the oldest forts in the Himalayas — and the scenic Kangra valley with its tea gardens and paddy fields.",
      "After crossing Una, you enter Punjab and the highway smoothens considerably. Anandpur Sahib, the historic Sikh pilgrimage town where Guru Gobind Singh founded the Khalsa, is a notable point along the route. Many passengers request a brief stop here. From Ropar, the final stretch to Chandigarh is on a wide, smooth expressway.",
      "Pickups are available from McLeod Ganj, Bhagsu Nag, Dharamshala bus stand, Kotwali Bazaar, and Gaggal Airport (Kangra Airport). This is also a popular route for those catching flights or trains from Chandigarh to other cities. Book your Dharamshala to Chandigarh taxi in advance to avoid last-minute unavailability.",
    ],
  },
  "amritsar-to-dharamshala": {
    distance: "~200 km", time: "4–5 hrs",
    waypoints: ["Amritsar", "Pathankot", "Kangra", "Dharamshala"],
    pickupPoints: ["Golden Temple", "Amritsar Airport", "Amritsar Railway Station", "Mall Road"],
    highlights: ["Scenic Kangra valley", "Dhauladhar views", "Passes through Pathankot"],
    content: [
      "The Amritsar to Dharamshala taxi route is a popular one for pilgrims who visit the Golden Temple and then head to McLeod Ganj for the Tibetan Buddhist experience. The cab leaves Amritsar on the highway towards Pathankot — a major junction town where Punjab meets Himachal Pradesh and Jammu & Kashmir.",
      "After Pathankot, the landscape shifts from flat Punjab fields to the rising Shivalik foothills of the Kangra valley. The Kangra district is famous for its ancient Kangra Fort, Masrur Rock Temple, and the Brajeshwari Devi temple. The Dhauladhar mountain range comes into full view as you approach Dharamshala.",
      "Dharamshala and McLeod Ganj are the final destination — a vibrant town with Tibetan monasteries, cafes, and trekking trails. Our Amritsar to Dharamshala cabs are available for both one-way and round-trip bookings. Pickup from Golden Temple gate, Amritsar airport, or railway station is available with advance booking.",
    ],
  },
  "chandigarh-to-amritsar": {
    distance: "~230 km", time: "4–5 hrs",
    waypoints: ["Chandigarh", "Ludhiana", "Jalandhar", "Amritsar"],
    pickupPoints: ["Sector 17", "Railway Station", "Sector 43 ISBT", "Zirakpur"],
    highlights: ["Via GT Road NH-1", "Golden Temple nearby", "Wagah Border optional"],
    content: [
      "The Chandigarh to Amritsar taxi runs along NH-1, also known as the Grand Trunk Road — one of Asia's oldest and longest roads. After leaving Chandigarh, the cab passes through Ludhiana, Punjab's industrial and commercial capital, and then Jalandhar, known for its sports goods manufacturing and religious sites.",
      "The final stretch from Jalandhar to Amritsar on the national highway is fast and well-maintained. Amritsar is best known for the Golden Temple (Sri Harmandir Sahib) — one of the most visited religious sites in the world — and the Jallianwala Bagh memorial. Many travelers also add the Wagah Border ceremony (15 km from Amritsar) to their itinerary.",
      "Our Chandigarh to Amritsar cab is available for day trips with multiple stops — Golden Temple, Wagah Border, Durgiana Temple — or straightforward point-to-point transfers. We offer Sedan, SUV, and Innova options suitable for all group sizes. Round-trip bookings with a waiting option are also available.",
    ],
  },
  "delhi-to-shimla": {
    distance: "~370 km", time: "7–8 hrs",
    waypoints: ["Delhi", "Ambala", "Chandigarh", "Kalka", "Shimla"],
    pickupPoints: ["IGI Airport", "Connaught Place", "Kashmiri Gate ISBT"],
    highlights: ["Via Chandigarh", "Scenic Kalka-Shimla highway", "Overnight option available"],
    content: [
      "The Delhi to Shimla taxi is a 370 km journey that combines the best of NH-44's expressway with Himachal Pradesh's mountain roads. After leaving Delhi through Panipat, Karnal, and Ambala, the cab enters Chandigarh — a convenient halfway stop for refreshments. From Chandigarh, the mountain ascent begins at Kalka.",
      "The Kalka to Shimla section is the most picturesque part of the journey. Winding through Dharampur, Barog, and Solan, the road climbs through dense deodar and oak forests. The Timber Trail resort near Parwanoo and the views of the Sutlej river valley near Solan make this stretch truly memorable.",
      "Shimla — at 2,200 metres above sea level — is the final stop. Our Delhi to Shimla cab service is ideal for families on holiday, corporate groups, and solo travelers. We offer both daytime and overnight departure options. The overnight departure from Delhi (around 10 PM) gets you to Shimla by morning, maximizing your vacation time.",
    ],
  },
  "dharamshala-to-shimla": {
    distance: "~250 km", time: "6–7 hrs",
    waypoints: ["Dharamshala", "Kangra", "Hamirpur", "Mandi", "Sundernagar", "Shimla"],
    pickupPoints: ["McLeod Ganj", "Dharamshala Bus Stand", "Kotwali Bazaar", "Dharamshala Cricket Stadium"],
    highlights: ["Via Mandi-Sundernagar highway", "Scenic Himachal roads", "Kangra Valley views"],
    content: [
      "The Dharamshala to Shimla taxi route passes through the heart of Himachal Pradesh, offering a rich cross-section of the state's geography and culture. After descending from Dharamshala through the Kangra valley — famous for its ancient temples, tea gardens, and the Kangra Fort — the route heads towards Hamirpur, one of Himachal's most literate districts.",
      "From Hamirpur, the cab continues through Sundernagar, passing the large Sundernagar Lake reservoir that supplies water to parts of Himachal. The road then enters Mandi district — often called the 'Varanasi of the Hills' for its 81 temples. Mandi town is a worthwhile brief stop if time allows.",
      "The final stretch from Sundernagar to Shimla passes through Tattapani (famous for its hot springs on the Sutlej river) before climbing steeply to Shimla. This inter-hill journey gives a completely different experience compared to routes from the plains — every bend reveals another valley or mountain range. Perfect for travelers exploring multiple Himachal destinations.",
    ],
  },
  "shimla-to-dharamshala": {
    distance: "~250 km", time: "6–7 hrs",
    waypoints: ["Shimla", "Sundernagar", "Mandi", "Hamirpur", "Kangra", "Dharamshala"],
    pickupPoints: ["The Ridge Shimla", "Bus Stand Shimla", "Lakkar Bazaar", "Sanjauli"],
    highlights: ["Via Sundernagar-Mandi highway", "Mountain views throughout", "Passes through Bilaspur"],
    content: [
      "The Shimla to Dharamshala cab journey is an inter-mountain route through the diverse landscapes of Himachal Pradesh. From Shimla, the road descends through Tattapani — known for its geothermal hot springs along the Sutlej river — before entering the Mandi district. Mandi, the 'Varanasi of the Hills', is dotted with ancient stone temples and sits at a key river confluence.",
      "Continuing through Sundernagar and Hamirpur, the route eventually drops into the Kangra valley — one of Himachal's broadest and most fertile valleys. The Kangra valley is lined with tea gardens, paddy fields, and orchards, with the Dhauladhar range providing a dramatic snowy backdrop on clear days.",
      "Dharamshala and McLeod Ganj — the destination — offer a striking contrast to Shimla's British-era architecture: Tibetan monasteries, Buddhist prayer flags, and a strong Tibetan cultural presence. Our Shimla to Dharamshala taxi is ideal for travelers doing a Himachal circuit. We pick up from any point in Shimla and drop at any location in Dharamshala or McLeod Ganj.",
    ],
  },
  "dharamshala-to-manali": {
    distance: "~240 km", time: "6–8 hrs",
    waypoints: ["Dharamshala", "Palampur", "Baijnath", "Mandi", "Kullu", "Manali"],
    pickupPoints: ["McLeod Ganj", "Dharamshala Bus Stand", "Kotwali Bazaar", "Dharamshala Railway Station"],
    highlights: ["Via Palampur and Baijnath", "Beas river views from Mandi", "Kullu valley en route"],
    content: [
      "The Dharamshala to Manali taxi is one of Himachal Pradesh's most scenic inter-destination routes. Leaving Dharamshala, the cab passes through Palampur — Himachal's tea capital, where endless green tea gardens cover the hillsides with the snow-capped Dhauladhar range as a backdrop. This is arguably one of the most beautiful stretches in all of Himachal.",
      "From Palampur, the route passes through Baijnath — home to the ancient Baijnath Temple dedicated to Lord Shiva, dating back to the 13th century. The road then descends towards Mandi through the Uhl river valley, crossing the Jogindernagar area known for its miniature railway and hydroelectric projects.",
      "After Mandi, the Beas river becomes the constant companion as the road enters the Kullu valley. Pandoh Dam, Aut Tunnel, and the wide Kullu valley with its apple orchards and adventure camps await before the final approach to Manali. Our Dharamshala to Manali cab uses experienced hill drivers and is available in Innova, SUV, and Sedan.",
    ],
  },
  "manali-to-dharamshala": {
    distance: "~240 km", time: "6–8 hrs",
    waypoints: ["Manali", "Kullu", "Pandoh Dam", "Mandi", "Baijnath", "Palampur", "Dharamshala"],
    pickupPoints: ["Mall Road Manali", "Manali Bus Stand", "Old Manali", "Solang Valley"],
    highlights: ["Via Kullu valley", "Pandoh Dam views", "Palampur tea gardens"],
    content: [
      "The Manali to Dharamshala cab journey is the reverse of one of Himachal's finest routes — and equally spectacular. Leaving Manali's alpine meadows, the cab descends through the Kullu valley, passing fruit orchards, adventure camps, and the Beas river. Kullu town — famous for its annual Dussehra festival and shawl weaving — is roughly 40 km from Manali.",
      "The Pandoh Dam, visible just before Mandi, is a striking man-made reservoir carved into a narrow gorge. Mandi is a natural rest stop — its old bazaar and riverside temples are worth a quick visit. After Mandi, the route heads towards Baijnath, passing through Jogindernagar and the lush Uhl river valley.",
      "Baijnath's ancient Shiva temple and Palampur's sprawling tea gardens are the highlights of the second half of the journey. The tea estates of Palampur, spread across gentle slopes with the Dhauladhar peaks behind them, are genuinely stunning. Dharamshala is the final destination — a drop at McLeod Ganj, Dharamkot, or Bhagsu Nag can be arranged easily.",
    ],
  },
};

function getRouteMeta(slug) {
  return ROUTE_META[slug] || {
    distance: "Contact for details", time: "Contact for details",
    waypoints: [],
    pickupPoints: ["City Centre", "Airport", "Railway Station", "Bus Stand"],
    highlights: ["Experienced driver", "Comfortable cab", "Scenic route"],
    content: null, // will use generic content
  };
}

// Reusable customer reviews
const REVIEWS = [
  {
    name: "Rahul Sharma", rating: 5, location: "Delhi",
    text: "Excellent service! Driver was on time, car was clean and AC was working perfectly. Will book again.",
  },
  {
    name: "Priya Verma", rating: 5, location: "Chandigarh",
    text: "Very comfortable journey. Driver was polite and knew all the routes. Highly recommended!",
  },
  {
    name: "Amit Malhotra", rating: 5, location: "Shimla",
    text: "Best cab service I have used. Transparent pricing, no hidden charges. Reached safely on time.",
  },
];

// Dynamic FAQs per route
function buildFAQs(from, to, meta, lowestPrice) {
  return [
    {
      q: `What is the distance from ${from} to ${to}?`,
      a: `The road distance from ${from} to ${to} is approximately ${meta.distance}. Travel time is around ${meta.time} depending on traffic and road conditions.`,
    },
    {
      q: `How much does a taxi from ${from} to ${to} cost?`,
      a: lowestPrice
        ? `KalkaTravells offers ${from} to ${to} taxi starting from Rs.${lowestPrice}. Prices vary by vehicle type. Contact us at ${PHONE_DISPLAY} for exact fare.`
        : `Please call or WhatsApp us at ${PHONE_DISPLAY} for the latest ${from} to ${to} taxi fare. We offer transparent pricing with no hidden charges.`,
    },
    {
      q: `Is one-way cab available from ${from} to ${to}?`,
      a: `Yes! KalkaTravells offers both one-way and round-trip cab options for ${from} to ${to}. One-way is more economical if you only need a single direction journey.`,
    },
    {
      q: `What vehicles are available for ${from} to ${to} route?`,
      a: `We have Sedan (Swift Dzire, Etios), SUV (Ertiga), Innova Crysta, and Tempo Traveller available on the ${from} to ${to} route. Choose based on group size and budget.`,
    },
    {
      q: `Can I book a ${from} to ${to} cab for late night travel?`,
      a: `Yes, KalkaTravells operates 24/7. You can book a ${from} to ${to} taxi at any time including early morning or late night on short notice. Call ${PHONE_DISPLAY}.`,
    },
    {
      q: `What are popular pickup points in ${from} for this route?`,
      a: `We pick up from all major points in ${from} including: ${meta.pickupPoints.join(", ")}. Door-to-door pickup is available anywhere in ${from}.`,
    },
  ];
}

// Star rating component
function Stars({ count }) {
  return (
    <span className="rd-stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

// Slug helpers (exported for use in Routes.js)
function parseSlug(slug) {
  const parts = slug.split("-to-");
  if (parts.length < 2) return null;
  const from = parts[0].replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const to = parts.slice(1).join(" to ").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return { from, to };
}

export function makeSlug(from, to) {
  return `${from.toLowerCase().replace(/\s+/g, "-")}-to-${to.toLowerCase().replace(/\s+/g, "-")}`;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function RouteDetail() {
  const { slug } = useParams();
  const parsed = parseSlug(slug || "");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRoutes, setAllRoutes] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const snap = await getDocs(collection(db, "routes"));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAllRoutes(data);
        if (parsed) {
          const matched = data.filter(
            r =>
              r.from?.toLowerCase() === parsed.from.toLowerCase() &&
              r.to?.toLowerCase() === parsed.to.toLowerCase()
          );
          setRoutes(matched);
        }
      } catch (e) {
        console.warn("Failed to load routes", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, [slug]); // eslint-disable-line

  if (!parsed) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Route not found</h2>
        <Link to="/routes" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to Routes
        </Link>
      </div>
    );
  }

  const { from, to } = parsed;
  const canonicalSlug = makeSlug(from, to);
  const meta = getRouteMeta(canonicalSlug);
  const faqs = buildFAQs(from, to, meta, routes[0]?.price || null);
  const validPrices = routes.map(r => Number(r.price)).filter(p => p > 0 && isFinite(p));
  const lowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : null;

  const pageTitle = `${from} to ${to} Taxi | One Way Cab | Kalka Travells`;
  const pageDesc = `Book ${from} to ${to} taxi service at affordable prices. One-way & round trip cabs, 24x7 support, experienced drivers and instant booking. Call ${PHONE_DISPLAY}.`;
  const pageKeywords = `${from} to ${to} taxi, ${from} to ${to} cab, ${from} ${to} taxi service, ${from} to ${to} one way cab, ${from} to ${to} taxi fare, outstation cab ${from}, taxi booking ${from}, cab service ${from} to ${to}`;
  const canonicalURL = `${SITE_URL}/routes/${canonicalSlug}`;

  const bookMsg = r =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(
      `Hi, I want to book a cab from ${from} to ${to}${r?.vehicleName ? ` in ${r.vehicleName}` : ""}. Please confirm availability.`
    )}`;

  // Sidebar: same origin, different destination
  const relatedRoutes = allRoutes
    .filter(r => r.from?.toLowerCase() === from.toLowerCase() && r.to?.toLowerCase() !== to.toLowerCase())
    .reduce((acc, r) => { if (!acc.find(x => x.to === r.to)) acc.push(r); return acc; }, [])
    .slice(0, 6);

  // Internal linking section — routes from same origin
  const routesFromSameOrigin = allRoutes
    .filter(r => r.from?.toLowerCase() === from.toLowerCase() && r.to?.toLowerCase() !== to.toLowerCase())
    .reduce((acc, r) => { if (!acc.find(x => x.to === r.to)) acc.push(r); return acc; }, [])
    .slice(0, 8);

  // Internal linking section — routes to same destination
  const routesToSameDest = allRoutes
    .filter(r => r.to?.toLowerCase() === to.toLowerCase() && r.from?.toLowerCase() !== from.toLowerCase())
    .reduce((acc, r) => { if (!acc.find(x => x.from === r.from)) acc.push(r); return acc; }, [])
    .slice(0, 8);

  // ── Schema.org JSON-LD ────────────────────────────────────────────────────
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Routes", "item": `${SITE_URL}/routes` },
          { "@type": "ListItem", "position": 3, "name": `${from} to ${to} Taxi`, "item": canonicalURL },
        ],
      },
      {
        "@type": "Organization",
        "name": "KalkaTravells",
        "url": SITE_URL,
        "logo": `${SITE_URL}/kalka-favicon.png`,
        "telephone": "+919815948989",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chandigarh",
          "addressRegion": "Punjab",
          "addressCountry": "IN",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "KalkaTravells",
        "description": `Reliable taxi and cab service for ${from} to ${to} route.`,
        "url": canonicalURL,
        "telephone": "+919815948989",
        "priceRange": "Rs.Rs.",
        "openingHours": "Mo-Su 00:00-24:00",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chandigarh",
          "addressRegion": "Punjab",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 30.7333,
          "longitude": 76.7794,
        },
      },
      {
        "@type": "Service",
        "name": `${from} to ${to} Taxi Service`,
        "description": pageDesc,
        "url": canonicalURL,
        "provider": {
          "@type": "Organization",
          "name": "KalkaTravells",
          "telephone": "+919815948989",
        },
        "areaServed": meta.waypoints.length > 0 ? meta.waypoints : [from, to],
        "serviceType": "Taxi Service",
        ...(lowestPrice && {
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": lowestPrice.toString(),
            "availability": "https://schema.org/InStock",
          },
        }),
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": REVIEWS.length.toString(),
        "bestRating": "5",
        "worstRating": "1",
        "itemReviewed": {
          "@type": "Service",
          "name": `${from} to ${to} Taxi Service`,
        },
      },
      ...REVIEWS.map(r => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": r.name },
        "reviewRating": { "@type": "Rating", "ratingValue": r.rating.toString(), "bestRating": "5" },
        "reviewBody": r.text,
        "itemReviewed": {
          "@type": "Service",
          "name": `${from} to ${to} Taxi Service`,
          "provider": { "@type": "Organization", "name": "KalkaTravells" },
        },
      })),
    ],
  };

  return (
    <div className="routes-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalURL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="routes-hero" style={{ backgroundImage: `url(${bgIMG})` }}>
        <div className="routes-hero-overlay" />
        <div className="routes-hero-content">
          <span
            className="section-tag"
            style={{
              background: "rgba(249,115,22,0.2)",
              color: "#fdba74",
              border: "1px solid rgba(249,115,22,0.4)",
            }}
          >
            Taxi Service
          </span>
          {/* Single H1 — exact keyword */}
          <h1>{from} to {to} Taxi Service</h1>
          <p>
            Comfortable, safe &amp; affordable one-way and round-trip cab. Book now — available 24/7.
          </p>
          <div className="rd-hero-badges">
            <span>📍 {meta.distance}</span>
            <span>⏱ {meta.time}</span>
            {lowestPrice && <span>💰 Starting ₹{lowestPrice}</span>}
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="rd-breadcrumb-bar">
        <div className="container">
          <ol className="rd-breadcrumb">
            <li className="rd-bc-item">
              <Link to="/" className="rd-bc-link">
                <span className="rd-bc-icon">🏠</span> Home
              </Link>
            </li>
            <li className="rd-bc-sep" aria-hidden="true">›</li>
            <li className="rd-bc-item">
              <Link to="/routes" className="rd-bc-link">Routes</Link>
            </li>
            <li className="rd-bc-sep" aria-hidden="true">›</li>
            <li className="rd-bc-item rd-bc-current" aria-current="page">
              {from} to {to} Taxi
            </li>
          </ol>
        </div>
      </nav>

      {/* ── QUICK INFO STRIP ─────────────────────────────────────────────── */}
      <div className="rd-info-strip">
        <div className="container">
          <div className="rd-info-grid">
            <div className="rd-info-item">
              <span className="rd-info-icon">🛣️</span>
              <div>
                <strong>Distance</strong>
                <p>{meta.distance}</p>
              </div>
            </div>
            <div className="rd-info-item">
              <span className="rd-info-icon">⏱️</span>
              <div>
                <strong>Travel Time</strong>
                <p>{meta.time}</p>
              </div>
            </div>
            <div className="rd-info-item">
              <span className="rd-info-icon">🚗</span>
              <div>
                <strong>Trip Type</strong>
                <p>One Way &amp; Round Trip</p>
              </div>
            </div>
            <div className="rd-info-item">
              <span className="rd-info-icon">🕐</span>
              <div>
                <strong>Availability</strong>
                <p>24/7 Any Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="rd-layout">

            {/* LEFT COLUMN */}
            <div className="rd-main">

              {/* Intro */}
              <h2 className="rd-heading">{from} to {to} Cab Booking</h2>
              <p className="rd-desc">
                Looking for a reliable <strong>{from} to {to} taxi service</strong>? KalkaTravells
                offers comfortable, safe, and affordable cab services on this route since 1999.
                Our experienced drivers ensure a smooth journey with door-to-door pickup from
                anywhere in {from}. Whether it&apos;s a one-way trip or a round trip, we have the
                right vehicle at the right price.
              </p>

              {/* Route highlights */}
              <div className="rd-highlights">
                {meta.highlights.map((h, i) => (
                  <span key={i} className="rd-highlight-badge">✓ {h}</span>
                ))}
              </div>

              {/* Route path / waypoints */}
              {meta.waypoints && meta.waypoints.length > 2 && (
                <div className="rd-waypoints">
                  <span className="rd-wp-label">Route via:</span>
                  <div className="rd-wp-path">
                    {meta.waypoints.map((wp, i) => (
                      <span key={i} className="rd-wp-item">
                        {i > 0 && <span className="rd-wp-arrow">›</span>}
                        <span className={i === 0 || i === meta.waypoints.length - 1 ? "rd-wp-city" : "rd-wp-stop"}>
                          {wp}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── FARE TABLE ───────────────────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "36px" }}>
                {from} to {to} Taxi Fare &amp; Vehicle Options
              </h3>

              {loading ? (
                <div className="routes-loading">
                  <div className="routes-spinner" />
                  <p>Loading fare details...</p>
                </div>
              ) : routes.length > 0 ? (
                <div className="rd-fare-table-wrap">
                  <table className="rd-fare-table">
                    <thead>
                      <tr>
                        <th>Vehicle Type</th>
                        <th>Capacity</th>
                        <th>Fare (One Way)</th>
                        <th>Est. Time</th>
                        <th>Book</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.map(r => (
                        <tr key={r.id}>
                          <td>
                            <span className="route-vehicle-badge">{r.vehicleName}</span>
                          </td>
                          <td className="rd-fare-cap">
                            {r.vehicleName?.toLowerCase().includes("tempo")
                              ? "12–14"
                              : r.vehicleName?.toLowerCase().includes("innova")
                              ? "6–7"
                              : r.vehicleName?.toLowerCase().includes("suv") ||
                                r.vehicleName?.toLowerCase().includes("ertiga")
                              ? "6–7"
                              : "4"}{" "}
                            passengers
                          </td>
                          <td className="rd-fare-price">
                            {r.price ? (
                              <>
                                <strong>₹{r.price}</strong>
                              </>
                            ) : (
                              <span style={{ color: "var(--gray-400)" }}>Call for price</span>
                            )}
                          </td>
                          <td>{r.duration || meta.time}</td>
                          <td>
                            <a
                              href={bookMsg(r)}
                              target="_blank"
                              rel="noreferrer"
                              className="route-book-btn"
                            >
                              <img
                                src={whatsappIcon}
                                alt="WhatsApp"
                                style={{ width: "14px", height: "14px", objectFit: "contain" }}
                              />
                              Book
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="rd-fare-note">
                    * Prices are inclusive of driver charges and fuel. Toll taxes &amp; parking extra.
                    Prices may vary based on travel date and availability.
                  </p>
                </div>
              ) : (
                <div className="rd-no-vehicle">
                  <p>Fare details not listed yet — call or WhatsApp us for an instant quote.</p>
                  <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                    <a href={`tel:${PHONE}`} className="btn btn-accent">
                      📞 Call Now
                    </a>
                    <a
                      href={bookMsg(null)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-whatsapp"
                    >
                      <img
                        src={whatsappIcon}
                        alt="WhatsApp"
                        style={{ width: "18px", height: "18px", objectFit: "contain" }}
                      />{" "}
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* ── PICKUP POINTS ────────────────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                Popular Pickup Points in {from}
              </h3>
              <div className="rd-pickup-grid">
                {meta.pickupPoints.map((p, i) => (
                  <div key={i} className="rd-pickup-item">
                    <span className="rd-pickup-dot">📍</span>
                    <span>{p}</span>
                  </div>
                ))}
                <div className="rd-pickup-item rd-pickup-custom">
                  <span className="rd-pickup-dot">🏠</span>
                  <span>Your Location (Door Pickup)</span>
                </div>
              </div>

              {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                Why Book {from} to {to} Cab with KalkaTravells?
              </h3>
              <div className="rd-features">
                {[
                  { icon: "✅", text: "Professional & verified drivers" },
                  { icon: "✅", text: "Clean, well-maintained vehicles" },
                  { icon: "✅", text: "Transparent pricing, no hidden charges" },
                  { icon: "✅", text: "Available 24/7, even on holidays" },
                  { icon: "✅", text: "One way & round trip options" },
                  { icon: "✅", text: "Door-to-door pickup & drop" },
                  { icon: "✅", text: "Experienced drivers since 1999" },
                  { icon: "✅", text: "Instant WhatsApp confirmation" },
                ].map((f, i) => (
                  <div key={i} className="rd-feature-item">
                    <span>{f.icon}</span> {f.text}
                  </div>
                ))}
              </div>

              {/* ── VEHICLE IMAGES SECTION ───────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                Available Vehicle Types
              </h3>
              <div className="rd-vehicle-types">
                {[
                  { emoji: "🚗", name: "Sedan", desc: "Swift Dzire / Etios", cap: "4 passengers", best: "Best for couples &amp; small families" },
                  { emoji: "🚙", name: "SUV / Ertiga", desc: "Maruti Ertiga", cap: "6–7 passengers", best: "Great for groups" },
                  { emoji: "🚐", name: "Innova Crysta", desc: "Toyota Innova", cap: "6–7 passengers", best: "Comfortable long trips" },
                  { emoji: "🚌", name: "Tempo Traveller", desc: "Force Traveller", cap: "12–14 passengers", best: "Best for large groups" },
                ].map((v, i) => (
                  <div key={i} className="rd-vehicle-type-card">
                    <div className="rd-vt-emoji">{v.emoji}</div>
                    <div className="rd-vt-info">
                      <strong>{v.name}</strong>
                      <span>{v.desc}</span>
                      <span className="rd-vt-cap">👥 {v.cap}</span>
                      <span
                        className="rd-vt-best"
                        dangerouslySetInnerHTML={{ __html: v.best }}
                      />
                    </div>
                    <a
                      href={bookMsg({ vehicleName: v.name })}
                      target="_blank"
                      rel="noreferrer"
                      className="route-book-btn"
                    >
                      Book
                    </a>
                  </div>
                ))}
              </div>

              {/* ── SEO CONTENT ──────────────────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                About {from} to {to} Taxi Service
              </h3>
              <div className="rd-seo-text">
                {meta.content ? (
                  // Route-specific unique content
                  meta.content.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  // Generic fallback for routes not in ROUTE_META
                  <>
                    <p>
                      KalkaTravells provides reliable <strong>{from} to {to} taxi service</strong> at
                      the most affordable rates. Whether you need a{" "}
                      <strong>{from} to {to} one way cab</strong> or a round trip, we cover all your
                      travel needs with a fleet of Sedans, SUVs, Innova Crysta, and Tempo Travellers.
                    </p>
                    <p>
                      The <strong>{from} to {to} distance</strong> is approximately {meta.distance} and
                      the journey takes around {meta.time} by road. Our drivers are well-versed with this
                      route and ensure a safe, comfortable, and timely ride every time.
                    </p>
                    <p>
                      Our <strong>{from} to {to} cab booking</strong> service is available 24/7. Simply
                      call or WhatsApp us at {PHONE_DISPLAY} to confirm your booking instantly. We offer
                      door-to-door pickup from any location in {from}.
                    </p>
                    <p>
                      All our cabs are GPS-equipped and driven by commercially licensed, experienced
                      drivers. We serve passengers across North India including Himachal Pradesh, Punjab,
                      Haryana, Delhi NCR, and Uttarakhand.
                    </p>
                  </>
                )}
              </div>

              {/* ── CUSTOMER REVIEWS ─────────────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                Customer Reviews — {from} to {to} Taxi
              </h3>
              <div className="rd-reviews">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="rd-review-card">
                    <div className="rd-review-header">
                      <div className="rd-reviewer-avatar">{r.name.charAt(0)}</div>
                      <div>
                        <strong>{r.name}</strong>
                        <span className="rd-reviewer-loc">📍 {r.location}</span>
                      </div>
                      <Stars count={r.rating} />
                    </div>
                    <p className="rd-review-text">&ldquo;{r.text}&rdquo;</p>
                  </div>
                ))}
              </div>

              {/* ── FAQs ─────────────────────────────────────────────────── */}
              <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                Frequently Asked Questions — {from} to {to} Taxi
              </h3>
              <div className="rd-faqs">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`rd-faq-item${openFaq === i ? " rd-faq-open" : ""}`}
                  >
                    <button
                      className="rd-faq-q"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{faq.q}</span>
                      <span className="rd-faq-arrow">{openFaq === i ? "▲" : "▼"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="rd-faq-a">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── INTERNAL LINKING — RELATED ROUTES ───────────────────── */}
              {(routesFromSameOrigin.length > 0 || routesToSameDest.length > 0) && (
                <div className="rd-internal-links">
                  <h3 className="rd-sub-heading" style={{ marginTop: "40px" }}>
                    Related Taxi Routes
                  </h3>

                  {routesFromSameOrigin.length > 0 && (
                    <div className="rd-link-group">
                      <h4 className="rd-link-group-title">
                        🚖 Other Taxis from {from}
                      </h4>
                      <div className="rd-link-grid">
                        {routesFromSameOrigin.map((r, i) => (
                          <Link
                            key={i}
                            to={`/routes/${makeSlug(r.from, r.to)}`}
                            className="rd-link-card"
                          >
                            <span className="rd-link-route">{r.from} → {r.to}</span>
                            {r.price && <span className="rd-link-price">₹{r.price}</span>}
                            <span className="rd-link-arrow">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {routesToSameDest.length > 0 && (
                    <div className="rd-link-group" style={{ marginTop: "20px" }}>
                      <h4 className="rd-link-group-title">
                        📍 Other Taxis to {to}
                      </h4>
                      <div className="rd-link-grid">
                        {routesToSameDest.map((r, i) => (
                          <Link
                            key={i}
                            to={`/routes/${makeSlug(r.from, r.to)}`}
                            className="rd-link-card"
                          >
                            <span className="rd-link-route">{r.from} → {r.to}</span>
                            {r.price && <span className="rd-link-price">₹{r.price}</span>}
                            <span className="rd-link-arrow">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>{/* END rd-main */}

            {/* RIGHT SIDEBAR */}
            <div className="rd-sidebar">

              {/* Booking card */}
              <div className="rd-book-card">
                <h3>Book {from} → {to}</h3>
                <p>Get instant confirmation. Call or WhatsApp now.</p>
                {lowestPrice && (
                  <div className="rd-book-price">
                    Starting from <strong>₹{lowestPrice}</strong>
                  </div>
                )}
                <a
                  href={`tel:${PHONE}`}
                  className="btn btn-accent"
                  style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}
                >
                  📞 {PHONE_DISPLAY}
                </a>
                <a
                  href={bookMsg(null)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    style={{ width: "18px", height: "18px", objectFit: "contain" }}
                  />{" "}
                  WhatsApp Us
                </a>
                <div className="rd-book-note">
                  <span>🕐</span> Available 24/7 · Instant Booking
                </div>
              </div>

              {/* Route summary card */}
              <div className="rd-summary-card">
                <h4>Route Summary</h4>
                <div className="rd-summary-row">
                  <span>From</span>
                  <strong>{from}</strong>
                </div>
                <div className="rd-summary-row">
                  <span>To</span>
                  <strong>{to}</strong>
                </div>
                <div className="rd-summary-row">
                  <span>Distance</span>
                  <strong>{meta.distance}</strong>
                </div>
                <div className="rd-summary-row">
                  <span>Est. Time</span>
                  <strong>{meta.time}</strong>
                </div>
                <div className="rd-summary-row">
                  <span>Trip Options</span>
                  <strong>One Way &amp; Round Trip</strong>
                </div>
              </div>

              {/* Related routes */}
              {relatedRoutes.length > 0 && (
                <div className="rd-related">
                  <h4>Other Routes from {from}</h4>
                  {relatedRoutes.map((r, i) => (
                    <Link
                      key={i}
                      to={`/routes/${makeSlug(r.from, r.to)}`}
                      className="rd-related-link"
                    >
                      {r.from} → {r.to}
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              )}

            </div>{/* END rd-sidebar */}

          </div>
        </div>
      </section>

    </div>
  );
}
