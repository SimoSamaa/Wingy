import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { useEffect } from 'react';

import AuthRoot from '@/pages/auth/AuthRoot';
import Login from '@/pages/auth/LoginPage';
import Signup from '@/pages/auth/SignupPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import NotFoundPage from '@/pages/NotFoundPage';
import PageOne from '@/pages/dashboard/dashboardPages/PageOne';
import PageTwo from '@/pages/dashboard/dashboardPages/PageTwo';

const App = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);

  // Set page title based on the current route
  useEffect(() => {
    const pagesPath = ['/login', '/signup', '/dashboard/page-one', '/dashboard/page-two'];
    const pageTitle = ['Login', 'Signup', 'Page One', 'Page Two'];
    const pageIndex = pagesPath.indexOf(location.pathname);

    if (pageIndex !== -1) {
      document.title = `Wingy | ${pageTitle[pageIndex]}`;
    } else {
      document.title = 'Wingy | 404';
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard/page-one" />} />

        {/* AUTH PAGES */}
        <Route path="/" element={<AuthRoot />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

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
