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
import AdminRoute from "./components/routes/AdminRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProducts from "./pages/Admin/CreateProducts";
import User from "./pages/Admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>}/>
      <Route path="user/orders" element={<Orders/>}/>
      <Route path="user/profile" element={<Profile/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProducts/>}/>
      <Route path="admin/users" element={<User/>}/>
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
