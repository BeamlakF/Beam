import React from "react";

function Experience() {
  const experiences = [
    {
      year: "2000-2014",
      job: "Education-Cruise Steps School",
      description: "High School diploma"
    },
    {
      year: "2014-present",
      job: "Education-Addis Ababa University",
      description: "In house attorney at Development Bank of Ethiopia"
    },
    
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