import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui//label';
import { Input } from '@/components/ui/input';
import PasswordButton from '@/components/ui/PasswordButton';

const SignupPage = () => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [signupForm, setSignupForm] = useState({ email: '', password: '', confirmPassword: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear the error message when the user corrects the input
    if (errorsForm[id]) {
      setErrorsForm((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

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
      setSignupForm({ email: '', password: '', confirmPassword: '' });
      navigate('/login');
    } catch (err) {
      console.error('Error from server', err);
    } finally {
      setSubmitForm(false);
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
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="m@example.com"
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                error={!!errorsForm.confirmPassword}
              />
              <PasswordButton ele={confirmPasswordRef} />
            </div>
            {errorsForm.confirmPassword && <p className='text-xs text-red-500'>{errorsForm.confirmPassword}</p>}
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to='/login' className="underline">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;