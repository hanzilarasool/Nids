
import '../styles/Privacy.css'; // Import the CSS file for styling

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>

      {/* Section 1: Introduction */}
      <section className="privacy-section">
        <h2 className="section-title">Introduction</h2>
        <p className="section-description">
          At NidTech, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
        </p>
      </section>

      {/* Section 2: Data Collection */}
      <section className="privacy-section">
        <h2 className="section-title">Data Collection</h2>
        <p className="section-description">
          We collect information that you provide directly to us, such as your name, email address, and network traffic data. Additionally, we may automatically collect certain information when you use our platform, including IP addresses, device information, and usage patterns.
        </p>
      </section>

      {/* Section 3: Data Usage */}
      <section className="privacy-section">
        <h2 className="section-title">Data Usage</h2>
        <p className="section-description">
          The data we collect is used to improve our platform, provide personalized services, and enhance your user experience. We may also use your information to communicate with you about updates, security alerts, and other relevant information.
        </p>
      </section>

      {/* Section 4: Data Security */}
      <section className="privacy-section">
        <h2 className="section-title">Data Security</h2>
        <p className="section-description">
          We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      {/* Section 5: Contact Us */}
      <section className="privacy-section">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-description">
          If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:privacy@nidtech.com" className="contact-link">privacy@nidtech.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Privacy;