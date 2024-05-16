import ButtonGradient from "./assets/svg/ButtonGradient";
import Landing from "./components/Landing";
import Hiring from './components/Hiring';
import Pricing from "./components/Pricing";

import { Route, Routes } from 'react-router-dom'
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
// import Chat from "./components/ChatBot";
import Chat from './components/Chat'
import AuthGuard from "./Auth/AuthGuard.jsx";
import { useEffect } from "react";
import API from "./apiConfig.js";
import '@radix-ui/themes/styles.css';
// import './index.css';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/exampleEndpoint');
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);
  return (
    <>
      <div className="overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* <Route path="/chat" element={<AuthGuard><Chat /></AuthGuard>} /> */}
          <Route path='/chat'  element={<Chat />}/>
        </Routes>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
