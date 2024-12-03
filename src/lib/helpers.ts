import React, { Dispatch, SetStateAction } from 'react';
import { ZodObject, ZodRawShape, ZodEffects } from 'zod';

const helpers = () => {
  const useInputChange = <T extends Record<string, any>>(
    key: string,
    setForm: React.Dispatch<React.SetStateAction<T>>,
    setErrorsForm: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    errorsForm: Record<string, string>,
    cb: () => void = () => { }
  ) => {
    return (value: string) => {
      // Update the form state
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));

      // Clear the error message if the user corrects the input
      if (errorsForm[key]) {
        setErrorsForm((prev) => ({
          ...prev,
          [key]: "",
        }));
      }

      if (typeof cb === 'function') cb();
    };
  };

  // APP VALIDATION INPUT
  const useValidation = (
    schema: ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
    data: object,
    setErrors: Dispatch<SetStateAction<Record<string, string>>>
  ) => {
    return (): boolean => {
      setErrors({});
      const validation = schema.safeParse(data);

      if (!validation.success) {
        const errMess: { [key: string]: string; } = {};
        validation.error.errors.forEach((err) => {
          errMess[err.path[0]] = err.message;
        });
        setErrors(errMess);
        return false;
      } else {
        return true;
      }
    };
  };

  const useOrderStatusClass = (status: string, style: string) => {
    switch (style) {
      case 'text': return status === 'Prepared'
        ? 'text-green-500' : status === 'Preparing'
          ? 'text-orange-500' : status === 'Pending'
            ? 'text-yellow-500' : 'text-blue-500';

      case 'bg': return status === 'Prepared'
        ? 'bg-green-500' : status === 'Preparing'
          ? 'bg-orange-500' : status === 'Pending'
            ? 'bg-yellow-500' : 'bg-blue-500';

      default: return '';
    };
  };

  return { useInputChange, useValidation, useOrderStatusClass };
};

export default helpers;