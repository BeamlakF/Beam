import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://beam.onrender.com/articles/")
      .then((res) => setArticles(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles.");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div id ="articles" className="articles-page">
      <h2 className="articles-h2">Latest Articles</h2>
      {articles.length === 0 ? (
        <p>No articles available</p>
      ) : (
        articles.slice(0, 5).map((article) => (
          <div key={article.id} className="article-box">
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
            )}
            <h3>{article.title}</h3>
            <p>
              {article.content
                ? article.content.length > 150
                  ? article.content.slice(0, 150) + "..."
                  : article.content
                : "No content available"}
            </p>
            {/* See More link */}
            <Link to={`/articles/${article.id}`} className="see-more-button">
              See More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Articles;
