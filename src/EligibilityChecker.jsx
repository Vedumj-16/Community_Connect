
import { useEffect, useState } from "react";
import "./EligibilityChecker.css";

const schemeData = [
  {
    id: "pmay-u",
    name: "Pradhan Mantri Awas Yojana – Urban 2.0",
    level: "Central Government",
    category: "housing",
    areas: ["urban", "pcmc"],
    reason: "You selected housing support and indicated that you do not own a pucca house.",
    check: "Income category, family details, existing house ownership and other scheme conditions must be checked.",
    link: "https://pmay-urban.gov.in/"
  },
  {
    id: "pmay-g",
    name: "Pradhan Mantri Awas Yojana – Gramin",
    level: "Central Government",
    category: "housing",
    areas: ["rural"],
    reason: "You selected housing support and indicated that you do not own a pucca house.",
    check: "Rural household eligibility and the official selection process must be checked.",
    link: "https://pmayg.nic.in/"
  },
  {
    id: "mahadbt",
    name: "MahaDBT Scholarships and Freeships",
    level: "Maharashtra Government",
    category: "education",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected education support.",
    check: "Eligibility depends on the specific scholarship, course, income, category and other conditions.",
    link: "https://mahadbt.maharashtra.gov.in/"
  },
  {
    id: "nsp",
    name: "National Scholarship Portal",
    level: "Central Government",
    category: "education",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected education support.",
    check: "Each scholarship has its own academic, income and other eligibility conditions.",
    link: "https://scholarships.gov.in/"
  },
  {
    id: "pm-kisan",
    name: "PM-KISAN",
    level: "Central Government",
    category: "agriculture",
    areas: ["urban", "rural"],
    reason: "You selected agriculture support and identified as a farmer.",
    check: "Landholding records and exclusion conditions are important. Check the official portal.",
    link: "https://pmkisan.gov.in/"
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana",
    level: "Central Government",
    category: "agriculture",
    areas: ["urban", "rural"],
    reason: "You selected agriculture support and identified as a farmer.",
    check: "Crop, location, season and application dates affect availability.",
    link: "https://pmfby.gov.in/"
  },
  {
    id: "pmjay",
    name: "Ayushman Bharat – PM-JAY",
    level: "Central Government",
    category: "healthcare",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected healthcare support.",
    check: "Benefits are available to eligible families identified under the scheme. Check your eligibility officially.",
    link: "https://pmjay.gov.in/"
  },
  {
    id: "mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    level: "Central Government",
    category: "employment",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected employment or business support.",
    check: "Loan approval depends on the business proposal, lender assessment and scheme rules.",
    link: "https://www.mudra.org.in/"
  },
  {
    id: "svanidhi",
    name: "PM Street Vendor's AtmaNirbhar Nidhi",
    level: "Central Government",
    category: "employment",
    areas: ["urban", "pcmc"],
    reason: "You selected employment or business support.",
    check: "This scheme is intended for eligible street vendors. Required vendor documents must be checked.",
    link: "https://pmsvanidhi.mohua.gov.in/"
  },
  {
    id: "vishwakarma",
    name: "PM Vishwakarma",
    level: "Central Government",
    category: "employment",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected employment or business support.",
    check: "The scheme covers specified traditional trades. Trade and registration conditions apply.",
    link: "https://pmvishwakarma.gov.in/"
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme",
    level: "Central Government",
    category: "employment",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected employment or business support.",
    check: "Project cost, applicant conditions and bank approval are considered.",
    link: "https://www.kviconline.gov.in/pmegpeportal/"
  },
  {
    id: "vayoshree",
    name: "Mukhyamantri Vayoshree Yojana",
    level: "Maharashtra Government",
    category: "senior",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected support for senior citizens.",
    check: "Age, income, residence and other scheme conditions must be verified.",
    link: "https://sjsa.maharashtra.gov.in/"
  },
  {
    id: "lek-ladki",
    name: "Lek Ladki Yojana",
    level: "Maharashtra Government",
    category: "women",
    areas: ["urban", "rural", "pcmc"],
    reason: "You selected support related to women and girls.",
    check: "The scheme has specific family, date-of-birth and income conditions. Check the official rules.",
    link: "https://womenchild.maharashtra.gov.in/"
  }
];

