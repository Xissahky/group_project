import "./FeaturePage.css";

const FeaturePage = () => {
  return (
    <div className="feature-container">

        <h1 className="feature-title">Our benefits</h1>
        <p className="feature-subtitle">
          Study Buddy is your digital campus – a space where students connect, collaborate, and grow together. Here, you’ll find the tools to take your academic and social life to the next level.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Find Like-Minded Students</h3>
            <p className="feature-text">
              Discover peers who share your passions, academic goals, and career aspirations. Whether you're looking for study partners, group project collaborators, or friends with common interests, Study Buddy makes it easy to connect with the right people. Create a profile highlighting your academic background, interests, and future goals to start meeting students who can help you succeed.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3 className="feature-title">Collaborate & Communicate</h3>
            <p className="feature-text">
              With powerful messaging and group collaboration features, Study Buddy ensures you stay connected with your peers at all times. Whether you're working on a group project, preparing for exams, or simply sharing academic resources, you can chat, share documents, and brainstorm ideas easily with classmates.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3 className="feature-title">Build Your Academic Profile</h3>
            <p className="feature-text">
              Track your academic journey and showcase your growth over time. Study Buddy allows you to create a comprehensive profile highlighting your skills, accomplishments, and areas of expertise. Use it to keep track of your grades, achievements, and future goals – all in one place.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">A Growing Community</h3>
            <p className="feature-text">
              Join a vibrant network of students from various fields of study. Whether you're looking to get advice from upperclassmen, participate in extracurricular activities, or find internship opportunities, Study Buddy is your gateway to a dynamic, ever-growing community of like-minded individuals.
            </p>
          </div>

      </div>
    </div>
  );
};

export default FeaturePage;
