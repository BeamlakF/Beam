import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fekadu.onrender.com/articles/${id}/`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load article.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="detail-image"
        />
      )}
      <h2>{article.title}</h2>
      <p className="detail-content">{article.content}</p>

      <Link to="/articles" className="back-button">
        ← Back to Articles
      </Link>
    </div>
  );
}

export default ArticleDetail;
