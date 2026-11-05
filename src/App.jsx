
import { useState, useEffect } from "react";
import "./App.css";

import AdminDashboard from "./AdminDashboard";
import TrackComplaints from "./TrackComplaints";
import ReportProblem from "./ReportProblem";
import EligibilityChecker from "./EligibilityChecker";
import SchemeFinder from "./SchemeFinder";

const districts = [
  "Ahilyanagar", "Akola", "Amravati", "Beed", "Bhandara",
  "Buldhana", "Chandrapur", "Chhatrapati Sambhajinagar",
  "Dharashiv", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
  "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City",
  "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik",
  "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri",
  "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane",
  "Wardha", "Washim", "Yavatmal"
];

const translations = {
  en: {
    tagline: "Your community. Your services. Your support.",
    welcome: "Welcome to Community Connect",
    description:
      "Making government services and community support easier for citizens across Maharashtra.",
    schemes: "Find Government Schemes",
    schemesDesc:
      "Discover schemes, check eligibility and understand how to apply.",
    eligibility: "Check Eligibility",
    eligibilityDesc:
      "Find government benefits that may match your needs.",
    report: "Report a Problem",
    reportDesc:
      "Report water, garbage, drainage and other local problems.",
    track: "Track Complaints",
    trackDesc:
      "Check the progress of complaints submitted through our platform.",
    services: "Our Main Services",
    updates: "Community Updates",
    updateText:
      "Community information and local service updates will appear here.",
    location: "Supporting communities across Maharashtra.",
    footer: "Building better communities together.",
    districtLabel: "Select your district",
    districtPlaceholder: "Choose district",
    pilot: "First pilot area: PCMC, Pune",
    explore: "Explore",
    home: "Home",
    back: "← Back to Home",
    independent:
      "Community Connect is an independent citizen-support platform, not an official government portal."
  },

  mr: {
    tagline: "तुमचा समुदाय. तुमच्या सेवा. तुमचा आधार.",
    welcome: "कम्युनिटी कनेक्टमध्ये आपले स्वागत आहे",
    description:
      "महाराष्ट्रातील नागरिकांसाठी सरकारी सेवा आणि समुदाय सहाय्य अधिक सोपे बनवणे.",
    schemes: "सरकारी योजना शोधा",
    schemesDesc: "योजना, पात्रता आणि अर्जाची माहिती मिळवा.",
    eligibility: "पात्रता तपासा",
    eligibilityDesc:
      "तुमच्यासाठी उपयुक्त ठरू शकणाऱ्या सरकारी योजनांची माहिती मिळवा.",
    report: "समस्या नोंदवा",
    reportDesc:
      "पाणी, कचरा, ड्रेनेज आणि इतर स्थानिक समस्या नोंदवा.",
    track: "तक्रारीचा मागोवा घ्या",
    trackDesc:
      "आपल्या प्लॅटफॉर्मवर नोंदवलेल्या तक्रारींची स्थिती तपासा.",
    services: "आमच्या मुख्य सेवा",
    updates: "समुदायातील अपडेट्स",
    updateText: "समुदाय आणि स्थानिक सेवांची माहिती येथे दिसेल.",
    location: "महाराष्ट्रातील समुदायांना सहाय्य.",
    footer: "चांगला समुदाय घडवण्यासाठी एकत्र येऊया.",
    districtLabel: "आपला जिल्हा निवडा",
    districtPlaceholder: "जिल्हा निवडा",
    pilot: "पहिले पायलट क्षेत्र: PCMC, पुणे",
    explore: "पहा",
    home: "मुख्यपृष्ठ",
    back: "← मुख्यपृष्ठावर परत जा",
    independent:
      "कम्युनिटी कनेक्ट हे स्वतंत्र नागरिक सहाय्य प्लॅटफॉर्म आहे. हे अधिकृत सरकारी पोर्टल नाही."
  },

  hi: {
    tagline: "आपका समुदाय। आपकी सेवाएं। आपका सहयोग।",
    welcome: "कम्युनिटी कनेक्ट में आपका स्वागत है",
    description:
      "महाराष्ट्र के नागरिकों के लिए सरकारी सेवाओं और सामुदायिक सहायता को आसान बनाना।",
    schemes: "सरकारी योजनाएं खोजें",
    schemesDesc:
      "योजनाओं, पात्रता और आवेदन की जानकारी प्राप्त करें।",
    eligibility: "पात्रता जांचें",
    eligibilityDesc:
      "अपने लिए उपयोगी हो सकने वाली सरकारी योजनाओं की जानकारी पाएं।",
    report: "समस्या दर्ज करें",
    reportDesc:
      "पानी, कचरा, जल निकासी और अन्य स्थानीय समस्याएं दर्ज करें।",
    track: "शिकायत की स्थिति देखें",
    trackDesc:
      "हमारे प्लेटफॉर्म पर दर्ज शिकायतों की स्थिति जांचें।",
    services: "हमारी मुख्य सेवाएं",
    updates: "सामुदायिक अपडेट",
    updateText: "समुदाय और स्थानीय सेवाओं की जानकारी यहां दिखाई जाएगी।",
    location: "महाराष्ट्र के समुदायों को सहायता।",
    footer: "बेहतर समुदाय बनाने के लिए मिलकर काम करें।",
    districtLabel: "अपना जिला चुनें",
    districtPlaceholder: "जिला चुनें",
    pilot: "पहला पायलट क्षेत्र: PCMC, पुणे",
    explore: "देखें",
    home: "होम",
    back: "← होम पेज पर वापस जाएं",
    independent:
      "कम्युनिटी कनेक्ट एक स्वतंत्र नागरिक सहायता प्लेटफॉर्म है, आधिकारिक सरकारी पोर्टल नहीं।"
  }
};

