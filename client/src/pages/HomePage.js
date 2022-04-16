import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

import usePosts from "../hooks/usePosts";
import getPublishedDate from "../utils/getPublishedDate";

function HomePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [keywords, setKeywords] = useState("");
  const { posts, totalPages, getPosts, deletePost, isError, isLoading } =
    usePosts();

  const { logout } = useAuth();

  useEffect(() => {
    getPosts({ status, keywords, page });
  }, [status, keywords, page]);

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Blog Post App</h1>
        <button
          onClick={() => {
            navigate("/post/create");
          }}
        >
          Create Post
        </button>
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
      <div className="search-box-container">
        <div className="search-box">
          <label>
            Search post
            <input
              type="text"
              placeholder="Search by title"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="status-filter">
          <label>
            View Status
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option disabled value="">
                -- Select a status --
              </option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </label>
        </div>
      </div>
      <div className="board">
        {!posts.length && (
          <div className="no-blog-posts-container">
            <h1>No Blog Posts</h1>
          </div>
        )}
        {posts.map((post) => {
          return (
            <div key={post._id} className="post">
              <h1>{post.title}</h1>
              <h2>Status: {post.status}</h2>
              <h2>Published Time: {getPublishedDate(post.published_at)}</h2>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={() => navigate(`/post/view/${post._id}`)}
                >
                  View post
                </button>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/post/edit/${post._id}`)}
                >
                  Edit post
                </button>
              </div>

              <button
                className="delete-button"
                onClick={() => deletePost(post._id)}
              >
                x
              </button>
            </div>
          );
        })}
        {isError ? <h1>Request failed</h1> : null}
        {isLoading ? <h1>Loading ....</h1> : null}
      </div>

      <div className="pagination">
        {page > 1 ? (
          <button className="previous-button" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        ) : null}

        {page !== totalPages ? (
          <button className="next-button" onClick={() => setPage(page + 1)}>
            Next
          </button>
        ) : null}
      </div>
      <div className="pages">
        {page} / {totalPages}
      </div>
    </div>
  );
}

export default HomePage;
