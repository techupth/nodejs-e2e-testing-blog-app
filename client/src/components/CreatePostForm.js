import { useState } from "react";
import usePosts from "../hooks/usePosts";

function CreatePostForm() {
  const { createPost } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      title,
      content,
      status,
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Post Form</h1>
      <div className="input-container">
        <label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={(event) => {
              setTitle(event.target.value);
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
            onChange={(event) => {
              setContent(event.target.value);
            }}
            value={content}
            rows={4}
            cols={30}
          />
        </label>
      </div>
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
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreatePostForm;
