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
            <li><a href="#articles">Scribbles</a></li>
            
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: beamlakfekadu562@gmail.com</p>
          <p>Phone: +251-979-027-679</p>
          <p>Address: Addis Ababa University<br/>Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Beamlak Fekadu Hailemariam. All Rights Reserved.</p>
        <p>Website created by Beamlak Fekadu Hailemariam</p>
      </div>
    </footer>
  );
}

export default Footer;
