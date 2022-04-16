import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePosts from "../hooks/usePosts";

function EditPostForm() {
  const params = useParams();

  const { post, getPostById, updatePostById } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getPostById(params.postId);
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostById(params.postId, {
      title,
      content,
      status,
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Edit Post Form</h1>
      <div className="input-container">
        <label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Content
          <textarea
            id="content"
            name="content"
            type="text"
            placeholder="Enter content here"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Status
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
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
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditPostForm;
