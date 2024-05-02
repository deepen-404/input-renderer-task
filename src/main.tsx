import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NewInputRenderer from "./components/NewInputRenderer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NewInputRenderer />
  </React.StrictMode>
);
