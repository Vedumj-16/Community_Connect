
import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import "./ReportProblem.css";

const categories = [
  "Water Supply",
  "Garbage Collection",
  "Road Damage",
  "Drainage Problem",
  "Streetlight Problem",
  "Public Sanitation",
  "Other"
];

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

export default function ReportProblem({ selectedDistrict = "Pune" }) {
  const [category, setCategory] = useState("");
 const [district, setDistrict] = useState(selectedDistrict);
  const [localArea, setLocalArea] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setPhoto(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      setPhoto(null);
      return;
    }

    if (selectedFile.size > 1024 * 1024) {
      setError("Please select an image smaller than 1 MB.");
      event.target.value = "";
      setPhoto(null);
      return;
    }

    setError("");
    setPhoto(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmittedReport(null);

    if (!category || !district || !localArea.trim() || !description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (description.trim().length > 2000) {
      setError("Description must be 2000 characters or less.");
      return;
    }

    setLoading(true);

    try {
      let reference;
      let photoPath = null;
      let insertError;

      const newReport = {
        category,
        district,
        location: `${localArea.trim()}, ${district}`,
        description: description.trim(),
        status: "Submitted"
      };

      for (let attempt = 0; attempt < 5; attempt++) {
        const randomNumber = new Uint32Array(1);
        crypto.getRandomValues(randomNumber);

        reference = `CC-${10000000 + (randomNumber[0] % 90000000)}`;

        // Upload the selected photo to the private bucket.
        if (photo) {
          const extension = photo.name.split(".").pop().toLowerCase();
          photoPath = `${reference}/${crypto.randomUUID()}.${extension}`;

          const { error: uploadError } = await supabase.storage
            .from("community-photos")
            .upload(photoPath, photo, {
              contentType: photo.type,
              upsert: false
            });

          if (uploadError) {
            throw uploadError;
          }
        }

        const result = await supabase
          .from("community_reports")
          .insert([
            {
              ...newReport,
              reference,
              photo_url: photoPath
            }
          ]);

        insertError = result.error;

        if (!insertError) {
          break;
        }

        if (insertError.code !== "23505") {
          throw insertError;
        }
      }

      if (insertError) {
        throw insertError;
      }

      const savedReport = {
        ...newReport,
        reference,
        photo_url: photoPath
      };

      setSubmittedReport(savedReport);

      setCategory("");
      setDistrict(selectedDistrict);
      setLocalArea("");
      setDescription("");
      setPhoto(null);

      const fileInput = document.getElementById("report-photo");
      if (fileInput) fileInput.value = "";

    } catch (err) {
      console.error("Report submission error:", err);

      setError(
        err.message ||
        "Unable to submit your report. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="report-section" id="report-problem">
      <div className="report-heading">
        <span className="report-tag">CITIZEN PARTICIPATION</span>
        <h2>Report a Community Problem</h2>
        <p>
          Help improve your community by reporting local problems.
        </p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="report-field">
          <label htmlFor="problem-category">Problem Category *</label>
          <select
            id="problem-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select problem category</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="report-grid">
          <div className="report-field">
            <label htmlFor="report-district">District *</label>
            <select
              id="report-district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              {districts.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="report-field">
            <label htmlFor="report-area">Local Area / Landmark *</label>
            <input
              id="report-area"
              type="text"
              placeholder="Enter area or nearby landmark"
              value={localArea}
              onChange={(e) => setLocalArea(e.target.value)}
              maxLength={200}
              required
            />
          </div>
        </div>

        <div className="report-field">
          <label htmlFor="report-description">Problem Description *</label>
          <textarea
            id="report-description"
            rows="5"
            placeholder="Explain the problem and where it is happening..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={2000}
            required
          />
        </div>

        <div className="report-field">
          <label htmlFor="report-photo">Attach Photo (Optional)</label>
          <input
            id="report-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
          />
          <small>JPG, PNG or WEBP. Maximum size: 1 MB.</small>
          {photo && <small>Selected: {photo.name}</small>}
        </div>

        {error && <p className="report-error">{error}</p>}

        <button
          type="submit"
          className="report-submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      {submittedReport && (
        <div className="report-success">
          <h3>Report Submitted Successfully!</h3>
          <p>Your reference number is:</p>
          <strong>{submittedReport.reference}</strong>
          <p>
            Keep this reference number to check your report in Track Complaints.
          </p>
          {submittedReport.photo_url && (
            <p>Your photo has also been uploaded successfully.</p>
          )}
          <p className="report-demo-note">
            Your report has been saved to the Community Connect database.
            It has not been sent to a government department.
          </p>
        </div>
      )}

      <div className="report-notice">
        <strong>Note:</strong> Community Connect is an independent platform.
        Reports submitted here are stored in its database and are not
        official government complaints.
      </div>
    </section>
  );
}
