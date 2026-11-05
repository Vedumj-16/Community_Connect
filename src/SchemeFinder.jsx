
import { useEffect, useState } from "react";
import "./SchemeFinder.css";

const schemes = [
  // CENTRAL GOVERNMENT SCHEMES
  {
    id: 1,
    name: "Pradhan Mantri Awas Yojana - Urban 2.0",
    category: "Housing",
    icon: "🏠",
    government: "Central Government",
    area: "Urban",
    description: "Housing assistance for eligible urban families.",
    benefits: "Financial assistance or support through the applicable housing component.",
    eligibility: "Eligible EWS, LIG and MIG urban families, subject to current scheme conditions.",
    documents: ["Aadhaar", "Income details", "Bank details", "Other documents as prescribed"],
    url: "https://pmaymis.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 2,
    name: "Pradhan Mantri Awas Yojana - Gramin",
    category: "Housing",
    icon: "🏡",
    government: "Central Government",
    area: "Rural",
    description: "Housing assistance for eligible rural households.",
    benefits: "Assistance for construction of a permanent house as per scheme rules.",
    eligibility: "Rural households identified under the applicable selection and eligibility process.",
    documents: ["Identity proof", "Bank details", "Residence details", "Other prescribed documents"],
    url: "https://pmayg.nic.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 3,
    name: "PM-KISAN Samman Nidhi",
    category: "Agriculture",
    icon: "🌾",
    government: "Central Government",
    area: "Statewide",
    description: "Income support scheme for eligible farmer families.",
    benefits: "Direct income support in instalments as prescribed by the scheme.",
    eligibility: "Eligible landholding farmer families, subject to exclusions and verification rules.",
    documents: ["Aadhaar", "Land records", "Bank account details"],
    url: "https://pmkisan.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 4,
    name: "Pradhan Mantri Fasal Bima Yojana",
    category: "Agriculture",
    icon: "🌱",
    government: "Central Government",
    area: "Statewide",
    description: "Crop insurance support for farmers against specified crop losses.",
    benefits: "Insurance protection for notified crops and risks under scheme rules.",
    eligibility: "Farmers growing notified crops in notified areas during the relevant season.",
    documents: ["Aadhaar", "Land or tenancy records", "Bank details", "Sowing details"],
    url: "https://pmfby.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 5,
    name: "Ayushman Bharat - PM-JAY",
    category: "Healthcare",
    icon: "🏥",
    government: "Central Government",
    area: "Statewide",
    description: "Health coverage for eligible beneficiary families.",
    benefits: "Cashless treatment at empanelled hospitals, subject to scheme coverage.",
    eligibility: "Eligibility is based on the applicable beneficiary database and current rules.",
    documents: ["Identity proof", "Beneficiary verification details", "Other required documents"],
    url: "https://pmjay.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 6,
    name: "Pradhan Mantri Ujjwala Yojana",
    category: "Women",
    icon: "🔥",
    government: "Central Government",
    area: "Statewide",
    description: "LPG connection support for eligible adult women from poor households.",
    benefits: "Deposit-free LPG connection support under applicable rules.",
    eligibility: "Adult women from eligible households who meet the current scheme conditions.",
    documents: ["Aadhaar", "Ration card or family details", "Bank details", "Other prescribed documents"],
    url: "https://www.pmuy.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 7,
    name: "PM SVANidhi",
    category: "Employment",
    icon: "🛍️",
    government: "Central Government",
    area: "Urban",
    description: "Working-capital support for eligible street vendors.",
    benefits: "Loan support in stages, subject to scheme rules and lending conditions.",
    eligibility: "Street vendors meeting the current identification and verification requirements.",
    documents: ["Vending certificate or identification", "Aadhaar", "Bank details"],
    url: "https://pmsvanidhi.mohua.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 8,
    name: "Pradhan Mantri MUDRA Yojana",
    category: "Employment",
    icon: "💼",
    government: "Central Government",
    area: "Statewide",
    description: "Loans through eligible lending institutions for small business activities.",
    benefits: "Business loan options under applicable MUDRA categories.",
    eligibility: "Eligible non-corporate, non-farm small and micro enterprises.",
    documents: ["Identity proof", "Address proof", "Business details", "Lender-required documents"],
    url: "https://www.mudra.org.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 9,
    name: "PM Vishwakarma Scheme",
    category: "Employment",
    icon: "🛠️",
    government: "Central Government",
    area: "Statewide",
    description: "Support for eligible traditional artisans and craftspeople.",
    benefits: "Skill training, toolkit support, and credit-related benefits under scheme rules.",
    eligibility: "Artisans in notified traditional trades who meet the scheme conditions.",
    documents: ["Aadhaar", "Bank details", "Trade and identity details"],
    url: "https://pmvishwakarma.gov.in/",
    source: "Central Government",
    verified: true
  },
  {
    id: 10,
    name: "Prime Minister's Employment Generation Programme",
    category: "Employment",
    icon: "🏭",
    government: "Central Government",
    area: "Statewide",
    description: "Support for setting up eligible new micro-enterprises.",
    benefits: "Margin-money subsidy linked to eligible project costs and applicant category.",
    eligibility: "Applicants and proposed units meeting current PMEGP guidelines.",
    documents: ["Identity proof", "Project report", "Education details if applicable", "Other prescribed documents"],
    url: "https://www.kviconline.gov.in/pmegpeportal/",
    source: "Central Government",
    verified: true
  },
  {
    id: 11,
    name: "National Scholarship Portal Schemes",
    category: "Education",
    icon: "🎓",
    government: "Central Government",
    area: "Statewide",
    description: "A collection of central scholarship schemes for eligible students.",
    benefits: "Scholarship assistance according to the selected scheme.",
    eligibility: "Varies by scholarship, education level, income and beneficiary category.",
    documents: ["Student details", "Previous marksheets", "Income or category certificate if required", "Bank details"],
    url: "https://scholarships.gov.in/",
    source: "Central Government",
    verified: true
  },

  // MAHARASHTRA GOVERNMENT SCHEMES
  {
    id: 12,
    name: "MahaDBT Scholarship and Freeship Schemes",
    category: "Education",
    icon: "📚",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Multiple scholarships, freeships and education-related benefits for eligible Maharashtra students.",
    benefits: "Tuition fee support, maintenance allowance or scholarship benefits depending on the scheme.",
    eligibility: "Depends on the department, course, income and applicant category.",
    documents: ["Aadhaar", "Admission details", "Previous marksheet", "Income or caste certificate if applicable", "Bank details"],
    url: "https://mahadbt2.maharashtra.gov.in/",
    source: "Maharashtra Government - MahaDBT",
    verified: true
  },
  {
    id: 13,
    name: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojana",
    category: "Education",
    icon: "🎓",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Education fee scholarship support for eligible students under the applicable category.",
    benefits: "Eligible tuition and examination fee support as prescribed by the scheme.",
    eligibility: "Depends on income, course, admission and current scheme rules.",
    documents: ["Income certificate", "Admission proof", "Aadhaar", "Previous marksheet"],
    url: "https://mahadbt2.maharashtra.gov.in/",
    source: "Maharashtra Government - MahaDBT",
    verified: true
  },
  {
    id: 14,
    name: "Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojana",
    category: "Education",
    icon: "🏫",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Hostel and living-expense assistance for eligible students.",
    benefits: "Maintenance allowance as per applicable course, location and eligibility rules.",
    eligibility: "Students meeting the current income, course, admission and other scheme conditions.",
    documents: ["Admission proof", "Hostel certificate if applicable", "Income certificate", "Aadhaar"],
    url: "https://mahadbt2.maharashtra.gov.in/",
    source: "Maharashtra Government - MahaDBT",
    verified: true
  },
  {
    id: 15,
    name: "Savitribai Phule Scholarship Scheme",
    category: "Education",
    icon: "👩‍🎓",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Scholarship support for eligible Scheduled Caste girl students studying in standards 5 to 10.",
    benefits: "Monthly scholarship assistance according to the applicable school standard and department rules.",
    eligibility: "Eligible Scheduled Caste girl students studying in standards 5 to 10. Confirm current conditions with the department.",
    documents: ["Student details", "School records", "Other documents required by the school or department"],
    url: "https://socialwelfare.maharashtra.gov.in/en/scheme/savitribai-phule-scholarship-scheme/",
    source: "Maharashtra Social Welfare Department",
    verified: true
  },
  {
    id: 16,
    name: "Ramai Awas Yojana",
    category: "Housing",
    icon: "🏠",
    government: "Maharashtra Government",
    area: "Rural and Urban",
    description: "Housing assistance for eligible Scheduled Caste and Neo-Buddhist families.",
    benefits: "Housing assistance as per the applicable rural or urban scheme guidelines.",
    eligibility: "Eligible beneficiaries meeting the current department rules.",
    documents: ["Caste certificate", "Income details", "Residence proof", "Other prescribed documents"],
    url: "https://sjsa.maharashtra.gov.in/en/schemes-programmes/",
    source: "Maharashtra Social Justice Department",
    verified: true
  },
  {
    id: 17,
    name: "Namo Shetkari Mahasanman Nidhi Yojana",
    category: "Agriculture",
    icon: "👨‍🌾",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Income support for eligible farmer families in Maharashtra.",
    benefits: "State-level financial assistance in addition to applicable PM-KISAN support, subject to rules.",
    eligibility: "Farmers meeting the current state scheme and PM-KISAN-related conditions.",
    documents: ["Aadhaar", "Land records", "Bank details", "PM-KISAN registration details"],
    url: "https://mahadbt.maharashtra.gov.in/",
    source: "Maharashtra Government",
    verified: true
  },
  {
    id: 18,
    name: "Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana",
    category: "Agriculture",
    icon: "🚜",
    government: "Maharashtra Government",
    area: "Rural",
    description: "Agricultural assistance for eligible farmers under the scheme.",
    benefits: "Support for specified agricultural improvements and facilities as per scheme rules.",
    eligibility: "Eligible farmers meeting category, landholding and other department conditions.",
    documents: ["Land records", "Caste certificate if applicable", "Income details", "Aadhaar"],
    url: "https://mahadbt.maharashtra.gov.in/",
    source: "Maharashtra Agriculture Department / MahaDBT",
    verified: true
  },
  {
    id: 19,
    name: "Chief Minister Vayoshree Scheme",
    category: "Senior Citizens",
    icon: "👴",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Assistance for eligible senior citizens for specified support needs.",
    benefits: "Financial assistance for eligible assistive devices or related support as per current rules.",
    eligibility: "Senior citizens meeting the current age, income and other scheme conditions.",
    documents: ["Age proof", "Aadhaar", "Income details", "Bank details"],
    url: "https://mahadbt.maharashtra.gov.in/",
    source: "Maharashtra Government",
    verified: true
  },
  {
    id: 20,
    name: "Lek Ladki Yojana",
    category: "Women",
    icon: "👧",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Financial assistance scheme for eligible girl children in Maharashtra.",
    benefits: "Financial assistance at specified stages, subject to scheme conditions.",
    eligibility: "Eligible girl children in qualifying families as per current government rules.",
    documents: ["Birth certificate", "Ration card", "Income details", "Aadhaar and other prescribed documents"],
    url: "https://womenchild.maharashtra.gov.in/",
    source: "Maharashtra Women and Child Development Department",
    verified: true
  },
  {
    id: 21,
    name: "Maharashtra Apprenticeship Promotion Scheme",
    category: "Employment",
    icon: "🧑‍💻",
    government: "Maharashtra Government",
    area: "Statewide",
    description: "Apprenticeship and skill-development support for eligible trainees.",
    benefits: "Stipend support according to the applicable apprenticeship programme.",
    eligibility: "Candidates and establishments meeting the current programme conditions.",
    documents: ["Identity proof", "Education certificate", "Bank details", "Apprenticeship registration"],
    url: "https://mahadbt.maharashtra.gov.in/",
    source: "Maharashtra Government",
    verified: true
  },

  // LOCAL GOVERNMENT SCHEMES - PCMC PILOT
  {
    id: 22,
    name: "PCMC Free Sewing Machine Assistance",
    category: "Employment",
    icon: "🧵",
    government: "Local Government",
    area: "PCMC only",
    description: "Sewing machine assistance for eligible women from economically weaker sections.",
    benefits: "Sewing machine assistance under the published PCMC scheme conditions.",
    eligibility: "Women meeting current PCMC residence, income and scheme conditions.",
    documents: ["Identity proof", "PCMC residence proof", "Income certificate", "Other prescribed documents"],
    url: "https://www.pcmcindia.gov.in/schemes.php",
    source: "PCMC",
    verified: true
  },
  {
    id: 23,
    name: "PCMC MS-CIT Computer Training Assistance",
    category: "Education",
    icon: "💻",
    government: "Local Government",
    area: "PCMC only",
    description: "Computer training fee assistance for eligible women and girls.",
    benefits: "Financial assistance towards eligible MS-CIT course fees under PCMC conditions.",
    eligibility: "Eligible women and girls meeting the published PCMC conditions. The listing mentions a 10% self-contribution.",
    documents: ["Identity proof", "Residence proof", "Education details", "Income proof"],
    url: "https://www.pcmcindia.gov.in/schemes.php",
    source: "PCMC",
    verified: true
  },
  {
    id: 24,
    name: "PCMC Free Bicycle Distribution",
    category: "Education",
    icon: "🚲",
    government: "Local Government",
    area: "PCMC only",
    description: "Bicycle assistance for eligible girls studying in standards 8 to 12.",
    benefits: "Free bicycle support under the published PCMC scheme conditions.",
    eligibility: "Eligible girls in classes 8–12 from economically weaker sections, subject to PCMC rules.",
    documents: ["School certificate", "Residence proof", "Income proof", "Identity proof"],
    url: "https://www.pcmcindia.gov.in/schemes.php",
    source: "PCMC",
    verified: true
  }
];

