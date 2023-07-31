import React from "react";
import ReactDOM from "react-dom/client";
import { UserinfoProvider } from "./contexts/UserinfoContext";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserinfoProvider>
      <App />
    </UserinfoProvider>
  </React.StrictMode>
);
