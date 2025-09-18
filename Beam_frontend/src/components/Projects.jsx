function Services() {
  return (
    <main id="services" className="services-section">
      <h1 className="services-h1">Our Services</h1>
      <div className="services-container">
        <div className="service-box">
          <img src="/litigation.png" alt="Litigation Law" />
          <h2> Litigation and Dispute Resolution</h2>
          <p>Represent clients in civil and commercial disputes, offering strategic solutions and courtroom advocacy.</p>
        </div>
        <div className="service-box">
          <img src="/family.png" alt="Family Law" />
          <h2>Family Law</h2>
          <p>Guide individuals through divorce, child custody, inheritance, and related family matters with sensitivity and legal precision.</p>
        </div>
        <div className="service-box">
          <img src="/labour.png" alt="Employment and Labour Law" />
          <h2>Employment and Labour Law</h2>
          <p>Provide guidance on employee rights, contracts, and workplace compliance, ensuring fair treatment and legal protection.</p>
        </div>
        <div className="service-box">
          <img src="/corporate.png" alt="Corporate and Commercial Law" />
          <h2>Corporate and Business Law</h2>
          <p>Support business formation, contracts, compliance, and corporate governance for sustainable growth.</p>
      </div>
        <div className="service-box">
          <img src="/tax.png" alt="Taxation and Financial Law" />
          <h2>Taxation and Financial Law</h2>
          <p>Assist clients with tax planning, compliance, and financial regulations to optimize legal and fiscal outcomes</p>
        </div>
      </div>
    </main>
  );
}

export default Services;