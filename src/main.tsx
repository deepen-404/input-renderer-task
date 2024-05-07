import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import InputRenderer from "./components/InputRenderer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InputRenderer />
  </React.StrictMode>
);
