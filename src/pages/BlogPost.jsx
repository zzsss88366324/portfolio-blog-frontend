import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogAPI, commentsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getOne(id);
      setPost(response.data);
      setComments(response.data.comments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    try {
      setSubmitting(true);
      const response = await commentsAPI.create(id, { body: commentBody });
      setComments([response.data, ...comments]);
      setCommentBody('');
    } catch (err) {
      alert('Failed to post comment: ' + err.message);
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading">Loading post...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error">Error: {error || 'Post not found'}</div>
          <Link to="/blog" className="btn btn-secondary mt-lg">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <Link to="/blog" className="back-link">
          ← Back to Blog
        </Link>

        <article className="blog-post">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="post-author">
                By {post.author?.username || 'Unknown'}
              </span>
              <span className="post-separator">•</span>
              <span className="post-date">{formatDate(post.createdAt)}</span>
            </div>
          </header>

          <div className="post-content">
            <p>{post.content}</p>
          </div>
        </article>

        <section className="comments-section">
          <h2 className="comments-title">
            Comments ({comments.length})
          </h2>

          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="comment-form card">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Write a comment..."
                rows="4"
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="auth-prompt card">
              <p>Please <Link to="/login">log in</Link> to leave a comment.</p>
            </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment card">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.author?.username || 'Unknown'}
                    </span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
