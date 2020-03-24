import React from "react";
//VIEWS
import Home from "./pages/home/home.jsx";
//BASIC STYLE
import "./App.css";

function App() {
  return (
    <div className="site">
      <header className="site-header"></header>
      <main className="site-content">
        <Home />
      </main>
      <footer className="site-footer"></footer>
    </div>
  );
}

export default App;
