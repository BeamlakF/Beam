import React from "react";


function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: fekadu164@gmail.com</p>
          <p>Phone: +251-911-769-346</p>
          <p>Address: Nur building, Lideta<br/>Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Fekadu Law Office. All Rights Reserved.</p>
        <p>Website created by Beamlak Fekadu Hailemariam</p>
      </div>
    </footer>
  );
}

export default Footer;