const translations = {
  en: {
    title: "Eligibility Checker",
    subtitle: "Answer a few questions to explore schemes that may be relevant to you.",
    income: "Annual family income",
    incomeOptions: ["Select income", "Below ₹3 lakh", "₹3–6 lakh", "₹6–9 lakh", "Above ₹9 lakh"],
    area: "Your area",
    areaOptions: ["Select area", "Urban", "Rural", "PCMC"],
    house: "Do you own a pucca house?",
    yes: "Yes",
    no: "No",
    category: "What type of support do you need?",
    categoryOptions: [
      ["", "Select support"],
      ["housing", "Housing"],
      ["education", "Education"],
      ["employment", "Employment / Business"],
      ["healthcare", "Healthcare"],
      ["agriculture", "Agriculture"],
      ["women", "Women and Girls"],
      ["senior", "Senior Citizens"]
    ],
    profile: "Which description best matches the applicant?",
    profileOptions: [
      ["general", "General applicant"],
      ["student", "Student"],
      ["farmer", "Farmer"],
      ["woman", "Woman / Girl"],
      ["senior", "Senior citizen"],
      ["business", "Small business owner / Street vendor"]
    ],
    button: "Check Suggested Schemes",
    results: "Suggested Schemes",
    noResults: "No matching suggestions found for these selections.",
    change: "You can change your answers and check again.",
    reason: "Why this is suggested",
    conditions: "What you should verify",
    official: "Visit Official Website",
    level: "Government level",
    incomeNote: "Your selected income range is a factor to verify. Check the income limit for each scheme on its official website.",
    disclaimer: "Important: These are preliminary suggestions based on your answers. They do not confirm eligibility or guarantee benefits. Every scheme has its own rules, documents and application process. Always verify details through the official government website.",
    required: "Please complete the required selections before checking."
  },
  mr: {
    title: "पात्रता तपासणी",
    subtitle: "तुमच्यासाठी उपयुक्त असू शकणाऱ्या योजनांची माहिती मिळवा.",
    income: "कुटुंबाचे वार्षिक उत्पन्न",
    incomeOptions: ["उत्पन्न निवडा", "₹3 लाखांपेक्षा कमी", "₹3–6 लाख", "₹6–9 लाख", "₹9 लाखांपेक्षा जास्त"],
    area: "तुमचा परिसर",
    areaOptions: ["परिसर निवडा", "शहरी", "ग्रामीण", "PCMC"],
    house: "तुमच्या मालकीचे पक्के घर आहे का?",
    yes: "होय",
    no: "नाही",
    category: "तुम्हाला कोणत्या प्रकारची मदत हवी आहे?",
    categoryOptions: [
      ["", "मदत निवडा"], ["housing", "घरकुल"], ["education", "शिक्षण"],
      ["employment", "रोजगार / व्यवसाय"], ["healthcare", "आरोग्य"],
      ["agriculture", "शेती"], ["women", "महिला आणि मुली"], ["senior", "ज्येष्ठ नागरिक"]
    ],
    profile: "अर्जदाराची माहिती",
    profileOptions: [
      ["general", "सामान्य अर्जदार"], ["student", "विद्यार्थी"],
      ["farmer", "शेतकरी"], ["woman", "महिला / मुलगी"],
      ["senior", "ज्येष्ठ नागरिक"], ["business", "लघु व्यावसायिक / फेरीवाला"]
    ],
    button: "सुचवलेल्या योजना पहा",
    results: "सुचवलेल्या योजना",
    noResults: "या निवडीनुसार कोणतीही योजना सुचवता आली नाही.",
    change: "तुम्ही उत्तरे बदलून पुन्हा तपासू शकता.",
    reason: "ही योजना का सुचवली?",
    conditions: "काय तपासणे आवश्यक आहे",
    official: "अधिकृत वेबसाइट पहा",
    level: "शासन स्तर",
    incomeNote: "तुम्ही निवडलेले उत्पन्न प्रत्येक योजनेच्या अधिकृत उत्पन्न मर्यादेशी तपासा.",
    disclaimer: "महत्त्वाचे: ही माहिती तुमच्या उत्तरांवर आधारित प्राथमिक सूचना आहे. यामुळे पात्रता निश्चित होत नाही किंवा लाभ मिळण्याची हमी मिळत नाही. प्रत्येक योजनेचे नियम आणि कागदपत्रे वेगवेगळी असतात. अधिकृत सरकारी वेबसाइटवर माहिती तपासा.",
    required: "कृपया तपासणीपूर्वी आवश्यक पर्याय निवडा."
  },
  hi: {
    title: "पात्रता जाँच",
    subtitle: "आपके लिए उपयोगी हो सकने वाली योजनाओं के सुझाव देखें।",
    income: "परिवार की वार्षिक आय",
    incomeOptions: ["आय चुनें", "₹3 लाख से कम", "₹3–6 लाख", "₹6–9 लाख", "₹9 लाख से अधिक"],
    area: "आपका क्षेत्र",
    areaOptions: ["क्षेत्र चुनें", "शहरी", "ग्रामीण", "PCMC"],
    house: "क्या आपके पास पक्का घर है?",
    yes: "हाँ",
    no: "नहीं",
    category: "आपको किस प्रकार की सहायता चाहिए?",
    categoryOptions: [
      ["", "सहायता चुनें"], ["housing", "आवास"], ["education", "शिक्षा"],
      ["employment", "रोजगार / व्यवसाय"], ["healthcare", "स्वास्थ्य"],
      ["agriculture", "कृषि"], ["women", "महिलाएँ और लड़कियाँ"], ["senior", "वरिष्ठ नागरिक"]
    ],
    profile: "आवेदक की जानकारी",
    profileOptions: [
      ["general", "सामान्य आवेदक"], ["student", "विद्यार्थी"],
      ["farmer", "किसान"], ["woman", "महिला / लड़की"],
      ["senior", "वरिष्ठ नागरिक"], ["business", "छोटे व्यवसायी / फेरीवाले"]
    ],
    button: "सुझाई गई योजनाएँ देखें",
    results: "सुझाई गई योजनाएँ",
    noResults: "इन विकल्पों के अनुसार कोई सुझाव नहीं मिला।",
    change: "आप अपने उत्तर बदलकर फिर से जाँच सकते हैं।",
    reason: "यह योजना क्यों सुझाई गई",
    conditions: "क्या जाँचना आवश्यक है",
    official: "आधिकारिक वेबसाइट देखें",
    level: "सरकारी स्तर",
    incomeNote: "आपकी चुनी गई आय सीमा को हर योजना की आधिकारिक आय सीमा से जाँचें।",
    disclaimer: "महत्वपूर्ण: ये आपके उत्तरों के आधार पर शुरुआती सुझाव हैं। ये पात्रता की पुष्टि या लाभ की गारंटी नहीं देते। हर योजना के नियम और दस्तावेज अलग होते हैं। आधिकारिक सरकारी वेबसाइट पर जानकारी की पुष्टि करें।",
    required: "जाँच करने से पहले कृपया आवश्यक विकल्प चुनें।"
  }
};

