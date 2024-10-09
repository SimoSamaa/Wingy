import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <h1>Login Page</h1>
      <Link to="/dashboard/page-one">dashboard</Link>
    </>
  );
};

export default LoginPage;