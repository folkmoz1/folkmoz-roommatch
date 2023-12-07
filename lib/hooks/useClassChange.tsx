import { Dispatch, useEffect } from 'react';

type UseClassChangeProps = {
  dirtyFields: any;
  errors: any;
  formState: any;
};

export const useClassChange = ({
  dirtyFields,
  errors,
  formState,
}: UseClassChangeProps) => {
  useEffect(() => {
    if (dirtyFields) {
      Object.keys(dirtyFields).map((name) => {
        const inputElm = document.getElementById(name) as HTMLInputElement;
        const isErr = Boolean(errors[name]);

        if (isErr) {
          inputElm.classList.add('border-red-500');
        } else {
          inputElm.classList.remove('border-red-500');
        }
      });
    }
  }, [formState]);
};
