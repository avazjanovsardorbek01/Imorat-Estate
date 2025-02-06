import React from "react";
import "./footer.css";

const Index = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span>Real</span>Estate
        </div>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Make Your Home More Modern</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim
            </p>
          </div>
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              <li>Home Rent</li>
              <li>Appartment Sell</li>
              <li>Villa Rent</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>Customer Services</li>
              <li>Email Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Social Media</h3>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <ul className="footer-links">
          <li>Home</li>
          <li>Explore</li>
          <li>Agency</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <p>Copyright Tanah Air Studio</p>
      </div>
    </footer>
  );
};

export default Index;
