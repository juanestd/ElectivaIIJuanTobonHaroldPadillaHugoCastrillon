import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignupPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='flex max-w-6xl mx-auto'>
      {!isAuthPage && <Sidebar />}
      <Routes>
        
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />

        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/:username' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
      {!isAuthPage && <RightPanel />}
    </div>
  );
}
export default App;
