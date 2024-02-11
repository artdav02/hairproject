import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'; // Import your Landing page component
import Service from "./pages/service/Service";
import Success from "./pages/success/Success";
import Fail from "./pages/fail/Fail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/bronn" element={<Service />} />
                <Route path="/success" element={<Success />} />
                <Route path="/fail" element={<Fail />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
