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
      description: "Bachelor of Science in Software Engineering"
    },
    {
      year: "January 2024-present",
      job: "alx trainee in pro-backend development",
      description: "Learning and practicing pro-backend development"
    },
    {
      year: "february 2024-present",
      job: "internship at Halwote-Hareg font Studio",
      description: "Working as a part-time graphic designer"
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