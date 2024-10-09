import { Outlet, NavLink } from 'react-router-dom';

const DashboardRoot = () => {
  return (
    <>
      <header>
        <nav>
          <ul className='flex gap-1'>
            <li>
              <NavLink to="page-one">One</NavLink>
            </li>
            <li>
              <NavLink to="page-two">Two</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default DashboardRoot;;