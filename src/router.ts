import { lazy } from 'react';

const routes = {
  authRoot: {
    name: 'authRoot',
    path: '/',
    Ele: lazy(() => import('@/pages/auth/AuthRoot')),
    Children: {
      login: {
        name: 'login',
        path: '/login',
        Ele: lazy(() => import('@/pages/auth/LoginPage')),
      },
      signup: {
        name: 'signup',
        path: '/signup',
        Ele: lazy(() => import('@/pages/auth/SignupPage')),
      },
    },
  },
  dashboardRoot: {
    name: 'dashboard',
    path: '/dashboard',
    Ele: lazy(() => import('@/pages/dashboard/Dashboard')),
    children: {
      home: {
        name: 'home',
        path: '/dashboard/home',
        Ele: lazy(() => import('@/pages/dashboard/dashboardPages/HomePage')),
      },
      products: {
        name: 'products',
        path: '/dashboard/products',
        Ele: lazy(() => import('@/pages/dashboard/dashboardPages/ProductsPage')),
      }
    }
  },
  notFound: {
    name: 'notFound',
    path: '*',
    Ele: lazy(() => import('@/pages/NotFoundPage')),
  }
};

export default routes;
