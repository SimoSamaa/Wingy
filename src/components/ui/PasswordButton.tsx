import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const PasswordButton: React.FC<{ ele: React.RefObject<HTMLInputElement>; }> = (prop) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => {
      const newShowPassword = !prev;
      if (prop.ele.current) {
        prop.ele.current.type = newShowPassword ? "text" : "password";
      }
      return newShowPassword;
    });
  };

  return (
    <button onClick={toggleShowPassword} type='button' className='absolute right-4 top-[9px]'>
      {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
};

export default PasswordButton;