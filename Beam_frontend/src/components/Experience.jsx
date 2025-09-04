import React from "react";

function Experience() {
  const experiences = [
    {
      year: "1986-1990",
      job: "Education-Addis Ababa University",
      description: "Bachelor of Law-LLB"
    },
    {
      year: "1991-1994",
      job: "Junior Attorney",
      description: "In house attorney at Development Bank of Ethiopia"
    },
    {
      year: "1994-2006",
      job: "Judge",
      description: "Judge at Addis Ababa's city court and Federal court"
    },
    {
      year: "2006 -now",
      job: "Attorney",
      description: "Consultation and Representation "
    }
  ];

  return (
    <div id = "portfolio" className="experience-page">
      <h2>Professional Experience</h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-box">
            <div className="experience-year">{exp.year}</div>
            <div className="experience-details">
              <h3>{exp.job}</h3>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Experience;