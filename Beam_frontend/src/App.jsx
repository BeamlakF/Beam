import React from "react";
import { Routes, Route } from "react-router-dom";
import BeamProfile from "./Onefile";



function App() {
  return (
    <>
     
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BeamProfile />
              
            </>
          }
        />
        
      </Routes>
     
     
      
    </>
  );
}

export default App;
