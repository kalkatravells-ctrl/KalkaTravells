/**
 * seedRoutes.js — Run once to add all routes to Firebase
 * Usage: node seedRoutes.js
 * 
 * Install deps first if needed: npm install firebase
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where } = require("firebase/firestore");

// ── Firebase Config ──────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCaw1AL2X1jnIk96nRcsqO57feyPAU6iY8",
  authDomain:        "kalkatravells-e5bb0.firebaseapp.com",
  projectId:         "kalkatravells-e5bb0",
  storageBucket:     "kalkatravells-e5bb0.firebasestorage.app",
  messagingSenderId: "473304509245",
  appId:             "1:473304509245:web:7361efe7a68e452a3d3354",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── All Routes ───────────────────────────────────────────
const ROUTES = [
  // Chandigarh Routes
  { from: "Chandigarh", to: "Shimla" },
  { from: "Chandigarh", to: "Manali" },
  { from: "Chandigarh", to: "Dharamshala" },
  { from: "Chandigarh", to: "Dalhousie" },
  { from: "Chandigarh", to: "Kangra" },
  { from: "Chandigarh", to: "Palampur" },
  { from: "Chandigarh", to: "Kullu" },
  { from: "Chandigarh", to: "Kasol" },
  { from: "Chandigarh", to: "Bir Billing" },
  { from: "Chandigarh", to: "Spiti Valley" },
  { from: "Chandigarh", to: "Chamba" },
  { from: "Chandigarh", to: "Mandi" },
  { from: "Chandigarh", to: "Solan" },
  { from: "Chandigarh", to: "Kinnaur" },
  { from: "Chandigarh", to: "Narkanda" },
  { from: "Chandigarh", to: "Kufri" },
  { from: "Chandigarh", to: "Srinagar" },
  { from: "Chandigarh", to: "Gulmarg" },
  { from: "Chandigarh", to: "Pahalgam" },
  { from: "Chandigarh", to: "Sonamarg" },
  { from: "Chandigarh", to: "Patnitop" },
  { from: "Chandigarh", to: "Vaishno Devi" },
  { from: "Chandigarh", to: "Kedarnath" },
  { from: "Chandigarh", to: "Badrinath" },
  { from: "Chandigarh", to: "Haridwar" },
  { from: "Chandigarh", to: "Rishikesh" },
  { from: "Chandigarh", to: "Golden Temple" },

  // Delhi Routes
  { from: "Delhi", to: "Shimla" },
  { from: "Delhi", to: "Manali" },
  { from: "Delhi", to: "Dharamshala" },
  { from: "Delhi", to: "Dalhousie" },
  { from: "Delhi", to: "Kangra" },
  { from: "Delhi", to: "Kasol" },
  { from: "Delhi", to: "Bir Billing" },
  { from: "Delhi", to: "Spiti Valley" },
  { from: "Delhi", to: "Dehradun" },
  { from: "Delhi", to: "Mussoorie" },
  { from: "Delhi", to: "Haridwar" },
  { from: "Delhi", to: "Rishikesh" },
  { from: "Delhi", to: "Nainital" },
  { from: "Delhi", to: "Auli" },
  { from: "Delhi", to: "Lansdowne" },
  { from: "Delhi", to: "Chopta" },
  { from: "Delhi", to: "Munsiyari" },
  { from: "Delhi", to: "Jim Corbett" },
  { from: "Delhi", to: "Kedarnath" },
  { from: "Delhi", to: "Badrinath" },
  { from: "Delhi", to: "Gangotri" },
  { from: "Delhi", to: "Yamunotri" },
  { from: "Delhi", to: "Srinagar" },
  { from: "Delhi", to: "Vaishno Devi" },
  { from: "Delhi", to: "Golden Temple" },

  // Amritsar Routes
  { from: "Amritsar", to: "Dharamshala" },
  { from: "Amritsar", to: "Dalhousie" },
  { from: "Amritsar", to: "Kangra" },
  { from: "Amritsar", to: "Palampur" },
  { from: "Amritsar", to: "Pathankot" },
  { from: "Amritsar", to: "Jammu" },
  { from: "Amritsar", to: "Vaishno Devi" },
  { from: "Amritsar", to: "Patnitop" },
  { from: "Amritsar", to: "Srinagar" },
  { from: "Amritsar", to: "Gulmarg" },
  { from: "Amritsar", to: "Pahalgam" },
  { from: "Amritsar", to: "Sonamarg" },
  { from: "Amritsar", to: "Chandigarh" },

  // Jammu Routes
  { from: "Jammu", to: "Vaishno Devi" },
  { from: "Jammu", to: "Shiv Khori" },
  { from: "Jammu", to: "Patnitop" },
  { from: "Jammu", to: "Srinagar" },
  { from: "Jammu", to: "Gulmarg" },
  { from: "Jammu", to: "Pahalgam" },
  { from: "Jammu", to: "Sonamarg" },
  { from: "Jammu", to: "Doodhpathri" },
  { from: "Jammu", to: "Yusmarg" },
  { from: "Jammu", to: "Amarnath" },
  { from: "Jammu", to: "Amritsar" },

  // Pathankot Routes
  { from: "Pathankot", to: "Dharamshala" },
  { from: "Pathankot", to: "Dalhousie" },
  { from: "Pathankot", to: "Kangra" },
  { from: "Pathankot", to: "Palampur" },
  { from: "Pathankot", to: "Chamba" },
  { from: "Pathankot", to: "Bir Billing" },
  { from: "Pathankot", to: "Manali" },

  // Punjab City Routes
  { from: "Ludhiana", to: "Amritsar" },
  { from: "Ludhiana", to: "Chandigarh" },
  { from: "Ludhiana", to: "Shimla" },
  { from: "Ludhiana", to: "Manali" },
  { from: "Jalandhar", to: "Amritsar" },
  { from: "Jalandhar", to: "Pathankot" },
  { from: "Jalandhar", to: "Dharamshala" },
  { from: "Jalandhar", to: "Dalhousie" },
  { from: "Jalandhar", to: "Jammu" },
  { from: "Mohali", to: "Shimla" },
  { from: "Mohali", to: "Manali" },
  { from: "Mohali", to: "Dharamshala" },
  { from: "Patiala", to: "Chandigarh" },
  { from: "Patiala", to: "Shimla" },
  { from: "Patiala", to: "Manali" },
  { from: "Bathinda", to: "Amritsar" },
  { from: "Bathinda", to: "Chandigarh" },
];

// ── Seed Function ─────────────────────────────────────────
async function seedRoutes() {
  console.log(`\n🚀 Starting seed — ${ROUTES.length} routes to add...\n`);

  let added   = 0;
  let skipped = 0;
  let failed  = 0;

  for (const route of ROUTES) {
    try {
      // Check if route already exists (same from + to, no vehicle)
      const q = query(
        collection(db, "routes"),
        where("from", "==", route.from),
        where("to",   "==", route.to)
      );
      const existing = await getDocs(q);

      if (!existing.empty) {
        console.log(`  ⏭  Skipped (exists): ${route.from} → ${route.to}`);
        skipped++;
        continue;
      }

      await addDoc(collection(db, "routes"), {
        from:        route.from,
        to:          route.to,
        vehicleId:   "",
        vehicleName: "",
        price:       0,
        duration:    "",
        createdAt:   serverTimestamp(),
      });

      console.log(`  ✅ Added: ${route.from} → ${route.to}`);
      added++;

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 80));

    } catch (err) {
      console.error(`  ❌ Failed: ${route.from} → ${route.to} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n──────────────────────────────`);
  console.log(`✅ Added:   ${added}`);
  console.log(`⏭  Skipped: ${skipped}`);
  console.log(`❌ Failed:  ${failed}`);
  console.log(`──────────────────────────────`);
  console.log(`\n🎉 Done! Now go to Admin Panel → Routes and add prices for each route.\n`);
  process.exit(0);
}

seedRoutes().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
