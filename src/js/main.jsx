import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./components/Home.jsx"; 

const root = createRoot(document.querySelector("#app"));
root.render(<Home />);
