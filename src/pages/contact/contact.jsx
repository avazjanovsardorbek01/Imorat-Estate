import React from "react";
import "./contact.css"; // Импортируйте CSS файл

const Contact = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>
            We're here to help you find your dream home. Get in touch with our
            expert team today.
          </p>
        </div>
      </section>

      <div className="contact-container">
        <div className="info-cards">
          <div className="info-card">
            <i className="fas fa-phone"></i>
            <h3>Call Us</h3>
            <p>+1 (234) 567-8900</p>
            <p>Mon-Fri 9am-6pm</p>
          </div>
          <div className="info-card">
            <i className="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p>info@realestate.com</p>
            <p>24/7 Online Support</p>
          </div>
          <div className="info-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Visit Us</h3>
            <p>123 Real Estate Ave</p>
            <p>New York, NY 10001</p>
          </div>
          <div className="info-card">
            <i className="fas fa-clock"></i>
            <h3>Working Hours</h3>
            <p>Monday - Friday</p>
            <p>9:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
