import { Outlet } from 'react-router-dom';
import NavigationBar from '@/components/dashboard/NavigationBar';

const DashboardRoot = () => {
  return (
    <>
      <NavigationBar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardRoot;;