import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="logo">🎓 AI-LMS</div>
      </header>

      <section className="hero">
        <h1>
          Transform Your <span>Learning Journey</span>
        </h1>
        <p>
          Experience education reimagined with AI-powered courses,
          personalized learning paths, and real-time insights.
        </p>

        <button className="cta-btn" onClick={() => navigate("/login")}>
          Get Started →
        </button>
      </section>

      <section className="stats">
        <div>
          <h2>10K+</h2>
          <p>Active Learners</p>
        </div>
        <div>
          <h2>500+</h2>
          <p>Courses</p>
        </div>
        <div>
          <h2>95%</h2>
          <p>Completion Rate</p>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">🤖 AI-Powered Learning</div>
        <div className="feature-card">⚡ Lightning Fast</div>
        <div className="feature-card">🌍 Global Community</div>
        <div className="feature-card">🏆 Certificates</div>
      </section>
    </div>
  );
}
