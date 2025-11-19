import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI, contactAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [editingBlog, setEditingBlog] = useState(null);

  // Messages state
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
    fetchMessages();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // PROJECT CRUD OPERATIONS
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim())
      };

      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectData);
        setMessage({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await projectsAPI.create(projectData);
        setMessage({ type: 'success', text: 'Project created successfully!' });
      }

      setProjectForm({ title: '', description: '', technologies: '', imageUrl: '', liveUrl: '', githubUrl: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error saving project' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      imageUrl: project.imageUrl || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || ''
    });
    setEditingProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      fetchProjects();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error deleting project' });
    }
  };

  const cancelProjectEdit = () => {
    setProjectForm({ title: '', description: '', technologies: '', imageUrl: '', liveUrl: '', githubUrl: '' });
    setEditingProject(null);
  };

  // BLOG CRUD OPERATIONS
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const blogData = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingBlog) {
        await blogAPI.update(editingBlog._id, blogData);
        setMessage({ type: 'success', text: 'Blog post updated successfully!' });
      } else {
        await blogAPI.create(blogData);
        setMessage({ type: 'success', text: 'Blog post created successfully!' });
      }

      setBlogForm({ title: '', content: '', tags: '' });
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error saving blog post' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      tags: blog.tags?.join(', ') || ''
    });
    setEditingBlog(blog);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await blogAPI.delete(id);
      setMessage({ type: 'success', text: 'Blog post deleted successfully!' });
      fetchBlogs();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error deleting blog post' });
    }
  };

  const cancelBlogEdit = () => {
    setBlogForm({ title: '', content: '', tags: '' });
    setEditingBlog(null);
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.username}!</p>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            📦 Projects ({projects.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            📝 Blog Posts ({blogs.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            📧 Messages ({messages.length})
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="admin-section">
            <div className="admin-form card">
              <h2>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
              <form onSubmit={handleProjectSubmit}>
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Live Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://demo.example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                  </button>
                  {editingProject && (
                    <button type="button" className="btn btn-secondary" onClick={cancelProjectEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list">
              <h2>My Projects</h2>
              {projects.length === 0 ? (
                <p className="empty-message">No projects yet. Create your first one above!</p>
              ) : (
                <div className="admin-grid">
                  {projects.map((project) => (
                    <div key={project._id} className="admin-card card">
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="admin-card-image" />
                      )}
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="tech-tags">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="admin-card-actions">
                        <button onClick={() => handleEditProject(project)} className="btn btn-sm btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteProject(project._id)} className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="admin-section">
            <div className="admin-form card">
              <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <form onSubmit={handleBlogSubmit}>
                <div className="form-group">
                  <label>Post Title *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    rows="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    placeholder="React, JavaScript, Tutorial"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : (editingBlog ? 'Update Post' : 'Create Post')}
                  </button>
                  {editingBlog && (
                    <button type="button" className="btn btn-secondary" onClick={cancelBlogEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list">
              <h2>My Blog Posts</h2>
              {blogs.length === 0 ? (
                <p className="empty-message">No blog posts yet. Create your first one above!</p>
              ) : (
                <div className="admin-list-items">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="admin-list-item card">
                      <div className="admin-list-content">
                        <h3>{blog.title}</h3>
                        <p className="blog-excerpt">{blog.content.substring(0, 150)}...</p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="tech-tags">
                            {blog.tags.map((tag, idx) => (
                              <span key={idx} className="tech-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        <p className="blog-meta">
                          Created: {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="admin-list-actions">
                        <button onClick={() => handleEditBlog(blog)} className="btn btn-sm btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteBlog(blog._id)} className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="admin-section">
            <div className="admin-list">
              <h2>Contact Messages</h2>
              {messages.length === 0 ? (
                <p className="empty-message">No messages yet.</p>
              ) : (
                <div className="admin-list-items">
                  {messages.map((msg) => (
                    <div key={msg._id} className="admin-list-item card">
                      <div className="admin-list-content">
                        <h3>{msg.name}</h3>
                        <p className="message-email">
                          <strong>Email:</strong> {msg.email}
                        </p>
                        {msg.subject && (
                          <p className="message-subject">
                            <strong>Subject:</strong> {msg.subject}
                          </p>
                        )}
                        <p className="message-content">{msg.message}</p>
                        <p className="blog-meta">
                          Received: {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
