import "../style/home.scss";

const Home = () => {
  return (
    <div className="home-container">

      {/* Main Content */}
      <main className="home-main">
        <header className="main-header">
          <h1>Generate Interview Intelligence</h1>
          <p>Transform raw candidate data and job requirements into an actionable assessment report.</p>
        </header>

        <div className="content-grid">
          {/* Left Column */}
          <section className="left-column">
            <div className="section-title">
              <span className="material-symbols-outlined">work</span>
              <h2>Job Description</h2>
            </div>
            <div className="textarea-container">
              <textarea placeholder="Paste the full role requirements here..."></textarea>
            </div>
          </section>

          {/* Right Column */}
          <div className="right-column">
            {/* Context & Notes */}
            <section className="context-notes">
              <div className="section-title">
                <span className="material-symbols-outlined">person_search</span>
                <h2>Context & Notes</h2>
              </div>
              <div className="textarea-container">
                <textarea placeholder="Add specific focus areas or internal notes (optional)..."></textarea>
              </div>
            </section>

            {/* Action Block */}
            <section className="action-block">
              <label className="upload-btn">
                <input type="file" accept=".pdf" className="hidden-input" />
                <div className="upload-info">
                  <div className="icon-box">
                    <span className="material-symbols-outlined">upload_file</span>
                  </div>
                  <div>
                    <p className="upload-title">Resume PDF</p>
                    <p className="upload-desc">Upload candidate's CV (Max 10MB)</p>
                  </div>
                </div>
                <span className="upload-action">Choose File</span>
              </label>

              <button className="generate-btn">
                <span className="material-symbols-outlined bolt-icon">bolt</span>
                Generate Report
              </button>

              <div className="footer-tips">
                <div className="tip-row">
                  <span className="material-symbols-outlined">verified_user</span>
                  <span>GDPR Compliant • Enterprise Grade Security</span>
                </div>
                <div className="tip-tags">
                  <div className="tip-tag">
                    <span className="material-symbols-outlined">lightbulb</span>
                    <span>Use keywords for technical analysis</span>
                  </div>
                  <div className="tip-tag">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    <span>AI-Verified Accuracy</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="main-footer">
          <p>© 2024 Editorial Intelligence</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;