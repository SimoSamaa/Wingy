import { Outlet } from 'react-router-dom';

const AuthRoot = () => {
  return (
    <main className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className='"hidden bg-muted lg:block max-lg:hidden'>
        <img src="" alt="auth-image" />
      </div>
      <Outlet />
    </main>
  );
};

export default AuthRoot;