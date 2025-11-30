import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <div>
      <h2 className="form-title">Admin Dashboard</h2>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/admin/manage-tests")}>
          Manage Tests (Add / Edit Questions)
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/admin/recommendations")}>
          Career Recommendations
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/career-assessment")}>
          Career Assessment Test
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/personality-test")}>
          Personality Test
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/skills-evaluation")}>
          Skills Evaluation Test
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/careers")}>
          Career List
        </button>
      </div>

      <div className="form-row">
        <button className="button secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
