import React from "react";
import "./App.css";
import ThreeDScene from "./3d";

function App() {
  return (
    <div className="App">
      <div id="three-container">
        <ThreeDScene />
      </div>

      <header className="App-header">
        <img className="ares-logo" src="/ares-logo.png" alt="Ares Logo" />
      </header>

      <main>
        <div className="horizontal-container">
          <div className="vertical-container">
            {/* ✅ Test Button */}
            <button
              className="action-button button-start"
              onClick={() => alert("✅ Button click works!")}
            >
              Test Click
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
