import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll();
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getExcerpt = (content, length = 150) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="loading">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="container">
        <div className="page-header">
          <h1>Blog</h1>
          <p className="page-subtitle">
            Thoughts, stories, and ideas on technology and development
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No blog posts yet</h3>
            <p>Check back soon for new content!</p>
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post._id}`}
                className="blog-card card"
              >
                <div className="blog-card-content">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">
                    {getExcerpt(post.content)}
                  </p>
                  <div className="blog-card-meta">
                    <span className="blog-card-author">
                      {post.author?.username || 'Unknown'}
                    </span>
                    <span className="blog-card-separator">•</span>
                    <span className="blog-card-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="blog-card-arrow">→</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
