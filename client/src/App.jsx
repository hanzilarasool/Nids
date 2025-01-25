
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import About from './pages/About';
import Privacy from './pages/Privacy';
import NetworkDataForm from './pages/NetworkDataForm';
import UserProfile from './pages/UserProfile';

function App() {
  return (
  <>
  
  <Router> 
      <Navbar />
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/about-us" element={<About />} />
        <Route  path="/privacy" element={<Privacy />} />
        <Route  path="/predict" element={<NetworkDataForm />} />
     <Route path='/userprofile' element={<UserProfile />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  </>
  );
}

export default App;