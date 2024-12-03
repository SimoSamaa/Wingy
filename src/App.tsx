import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import router from '@/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);

  // Set page title based on the current route
  useEffect(() => {
    const pagesPath = [
      router.authRoot.Children.login.path,
      router.authRoot.Children.signup.path,
      router.dashboardRoot.children.home.path,
      router.dashboardRoot.children.products.path,
      router.dashboardRoot.children.orders.path
    ];
    const pageTitle = ['Login', 'Signup', 'Home', 'Products', 'Orders'];
    const pageIndex = pagesPath.indexOf(location.pathname);

    if (pageIndex !== -1) {
      document.title = `Wingy | ${pageTitle[pageIndex]}`;
    } else {
      document.title = 'Wingy | 404';
    }
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={<div className='h-screen grid place-content-center'>
        <div className="animate-spin rounded-full size-[150px] border-t-4 border-b-4 border-primary"></div>
      </div>} >
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route
            path="/"
            element={
              !isAuthenticated
                ? <Navigate to={router.authRoot.Children.login.path} replace />
                : <Navigate to={router.dashboardRoot.children.home.path} replace />} />

          {/* AUTH PAGES */}
          <Route
            path={router.authRoot.path}
            element={<router.authRoot.Ele />}>
            <Route
              path={router.authRoot.Children.login.path}
              element={<router.authRoot.Children.login.Ele />} />
            <Route
              path={router.authRoot.Children.signup.path}
              element={<router.authRoot.Children.signup.Ele />} />
          </Route>

          {/* DASHBOARD PAGES */}
          <Route
            path={router.dashboardRoot.path}
            element={<router.dashboardRoot.Ele />}>
            <Route
              path={router.dashboardRoot.children.home.path}
              element={<router.dashboardRoot.children.home.Ele />} />
            <Route
              path={router.dashboardRoot.children.products.path}
              element={<router.dashboardRoot.children.products.Ele />} />
            <Route
              path={router.dashboardRoot.children.orders.path}
              element={<router.dashboardRoot.children.orders.Ele />} />
          </Route>

          {/* 404 PAGE */}
          <Route path={router.notFound.path} element={<router.notFound.Ele />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
