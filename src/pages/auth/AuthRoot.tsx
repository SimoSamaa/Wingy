import { Outlet } from 'react-router-dom';
import wingyLogo from '../../assets/logo.png';

const AuthRoot = () => {
  return (
    <main className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className='grid place-items-center place-content-center bg-muted lg:block max-lg:hidden'>
        <div className='bg-white p-5 rounded-full size-[450px] grid place-items-center shadow-lg'>
          <img src={wingyLogo} alt="wingy-logo" className='size-[250px]' />
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default AuthRoot;