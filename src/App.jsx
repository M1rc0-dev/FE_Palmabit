import Footer from "components/views/Footer/Footer";
import LandingPage from "./components/views/Landing/Landing";
import Services from "./components/views/Services/Services";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
