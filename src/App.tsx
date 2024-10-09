import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

import Login from '@/pages/auth/LoginPage';
import Signup from '@/pages/auth/signupPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import NotFoundPage from '@/pages/NotFoundPage';
import PageOne from '@/pages/dashboard/dashboardPages/PageOne';
import PageTwo from '@/pages/dashboard/dashboardPages/PageTwo';

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard/page-one" />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* DASHBOARD PAGES */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='page-one' element={<PageOne />} />
          <Route path='page-two' element={<PageTwo />} />
        </Route>

        {/* 404 PAGE */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
