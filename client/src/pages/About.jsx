
import '../styles/About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      {/* Section 1: About Our Model */}
      <section className="about-section">
        <h2 className="section-title">About Our Model</h2>
        <p className="section-description">
          Our intrusion detection model is a state-of-the-art machine learning solution designed to identify and mitigate various types of cyber threats, including DDoS, DoS, Bot, and Port Scan attacks. Built using advanced algorithms like Random Forest, our model ensures high accuracy and real-time detection capabilities. It processes network traffic data, extracts meaningful features, and classifies potential threats to safeguard your systems.
        </p>
      </section>

      {/* Section 2: About NidTech */}
      <section className="about-section">
        <h2 className="section-title">About NidTech</h2>
        <p className="section-description">
          NidTech is a cutting-edge platform developed as part of our Final Year Project (FYP). It integrates our intrusion detection model into a user-friendly web interface, allowing users to upload network traffic data and receive instant threat analysis. NidTech is designed to be scalable, secure, and easy to use, making it an ideal solution for organizations looking to enhance their cybersecurity infrastructure.
        </p>
      </section> 

      {/* Section 3: Our Mission */}
      <section className="about-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-description">
          Our mission is to provide robust and reliable cybersecurity solutions that empower organizations to protect their digital assets. By leveraging the latest advancements in machine learning and web technologies, we aim to make cybersecurity accessible and effective for everyone.
        </p>
      </section>
    </div>
  );
};

export default About;