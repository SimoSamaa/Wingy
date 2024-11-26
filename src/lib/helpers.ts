import React, { Dispatch, SetStateAction } from 'react';
import { ZodObject, ZodRawShape, ZodEffects } from 'zod';

const helpers = () => {

  const useChangeInput = <T = object>(
    setForm: Dispatch<SetStateAction<T>>,
    errorsForm: Record<string, string>,
    setErrorsForm: Dispatch<SetStateAction<Record<string, string>>>,
    cb: () => void = () => { }
  ) => {

    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;

      setForm((prev) => ({
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

      if (typeof cb === 'function') cb();
    };
  };

  const useInputChange = <T extends Record<string, any>>(
    key: string,
    setForm: React.Dispatch<React.SetStateAction<T>>,
    setErrorsForm: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    errorsForm: Record<string, string>
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

  return { useChangeInput, useInputChange, useValidation };

};

export default helpers;