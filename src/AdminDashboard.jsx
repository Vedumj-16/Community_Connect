
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import "./AdminDashboard.css";

const statuses = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved"
];

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reports, setReports] = useState([]);
  const [districtFilter, setDistrictFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const loadReports = async () => {
    const { data, error } = await supabase
      .from("community_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    setReports(data || []);
  };

  const checkAdmin = async (user) => {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setIsAdmin(false);
        setMessage("This account does not have admin access.");
        return;
      }

      setIsAdmin(true);
      await loadReports();
    } catch (error) {
      setMessage(error.message || "Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      const { data } = await supabase.auth.getSession();

      if (active && data.session) {
        setSession(data.session);
        await checkAdmin(data.session.user);
      }
    };

    initialize();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!active) return;

      setSession(newSession);

      if (!newSession) {
        setIsAdmin(false);
        setReports([]);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) throw error;

      setSession(data.session);
      await checkAdmin(data.user);
      setPassword("");
    } catch (error) {
      setMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reference, newStatus) => {
    setMessage("");

    const { error } = await supabase.rpc(
      "admin_update_report_status",
      {
        p_reference: reference,
        p_status: newStatus
      }
    );

    if (error) {
      setMessage("Unable to update status: " + error.message);
      return;
    }

    setReports((previous) =>
      previous.map((report) =>
        report.reference === reference
          ? { ...report, status: newStatus }
          : report
      )
    );

    setMessage(`Report ${reference} updated successfully.`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
    setReports([]);
    setMessage("");
  };

  const districts = [
    ...new Set(reports.map((report) => report.district))
  ];

  const categories = [
    ...new Set(reports.map((report) => report.category))
  ];

  const filteredReports = reports.filter((report) => {
    const matchesDistrict =
      districtFilter === "All" ||
      report.district === districtFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      report.category === categoryFilter;

    return matchesDistrict && matchesCategory;
  });

  if (!session) {
    return (
      <section className="admin-section">
        <div className="admin-login-card">
          <span className="admin-tag">COMMUNITY CONNECT</span>
          <h2>Admin Login</h2>
          <p>Sign in using your registered admin account.</p>

          <form onSubmit={handleLogin}>
            <label htmlFor="admin-email">Admin Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />

            {message && <p className="admin-message">{message}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (loading) {
    return <section className="admin-section">Loading dashboard...</section>;
  }

  if (!isAdmin) {
    return (
      <section className="admin-section">
        <h2>Admin Access Denied</h2>
        <p>{message}</p>
        <button onClick={handleLogout}>Logout</button>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-heading">
        <div>
          <span className="admin-tag">ADMIN PANEL</span>
          <h2>Community Reports Dashboard</h2>
          <p>View and manage reports submitted through Community Connect.</p>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-summary">
        <div>
          <h3>{reports.length}</h3>
          <p>Total Reports</p>
        </div>
        <div>
          <h3>{reports.filter((r) => r.status === "Submitted").length}</h3>
          <p>Submitted</p>
        </div>
        <div>
          <h3>{reports.filter((r) => r.status === "In Progress").length}</h3>
          <p>In Progress</p>
        </div>
        <div>
          <h3>{reports.filter((r) => r.status === "Resolved").length}</h3>
          <p>Resolved</p>
        </div>
      </div>

      <div className="admin-filters">
        <div>
          <label htmlFor="admin-district">Filter by District</label>
          <select
            id="admin-district"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="All">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="admin-category">Filter by Category</label>
          <select
            id="admin-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {message && <p className="admin-message">{message}</p>}

      <div className="admin-reports">
        {filteredReports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          filteredReports.map((report) => (
            <article className="admin-report-card" key={report.reference}>
              <div className="admin-report-top">
                <h3>{report.category}</h3>
                <strong>{report.reference}</strong>
              </div>

              <p><b>District:</b> {report.district}</p>
              <p><b>Location:</b> {report.location}</p>
              <p><b>Description:</b> {report.description}</p>
              <p>
                <b>Submitted:</b>{" "}
                {new Date(report.created_at).toLocaleString()}
              </p>

              {report.photo_url && (
                <p className="admin-photo-note">
                  A complaint photo is attached.
                </p>
              )}

              <div className="admin-status-control">
                <label htmlFor={`status-${report.reference}`}>
                  Update Status
                </label>

                <select
                  id={`status-${report.reference}`}
                  value={report.status}
                  onChange={(e) =>
                    handleStatusChange(report.reference, e.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </article>
          ))
        )}
      </div>

      <p className="admin-note">
        These reports are stored in the Community Connect database.
        Updating their status does not update any government complaint system.
      </p>
    </section>
  );
}
