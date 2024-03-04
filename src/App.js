import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'; // Import your Landing page component
import Service from "./pages/service/Service";
import Success from "./pages/success/Success";
import Fail from "./pages/fail/Fail";
import Master from './pages/master/Master';
import About from "./pages/about/About";
import Test from "./pages/test/Test";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/bronn" element={<Service />} />
                <Route path="/success" element={<Success />} />
                <Route path="/fail" element={<Fail />} />
                <Route path="/master" element={<Master />} />
                <Route path="/about" element={<About />} />
                <Route path="/test" element={<Test />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
