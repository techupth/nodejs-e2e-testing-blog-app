import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getPublishedDate from "../utils/getPublishedDate";

function ViewPostPage() {
  const [post, setPost] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    const results = await axios(`http://localhost:4000/posts/${params.postId}`);
    setPost(results.data.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <h1>View Post Page</h1>
      <div className="view-post-container">
        <h1>{post.title}</h1>
        <h2>Status: Published</h2>
        <h2>Published Time: {getPublishedDate(post.published_at)}</h2>
        <p>{post.content}</p>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ViewPostPage;
