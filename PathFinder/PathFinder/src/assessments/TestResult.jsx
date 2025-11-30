import { useEffect, useState } from "react";

function TestResult() {
  const [finalScores, setFinalScores] = useState({});
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const career = JSON.parse(localStorage.getItem("careerResults")) || {};
    const personality = JSON.parse(localStorage.getItem("personalityResults")) || {};
    const skills = JSON.parse(localStorage.getItem("skillResults")) || {};

    // Combine
    const combined = {};
    const merge = (obj) => {
      for (const k in obj) combined[k] = (combined[k] || 0) + obj[k];
    };
    merge(career); merge(personality); merge(skills);

    setFinalScores(combined);

    const a = JSON.parse(localStorage.getItem("attempts")) || [];
    setAttempts(a.reverse()); // show latest first
  }, []);

  const bestCategory = Object.keys(finalScores).length
    ? Object.keys(finalScores).reduce((a, b) => (finalScores[a] > finalScores[b] ? a : b))
    : null;

  const recommendations = {
    tech: "Software Engineer, Data Scientist, AI Engineer",
    social: "Teacher, Counselor, HR Specialist",
    creative: "Graphic Designer, UI/UX Designer, Animator",
    introvert: "Researcher, Developer, Analyst",
    extrovert: "Manager, Sales, Public Relations"
  };

  function downloadResults() {
    const user = JSON.parse(localStorage.getItem("userData")) || {};
    const content = [
      `User: ${user.email || "guest"}`,
      `Date: ${new Date().toLocaleString()}`,
      "",
      "Final Combined Scores:",
      JSON.stringify(finalScores, null, 2),
      "",
      `Top Category: ${bestCategory || "N/A"}`,
      `Recommendations: ${recommendations[bestCategory] || "N/A"}`,
    ].join("\n\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assessment-results.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function printResults() {
    window.print(); // user can choose Save as PDF in print dialog
  }

  return (
    <div>
      <h2 className="form-title">Your Test Results</h2>

      {bestCategory ? (
        <>
          <div style={{ marginBottom: 12 }}>
            <h3>Top Strength: <span style={{ color: "#1e3a8a" }}>{bestCategory.toUpperCase()}</span></h3>
            <p><strong>Suggested careers:</strong> {recommendations[bestCategory]}</p>
          </div>

          <div style={{ marginBottom: 12 }}>
            <h4>Detailed Scores</h4>
            <pre style={{ background: "#f8fafc", padding: 12, borderRadius: 8 }}>
              {JSON.stringify(finalScores, null, 2)}
            </pre>
          </div>

          <div style={{ marginTop: 8 }}>
            <button className="button" onClick={downloadResults}>Download Results (TXT)</button>
            <button className="button secondary" onClick={printResults} style={{ marginLeft: 8 }}>
              Print / Save as PDF
            </button>
          </div>
        </>
      ) : (
        <p>No test data found. Please take the assessments first.</p>
      )}

      <hr style={{ margin: "18px 0" }} />

      <h3>Attempts (latest first)</h3>
      {attempts.length === 0 && <p>No previous attempts.</p>}
      <ul>
        {attempts.map((a) => (
          <li key={a.id} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 14 }}>
              <strong>{a.type}</strong> — {a.user} — {new Date(a.date).toLocaleString()}
            </div>
            <pre style={{ fontSize: 13, background: "#fff", padding: 8 }}>{JSON.stringify(a.scores, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestResult;