const serviceCards = [
  { key: "schemes", icon: "🏠", color: "green", path: "/schemes" },
  { key: "eligibility", icon: "📋", color: "blue", path: "/eligibility" },
  { key: "report", icon: "📢", color: "orange", path: "/report" },
  { key: "track", icon: "🔎", color: "purple", path: "/track" }
];

const getPageFromPath = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  const pages = {
    "/": "home",
    "/schemes": "schemes",
    "/eligibility": "eligibility",
    "/report": "report",
    "/track": "track",
    "/admin": "admin"
  };

  return pages[path] || "home";
};

function App() {
  const [language, setLanguage] = useState("en");
  const [district, setDistrict] = useState("Pune");
  const [currentPage, setCurrentPage] = useState(getPageFromPath);

  // Keep the page updated when browser Back/Forward is used.
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Navigate within the same website and browser tab.
  const navigate = (page, path) => {
    window.history.pushState({}, "", path);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (currentPage === "admin") {
    return <AdminDashboard />;
  }

  const t = translations[language];

  const serviceNames = {
    schemes: t.schemes,
    eligibility: t.eligibility,
    report: t.report,
    track: t.track
  };

  const serviceDescriptions = {
    schemes: t.schemesDesc,
    eligibility: t.eligibilityDesc,
    report: t.reportDesc,
    track: t.trackDesc
  };

  const selectedCard = serviceCards.find(
    (card) => card.key === currentPage
  );

  return (
    <div className="app">
      {/* NAVIGATION BAR */}
      <header className="navbar">
        <div
          className="brand"
          onClick={() => navigate("home", "/")}
          style={{ cursor: "pointer" }}
        >
          <span className="brand-icon">🏙️</span>
          <div>
            <h2>Community Connect</h2>
            <p>Supporting communities across Maharashtra.</p>
          </div>
        </div>

        <div className="language-selector">
          <span>🌐</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Choose language"
          >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </header>

      <main>
        {currentPage === "home" ? (
          <>
            {/* HERO SECTION */}
            <section className="hero">
              <div className="hero-content">
                <span className="location-tag">
                  📍 Maharashtra, India
                </span>

                <h1>{t.welcome}</h1>
                <p className="tagline">{t.tagline}</p>
                <p className="hero-description">
                  {t.description}
                </p>

                <button
                  className="primary-button"
                  onClick={() => navigate("schemes", "/schemes")}
                >
                  {t.schemes} →
                </button>
              </div>

              <div className="hero-illustration">🏘️</div>
            </section>

            {/* DISTRICT SELECTOR */}
            <section className="district-section">
              <div className="district-control">
                <label htmlFor="district">
                  📍 {t.districtLabel}
                </label>

                <select
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {districts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <span className="pilot-label">{t.pilot}</span>
            </section>

            {/* MAIN SERVICES */}
            <section className="services-section">
              <div className="section-heading">
                <span className="small-label">WHAT WE OFFER</span>
                <h2>{t.services}</h2>
              </div>

              <div className="service-grid">
                {serviceCards.map((card) => (
                  <button
                    className={`service-card ${card.color}`}
                    key={card.key}
                    onClick={() => navigate(card.key, card.path)}
                  >
                    <span className="service-icon">
                      {card.icon}
                    </span>

                    <h3>{serviceNames[card.key]}</h3>
                    <p>{serviceDescriptions[card.key]}</p>

                    <span className="card-link">
                      {t.explore} →
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* COMMUNITY UPDATES */}
            <section className="updates-section">
              <div>
                <span className="small-label">STAY INFORMED</span>
                <h2>{t.updates}</h2>
                <p>{t.updateText}</p>
              </div>

              <span className="updates-icon">📍</span>
            </section>
          </>
        ) : (
          <>
            {/* INDIVIDUAL SERVICE PAGE */}
            <section className="services-section">

              {/* ONLY ONE BACK TO HOME BUTTON */}
              <button
                className="secondary-button"
                onClick={() => navigate("home", "/")}
              >
                {t.back}
              </button>

              <div className="section-heading">
                <span className="small-label">
                  COMMUNITY CONNECT SERVICES
                </span>

                <h2>
                  {selectedCard
                    ? serviceNames[currentPage]
                    : "Community Connect"}
                </h2>

                <p>
                  {selectedCard
                    ? serviceDescriptions[currentPage]
                    : ""}
                </p>
              </div>

              {/* DISTRICT SELECTOR FOR RELEVANT SERVICES */}
              {["schemes", "eligibility", "report"].includes(
                currentPage
              ) && (
                <section className="district-section">
                  <div className="district-control">
                    <label htmlFor="service-district">
                      📍 {t.districtLabel}
                    </label>

                    <select
                      id="service-district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      {districts.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </section>
              )}

              {/* GOVERNMENT SCHEME FINDER */}
              {currentPage === "schemes" && (
                <SchemeFinder
                  language={language}
                  selectedDistrict={district}
                />
              )}

              {/* ELIGIBILITY CHECKER */}
              {currentPage === "eligibility" && (
                <EligibilityChecker
                  language={language}
                  selectedDistrict={district}
                />
              )}

              {/* REPORT A PROBLEM */}
              {currentPage === "report" && (
                <ReportProblem
                  key={district}
                  selectedDistrict={district}
                />
              )}

              {/* TRACK COMPLAINTS */}
              {currentPage === "track" && (
                <TrackComplaints />
              )}

            </section>
          </>
        )}

        <p className="independent-note">{t.independent}</p>
      </main>

      {/* FOOTER */}
      <footer>
        <h3>🏙️ Community Connect</h3>
        <p>{t.location}</p>
        <p>{t.footer}</p>
        <p className="copyright">
          Your City. Your Voice. Your Community.
        </p>
      </footer>
    </div>
  );
}

export default App;
