import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <div>
      <h2 className="form-title">User Dashboard</h2>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/career-assessment")}>
          Take Career Assessment
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/personality-test")}>
          Take Personality Test
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/skills-evaluation")}>
          Take Skills Evaluation Test
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/user/results")}>
          View My Results
        </button>
      </div>

      <div className="form-row">
        <button className="button" onClick={() => navigate("/careers")}>
          Explore Career List
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

export default UserDashboard;