const categories = [
  "All", "Housing", "Education", "Employment", "Healthcare",
  "Agriculture", "Women", "Senior Citizens"
];

const labels = {
  en: {
    title: "Government Scheme Finder",
    subtitle: "Explore government schemes available across Maharashtra.",
    search: "Search by scheme name, benefit or keyword...",
    all: "All Schemes",
    Housing: "Housing",
    Education: "Education",
    Employment: "Employment",
    Healthcare: "Healthcare",
    Agriculture: "Agriculture",
    Women: "Women & Child",
    "Senior Citizens": "Senior Citizens",
    details: "View Details",
    eligibility: "Eligibility",
    benefits: "Benefits",
    documents: "Documents to Check",
    apply: "Visit Official Portal",
    back: "Back to Schemes",
    verified: "Listed on an official government source",
    check: "Confirm current details with the department",
    count: "schemes found",
    empty: "No schemes found. Try another search or filter.",
    government: "Government Level",
    allGovernment: "All Government Levels",
    central: "Central Government",
    state: "Maharashtra Government",
    local: "Local Government",
    area: "Coverage",
    allAreas: "All Areas",
    statewide: "Statewide",
    urban: "Urban",
    rural: "Rural",
    note: "Community Connect is an independent information platform, not a government website. Scheme information is for guidance only. Eligibility, benefits, documents and application dates can change. Always confirm details on the official portal before applying."
  },
  mr: {
    title: "सरकारी योजना शोधा",
    subtitle: "महाराष्ट्रातील उपलब्ध सरकारी योजना शोधा.",
    search: "योजनेचे नाव किंवा लाभ शोधा...",
    all: "सर्व योजना",
    Housing: "घरकुल",
    Education: "शिक्षण",
    Employment: "रोजगार",
    Healthcare: "आरोग्य",
    Agriculture: "शेती",
    Women: "महिला व बालकल्याण",
    "Senior Citizens": "ज्येष्ठ नागरिक",
    details: "माहिती पहा",
    eligibility: "पात्रता",
    benefits: "लाभ",
    documents: "कागदपत्रे तपासा",
    apply: "अधिकृत पोर्टल पहा",
    back: "योजनांकडे परत जा",
    verified: "अधिकृत सरकारी स्रोतावर यादी उपलब्ध",
    check: "विभागाकडून सध्याची माहिती तपासा",
    count: "योजना आढळल्या",
    empty: "योजना सापडली नाही. पुन्हा शोधा.",
    government: "सरकारचा स्तर",
    allGovernment: "सर्व सरकारी स्तर",
    central: "केंद्र सरकार",
    state: "महाराष्ट्र सरकार",
    local: "स्थानिक सरकार",
    area: "क्षेत्र",
    allAreas: "सर्व क्षेत्रे",
    statewide: "संपूर्ण महाराष्ट्र",
    urban: "शहरी",
    rural: "ग्रामीण",
    note: "Community Connect हे स्वतंत्र माहिती व्यासपीठ आहे; सरकारी वेबसाइट नाही. अर्ज करण्यापूर्वी अधिकृत पोर्टलवर पात्रता व सध्याचे नियम तपासा."
  },
  hi: {
    title: "सरकारी योजना खोजें",
    subtitle: "महाराष्ट्र में उपलब्ध सरकारी योजनाएं खोजें।",
    search: "योजना का नाम या लाभ खोजें...",
    all: "सभी योजनाएं",
    Housing: "आवास",
    Education: "शिक्षा",
    Employment: "रोजगार",
    Healthcare: "स्वास्थ्य",
    Agriculture: "कृषि",
    Women: "महिला एवं बाल कल्याण",
    "Senior Citizens": "वरिष्ठ नागरिक",
    details: "जानकारी देखें",
    eligibility: "पात्रता",
    benefits: "लाभ",
    documents: "दस्तावेज जांचें",
    apply: "आधिकारिक पोर्टल देखें",
    back: "योजनाओं पर वापस जाएं",
    verified: "आधिकारिक सरकारी स्रोत पर सूची उपलब्ध",
    check: "विभाग से वर्तमान जानकारी जांचें",
    count: "योजनाएं मिलीं",
    empty: "कोई योजना नहीं मिली। दोबारा खोजें।",
    government: "सरकार का स्तर",
    allGovernment: "सभी सरकारी स्तर",
    central: "केंद्र सरकार",
    state: "महाराष्ट्र सरकार",
    local: "स्थानीय सरकार",
    area: "क्षेत्र",
    allAreas: "सभी क्षेत्र",
    statewide: "पूरे महाराष्ट्र में",
    urban: "शहरी",
    rural: "ग्रामीण",
    note: "Community Connect एक स्वतंत्र जानकारी मंच है, सरकारी वेबसाइट नहीं। आवेदन से पहले आधिकारिक पोर्टल पर वर्तमान नियम और पात्रता जांचें।"
  }
};

