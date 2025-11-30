import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Navbar from "./nav";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Entry from "./pages/entry";
import Entries from "./pages/entries";

function App() {
    return (
        <Router>
        <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/entry" element={<Entry />} />
                <Route path="/entries" element={<Entries />} />
            </Routes>
        </Router>
    );
}

export default App;