export default function EligibilityChecker({
  language = "en",
  selectedDistrict = "Pune"
}) {
  const t = translations[language] || translations.en;
  const isPuneDistrict = selectedDistrict === "Pune";

  const [income, setIncome] = useState("");
  const [area, setArea] = useState("");
  const [house, setHouse] = useState("");
  const [category, setCategory] = useState("");
  const [profile, setProfile] = useState("general");
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPuneDistrict && area === "pcmc") {
      setArea("");
      setSuggestions(null);
    }
  }, [isPuneDistrict, area]);

  const checkSchemes = (event) => {
    event.preventDefault();

    if (!income || !area || !house || !category) {
      setError(t.required);
      setSuggestions(null);
      return;
    }

    if (area === "pcmc" && !isPuneDistrict) {
      setError(t.required);
      setSuggestions(null);
      return;
    }

    setError("");

    const matches = schemeData.filter((scheme) => {
      if (scheme.category !== category) return false;
      if (!scheme.areas.includes(area)) return false;

      if (category === "housing" && house === "yes") return false;
      if (category === "agriculture" && profile !== "farmer") return false;
      if (category === "senior" && profile !== "senior") return false;
      if (category === "women" && profile !== "woman") return false;

      if (
        category === "employment" &&
        !["business", "general"].includes(profile)
      ) return false;

      return true;
    });

    setSuggestions(matches);
  };

  return (
    <section className="eligibility-section" id="eligibility-checker">
      <div className="eligibility-heading">
        <span className="eligibility-tag">COMMUNITY SUPPORT</span>
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        <p>
          <strong>Selected district:</strong> {selectedDistrict}
        </p>
      </div>

      <form className="eligibility-form" onSubmit={checkSchemes}>
        <div className="eligibility-grid">
          <div className="eligibility-field">
            <label htmlFor="family-income">{t.income}</label>
            <select
              id="family-income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            >
              {t.incomeOptions.map((item, index) => (
                <option key={index} value={index === 0 ? "" : String(index)}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="eligibility-field">
            <label htmlFor="applicant-area">{t.area}</label>
            <select
              id="applicant-area"
              value={area}
              onChange={(e) => {
                setArea(e.target.value);
                setSuggestions(null);
              }}
              required
            >
              <option value="">{t.areaOptions[0]}</option>
              <option value="urban">{t.areaOptions[1]}</option>
              <option value="rural">{t.areaOptions[2]}</option>
              {isPuneDistrict && (
                <option value="pcmc">{t.areaOptions[3]}</option>
              )}
            </select>
          </div>

          <div className="eligibility-field">
            <label htmlFor="house-status">{t.house}</label>
            <select
              id="house-status"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="yes">{t.yes}</option>
              <option value="no">{t.no}</option>
            </select>
          </div>

          <div className="eligibility-field">
            <label htmlFor="applicant-profile">{t.profile}</label>
            <select
              id="applicant-profile"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
                setSuggestions(null);
              }}
            >
              {t.profileOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="eligibility-field eligibility-full">
            <label htmlFor="support-category">{t.category}</label>
            <select
              id="support-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSuggestions(null);
              }}
              required
            >
              {t.categoryOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="eligibility-error">{error}</p>}

        <button className="eligibility-submit" type="submit">
          {t.button}
        </button>
      </form>

      {suggestions !== null && (
        <div className="eligibility-results">
          <h3>{t.results}</h3>
          <p>{t.incomeNote}</p>

          {suggestions.length === 0 ? (
            <div className="eligibility-empty">
              <p>{t.noResults}</p>
              <p>{t.change}</p>
            </div>
          ) : (
            <div className="eligibility-results-grid">
              {suggestions.map((scheme) => (
                <article className="eligibility-card" key={scheme.id}>
                  <span className="eligibility-level">{scheme.level}</span>
                  <h4>{scheme.name}</h4>

                  <p className="eligibility-card-label">{t.reason}</p>
                  <p>{scheme.reason}</p>

                  <p className="eligibility-card-label">{t.conditions}</p>
                  <p>{scheme.check}</p>

                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.official} ↗
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="eligibility-disclaimer">
        <strong>{t.disclaimer}</strong>
      </div>
    </section>
  );
}
