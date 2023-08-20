import React from "react";
import ReactDOM from "react-dom/client";
import { DropBoxProvider } from "./contexts/DropBoxContext";
import { PostProvider } from "./contexts/PostContext";
import { UserinfoProvider } from "./contexts/UserinfoContext";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserinfoProvider>
      <PostProvider>
        <DropBoxProvider>
          <App />
        </DropBoxProvider>
      </PostProvider>
    </UserinfoProvider>
  </React.StrictMode>,
);
