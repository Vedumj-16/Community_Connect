import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import "./TrackComplaints.css";

export default function TrackComplaints() {
  const [reference, setReference] = useState("");
  const [report, setReport] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (event) => {
    event.preventDefault();

    setError("");
    setReport(null);
    setPhotoUrl("");
    setPhotoMessage("");

    if (!reference.trim()) {
      setError("Please enter your complaint reference number.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: trackingError } = await supabase.rpc(
        "track_community_report",
        {
          p_reference: reference.trim().toUpperCase()
        }
      );

      if (trackingError) throw trackingError;

      if (!data || data.length === 0) {
        setError("No complaint found. Please check your reference number.");
        return;
      }

      const foundReport = data[0];
      setReport(foundReport);

      // Load the photo separately so photo errors do not hide complaint details.
      if (foundReport.photo_url) {
        const { data: signedData, error: photoError } =
          await supabase.storage
            .from("community-photos")
            .createSignedUrl(foundReport.photo_url, 3600);

        if (photoError) {
          console.error("Photo loading error:", photoError);
          setPhotoMessage("Photo is not available right now.");
        } else {
          setPhotoUrl(signedData.signedUrl);
        }
      }
    } catch (err) {
      console.error("Complaint tracking error:", err);
      setError(
        "Unable to load complaint details. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="track-section" id="track-complaints">
      <div className="track-heading">
        <span className="track-tag">COMPLAINT STATUS</span>
        <h2>Track Your Complaint</h2>
        <p>
          Enter your complaint reference number to check its current status.
        </p>
      </div>

      <form className="track-form" onSubmit={handleTrack}>
        <div className="track-field">
          <label htmlFor="track-reference">
            Complaint Reference Number
          </label>

          <input
            id="track-reference"
            type="text"
            placeholder="Example: CC-48273165"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>

        {error && <p className="track-error">{error}</p>}

        <button
          type="submit"
          className="track-submit"
          disabled={loading}
        >
          {loading ? "Checking..." : "Track Complaint"}
        </button>
      </form>

      {report && (
        <div className="track-result">
          <h3>Complaint Details</h3>

          <p><strong>Reference Number:</strong> {report.reference}</p>
          <p><strong>Category:</strong> {report.category}</p>
          <p><strong>District:</strong> {report.district}</p>
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Description:</strong> {report.description}</p>
          <p><strong>Status:</strong> {report.status}</p>

          <p>
            <strong>Submitted On:</strong>{" "}
            {new Date(report.created_at).toLocaleString()}
          </p>

          {report.photo_url && (
            <div className="track-photo">
              <h4>Attached Complaint Photo</h4>

              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Attached community complaint"
                  className="track-complaint-image"
                />
              ) : (
                <p>{photoMessage || "Loading photo..."}</p>
              )}
            </div>
          )}

          <p className="track-note">
            This status is maintained by Community Connect. It is not
            an official government complaint status.
          </p>
        </div>
      )}
    </section>
  );
}