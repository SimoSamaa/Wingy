import { Card } from '@/components/ui/card';
import TotalOrders from '@/components/dashboard/home/TotalOrders';
import NewOrders from '@/components/dashboard/home/NewOrders';
import TotalRevenue from '@/components/dashboard/home/TotalRevenue';
import RevenueSteam from '@/components/dashboard/home/RevenueSteam';
import Rating from '@/components/dashboard/home/Rating';
import CurrentOrders from '@/components/dashboard/home/CurrentOrders';

const HomePage = () => {
  return (
    <main className="grid grid-cols-[1fr_30%] gap-5 max-lg:block">
      <div>
        <div className='grid gap-5 grid-cols-2 max-xl:grid-cols-1'>
          <div className='grid gap-5 grid-cols-2 max-xl:order-1'>
            <TotalOrders />
            <NewOrders />
            <TotalRevenue />
            <RevenueSteam />
          </div>
          <Rating />
        </div>
        <CurrentOrders />
      </div>
      <Card></Card>
    </main>
  );
};

export default HomePage;