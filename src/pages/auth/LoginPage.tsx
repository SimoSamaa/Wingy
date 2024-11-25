import React, { useRef, useState } from 'react';
import { AtSign, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui//label';
import { Input } from '@/components/ui/input';
import router from '@/router';
import helpers from '@/lib/helpers';

const LoginPage = () => {
  const navigate = useNavigate();
  const { useInputChange, useValidation } = helpers();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errorsForm, setErrorsForm] = useState<Record<string, string>>({});
  // const [isLoading, setLoading] = useState(false);

  console.log('login render');

  const loginSchema = z.object({
    email: z.string()
      .email({ message: 'Invalid email address' })
      .nonempty({ message: 'Email is required' }),
    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .nonempty({ message: 'Password is required' })
  });

  const validate = useValidation(loginSchema, loginForm, setErrorsForm);
  const submitLoginFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationSuccess = validate();
    if (!validationSuccess) return;

    try {
      console.log('Login form submitted', loginForm);
      // => send your data to state management
      setLoginForm({ email: '', password: '' });
      navigate(router.dashboardRoot.children.home.path);
    } catch (err) {
      console.error('Error from server', err);
    } finally {
      // 
    }
  };

  return (
    <form onSubmit={submitLoginFormHandler} className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="m@example.com"
              value={loginForm.email}
              error={errorsForm.email}
              onChange={useInputChange(
                'email',
                setLoginForm,
                setErrorsForm,
                errorsForm
              )}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>
              <Link
                to="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="********"
              value={loginForm.password}
              error={errorsForm.password}
              onChange={useInputChange(
                'password',
                setLoginForm,
                setErrorsForm,
                errorsForm
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or login with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button">
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline" type="button">
            <AtSign className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={router.authRoot.Children.signup.path} className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;