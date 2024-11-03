import React, { Dispatch, SetStateAction } from 'react';
import { ZodObject, ZodRawShape, ZodEffects } from 'zod';
import debounce from './debounce';

const helpers = () => {

  const useChangeInput = <T = object>(
    setForm: Dispatch<SetStateAction<T>>,
    errorsForm: Record<string, string>,
    setErrorsForm: Dispatch<SetStateAction<Record<string, string>>>,
    cb: () => void = () => { }
  ) => {

    const setFormDebounced = debounce((id: string, value: string) => {
      setForm((prev) => ({
        ...prev,
        [id]: value,
      }));
    }, 300, true);

    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;

      setFormDebounced(id, value);

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

  // APP VALIDATION INPUT
  const useValidation = (
    schema: ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
    data: object,
    setErrors: Dispatch<SetStateAction<Record<string, string>>>
  ) => {
    const validate = (): boolean => {
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

    return validate;
  };

  return { useChangeInput, useValidation };

};

export default helpers;