import { Routes, Route } from "react-router-dom";

// Auth pages
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageTests from "./admin/ManageTests";
import CareerRecommendations from "./admin/CareerRecommendations";

// User pages
import UserDashboard from "./user/UserDashboard";
import MyResults from "./user/MyResults";

// Assessment pages
import CareerAssessment from "./assessments/CareerAssessment";
import PersonalityTest from "./assessments/PersonalityTest";
import SkillsEvaluation from "./assessments/SkillsEvaluation";
import TestResult from "./assessments/TestResult";

// Career pages
import CareerList from "./careers/CareerList";
import CareerDetails from "./careers/CareerDetails";

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1>PathFinder – Career Assessment Platform</h1>
      </div>

      <Routes>

        {/* AUTH SCREENS (inside card layout) */}
        <Route
          path="/"
          element={
            <div className="card">
              <SignIn />
            </div>
          }
        />

        <Route
          path="/signin"
          element={
            <div className="card">
              <SignIn />
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <div className="card">
              <SignUp />
            </div>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-tests" element={<ManageTests />} />
        <Route path="/admin/recommendations" element={<CareerRecommendations />} />

        {/* USER ROUTES */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/results" element={<MyResults />} />

        {/* ASSESSMENT ROUTES */}
        <Route path="/career-assessment" element={<CareerAssessment />} />
        <Route path="/personality-test" element={<PersonalityTest />} />
        <Route path="/skills-evaluation" element={<SkillsEvaluation />} />
        <Route path="/test-result" element={<TestResult />} />

        {/* CAREER ROUTES */}
        <Route path="/careers" element={<CareerList />} />
        <Route path="/career/:id" element={<CareerDetails />} />

      </Routes>
    </div>
  );
}

export default App;
