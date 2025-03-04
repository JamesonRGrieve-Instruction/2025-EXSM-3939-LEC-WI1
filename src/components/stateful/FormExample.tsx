'use client';

import { useEffect, useState } from 'react';

type FormField = {
  value: string | number;
  validation: (value: string | number) => boolean;
};
export default function FormExample() {
  const [formState, setFormState] = useState<{
    firstName: FormField;
    lastName: FormField;
    age: FormField;
  }>({
    firstName: {
      value: '',
      validation: (value: string) => value.length > 0,
    },
    lastName: {
      value: '',
      validation: (value: string) => value.length > 0,
    },
    age: {
      value: 0,
      validation: (value: number) => value > 0,
    },
  });

  useEffect(() => {
    console.log('Form State Changed: ', formState);
  }, [formState]);

  //   const [firstName, setFirstName] = useState<string>('');
  //   const [lastName, setLastName] = useState<string>('');
  //   const [age, setAge] = useState<number>(0);

  return (
    <form>
      <input
        type='text'
        value={formState.firstName.value}
        onChange={(e) =>
          setFormState((oldFormState) => ({
            ...oldFormState,
            firstName: {
              value: e.target.value,
              validation: oldFormState.firstName.validation,
            },
          }))
        }
      />
      {!formState.firstName.validation(formState.firstName.value) && <p>First Name is required.</p>}
      <input
        type='text'
        value={formState.lastName.value}
        onChange={(e) =>
          setFormState((oldFormState) => ({
            ...oldFormState,
            lastName: {
              value: e.target.value,
              validation: oldFormState.lastName.validation,
            },
          }))
        }
      />
      {!formState.lastName.validation(formState.lastName.value) && <p>Last Name is required.</p>}
      <input
        type='number'
        value={formState.age.value}
        onChange={(e) =>
          setFormState((oldFormState) => ({
            ...oldFormState,
            age: {
              value: e.target.value,
              validation: oldFormState.age.validation,
            },
          }))
        }
      />
      {!formState.age.validation(formState.age.value) && <p>Age must be greater than zero.</p>}
    </form>
  );
}
