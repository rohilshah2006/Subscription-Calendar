import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// --- START MOCK ---
// This tricks the component into using localStorage
// and defines the types globally.

declare global {
  interface Window {
    storage: {
      get: (key: string) => Promise<{ value: string | null }>;
      set: (key: string, value: string) => Promise<void>;
    };
  }
}

// Create the mock storage object
window.storage = {
  get: (key: string) => {
    const value = localStorage.getItem(key);
    if (value === null) {
      return Promise.reject(new Error("Key not found"));
    }
    return Promise.resolve({
      value: value,
    });
  },
  set: (key: string, value: string) => {
    localStorage.setItem(key, value);
    console.log("Mock storage SET:", key, "=", value);
    return Promise.resolve();
  },
};
// --- END MOCK ---

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// This 'export' makes TypeScript treat this file as a module,
// which is required for 'declare global' to work.
export {};
