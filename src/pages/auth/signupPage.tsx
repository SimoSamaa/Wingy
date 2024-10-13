import React, { useRef, useState } from 'react';
import { AtSign, Facebook, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui//label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PasswordButton from '@/components/ui/PasswordButton';
import router from '@/router';
import helpers from '@/lib/helpers';

interface SignupFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const [useHandleChange] = helpers();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [signupForm, setSignupForm] = useState<SignupFormState>({ email: '', password: '', confirmPassword: '' });
  const [errorsForm, setErrorsForm] = useState<Record<string, string>>({});
  const [submitForm, setSubmitForm] = useState(false);
  // const [isLoading, setLoading] = useState(false);

  const signupSchema = z.object({
    email: z.string()
      .email({ message: 'Invalid email address' })
      .nonempty({ message: 'Email is required' }),
    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .nonempty({ message: 'Password is required' }).trim(),
    confirmPassword: z.string().min(1, { message: 'Confirm password required' }).trim(),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

  const loginFormValidation = () => {
    setSubmitForm(true);
    setErrorsForm({});

    const validation = signupSchema.safeParse(signupForm);

    if (!validation.success) {
      const errMess: { [key: string]: string; } = {};
      validation.error.errors.forEach((err) => {
        errMess[err.path[0]] = err.message;
      });

      setErrorsForm(errMess);
      setSubmitForm(false);

      return false;
    }

    return true;
  };

  const submitLoginFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validationSuccess = loginFormValidation();
    if (!validationSuccess) return;

    try {
      console.log('Signup form submitted', signupForm);
      // => send your data to state management
      setSignupForm(() => ({ email: '', password: '', confirmPassword: '' }));
      setTimeout(() => {
        navigate(router.authRoot.Children.login.path);
      }, 3000);
    } catch (err) {
      console.error('Error from server', err);
    } finally {
      // RESET LOADING
    }
  };

  return (
    <form onSubmit={submitLoginFormHandler} className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Create an account to get started
          </p>
        </div>
        {submitForm && (
          <Alert className="bg-green-100 border-green-500">
            <CheckCircle className="h-4 w-4 !text-green-600" />
            <AlertTitle className="text-green-800">Sign Up Successful!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your account has been created successfully. Welcome to Wingy!
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="m@example.com"
              value={signupForm.email}
              onChange={useHandleChange<SignupFormState>(setSignupForm, errorsForm, setErrorsForm)}
              error={!!errorsForm.email}
            />
            {errorsForm.email && <p className='text-xs text-red-500'>{errorsForm.email}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className='relative'>
              <Input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder='********'
                value={signupForm.password}
                onChange={useHandleChange<SignupFormState>(setSignupForm, errorsForm, setErrorsForm)}
                error={!!errorsForm.password}
              />
              <PasswordButton ele={passwordRef} />
            </div>
            {errorsForm.password && <p className='text-xs text-red-500'>{errorsForm.password}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
            </div>
            <div className='relative'>
              <Input id="confirmPassword"
                type="password"
                ref={confirmPasswordRef}
                placeholder='********'
                value={signupForm.confirmPassword}
                onChange={useHandleChange<SignupFormState>(setSignupForm, errorsForm, setErrorsForm)}
                error={!!errorsForm.confirmPassword}
              />
              <PasswordButton ele={confirmPasswordRef} />
            </div>
            {errorsForm.confirmPassword && <p className='text-xs text-red-500'>{errorsForm.confirmPassword}</p>}
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
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
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={router.authRoot.Children.login.path} className="underline">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;