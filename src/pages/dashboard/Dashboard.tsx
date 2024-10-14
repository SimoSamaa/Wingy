import { Outlet } from 'react-router-dom';
import NavigationBar from '@/components/dashboard/NavigationBar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const DashboardRoot = () => {
  return (
    <main className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14 min-h-screen bg-muted/40'>
      <DashboardHeader />
      <NavigationBar />
      <section className='p-4 sm:px-6 sm:py-0'>
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardRoot;;