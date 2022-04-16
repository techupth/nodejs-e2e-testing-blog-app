import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

function CreatePostPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Create Post Page</h1>
      <CreatePostForm />
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

export default CreatePostPage;