function SchemeFinder({
  language = "en",
  selectedDistrict = "Pune"
}) {
  const t = labels[language] || labels.en;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [government, setGovernment] = useState("All");
  const [area, setArea] = useState("All");
  const [localBody, setLocalBody] = useState("Outside PCMC");
  const [selected, setSelected] = useState(null);

  // Reset the local area whenever the selected district changes.
  useEffect(() => {
    setLocalBody("Outside PCMC");
  }, [selectedDistrict]);

  const filteredSchemes = schemes.filter((scheme) => {
    const searchText = (
      scheme.name + " " +
      scheme.description + " " +
      scheme.benefits + " " +
      scheme.eligibility + " " +
      scheme.category + " " +
      scheme.source
    ).toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || scheme.category === category;

    const matchesGovernment =
      government === "All" || scheme.government === government;

    const matchesArea =
      area === "All" ||
      scheme.area === area ||
      (area === "Statewide" && scheme.area === "Rural and Urban");

    const matchesDistrict =
      scheme.area !== "PCMC only" ||
      (
        selectedDistrict === "Pune" &&
        localBody === "PCMC"
      );

    return (
      matchesSearch &&
      matchesCategory &&
      matchesGovernment &&
      matchesArea &&
      matchesDistrict
    );
  });

  if (selected) {
    return (
      <section className="scheme-finder">
        <button
          className="scheme-back"
          onClick={() => setSelected(null)}
        >
          ← {t.back}
        </button>

        <div className="scheme-detail">
          <div className="scheme-detail-icon">{selected.icon}</div>
          <span className="scheme-source">{selected.source}</span>
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>

          <h3>{t.benefits}</h3>
          <p>{selected.benefits}</p>

          <h3>{t.eligibility}</h3>
          <p>{selected.eligibility}</p>

          <h3>{t.documents}</h3>
          <ul>
            {selected.documents.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>

          <p>
            <strong>{t.government}:</strong> {selected.government}
          </p>

          <p>
            <strong>{t.area}:</strong> {selected.area}
          </p>

          <p className="scheme-status">
            {selected.verified ? t.verified : t.check}
          </p>

          {selected.url && (
            <a
              className="scheme-apply"
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.apply} ↗
            </a>
          )}

          <p className="scheme-note">{t.note}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="scheme-finder">
      <div className="scheme-heading">
        <span className="small-label">
          MAHARASHTRA + CENTRAL GOVERNMENT
        </span>

        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>

        <p>
          Showing schemes for: <strong>{selectedDistrict}</strong>
        </p>

        {selectedDistrict === "Pune" && (
          <p>
            Select PCMC area below to view PCMC-specific schemes.
            These schemes apply only to eligible PCMC residents.
          </p>
        )}
      </div>

      <input
        className="scheme-search"
        type="search"
        placeholder={t.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="scheme-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "filter active" : "filter"}
            onClick={() => setCategory(item)}
          >
            {item === "All" ? t.all : t[item]}
          </button>
        ))}
      </div>

      <div className="scheme-filters">
        <select
          className="scheme-search"
          value={government}
          onChange={(e) => setGovernment(e.target.value)}
          aria-label={t.government}
        >
          <option value="All">{t.allGovernment}</option>
          <option value="Central Government">{t.central}</option>
          <option value="Maharashtra Government">{t.state}</option>
          <option value="Local Government">{t.local}</option>
        </select>

        <select
          className="scheme-search"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          aria-label={t.area}
        >
          <option value="All">{t.allAreas}</option>
          <option value="Statewide">{t.statewide}</option>
          <option value="Urban">{t.urban}</option>
          <option value="Rural">{t.rural}</option>
          <option value="PCMC only">PCMC only</option>
        </select>

        {selectedDistrict === "Pune" && (
          <select
            className="scheme-search"
            value={localBody}
            onChange={(e) => setLocalBody(e.target.value)}
            aria-label="Local area"
          >
            <option value="Outside PCMC">Outside PCMC</option>
            <option value="PCMC">PCMC area</option>
          </select>
        )}
      </div>

      <p className="scheme-count">
        {filteredSchemes.length} {t.count}
      </p>

      <div className="scheme-grid">
        {filteredSchemes.map((scheme) => (
          <article className="scheme-card" key={scheme.id}>
            <span className="scheme-card-icon">{scheme.icon}</span>

            <span className="scheme-source">{scheme.source}</span>

            <h3>{scheme.name}</h3>
            <p>{scheme.description}</p>

            <span className="scheme-category">
              {t[scheme.category] || scheme.category}
            </span>

            <p>
              <strong>{t.area}:</strong> {scheme.area}
            </p>

            <button
              className="scheme-details-button"
              onClick={() => setSelected(scheme)}
            >
              {t.details} →
            </button>
          </article>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <p className="scheme-empty">{t.empty}</p>
      )}

      <p className="scheme-note">{t.note}</p>

      <div className="scheme-note">
        <strong>Explore the complete official scheme directories:</strong>

        <ul>
          <li>
            <a
              href="https://www.myscheme.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Government of India - myScheme
            </a>
          </li>

          <li>
            <a
              href="https://mahadbt2.maharashtra.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maharashtra MahaDBT Portal
            </a>
          </li>

          <li>
            <a
              href="https://sjsa.maharashtra.gov.in/en/schemes-programmes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maharashtra Social Justice Department Schemes
            </a>
          </li>

          <li>
            <a
              href="https://www.pcmcindia.gov.in/schemes.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              PCMC Schemes
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default SchemeFinder;
