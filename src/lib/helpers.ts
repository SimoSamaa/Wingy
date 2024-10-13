import React, { Dispatch, SetStateAction } from 'react';

const helpers = () => {

  const useHandleChange = <T = object>(
    setForm: Dispatch<SetStateAction<T>>,
    errorsForm: Record<string, string>,
    setErrorsForm: Dispatch<SetStateAction<Record<string, string>>>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };
  };

  return [useHandleChange];

};

export default helpers;