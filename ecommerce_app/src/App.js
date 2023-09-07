import {Routes,Route} from "react-router-dom"
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/register";
import Login from "./pages/login";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/user/dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="" element={<Dashboard/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
