import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import CreatePostPage from "./CreatePostPage";
import ViewPostPage from "./ViewPostPage";
import EditPostPage from "./EditPostPage";
import NotFoundPage from "./NotFoundPage";
import "../App.css";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/create" element={<CreatePostPage />} />
        <Route path="/post/view/:postId" element={<ViewPostPage />} />
        <Route path="/post/edit/:postId" element={<EditPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
