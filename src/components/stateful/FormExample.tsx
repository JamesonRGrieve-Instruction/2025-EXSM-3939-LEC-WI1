'use client';

import { ReactNode, RefObject, useEffect, useState } from 'react';
import useSampleContext from '../context/SampleContext';

type FormField = {
  value: string;
  validation: (value: string) => boolean;
};
export default function FormExample({ scrollTo }: { scrollTo: RefObject<ReactNode> }) {
  const [formState, setFormState] = useState<{
    // firstName: FormField;
    // lastName: FormField;
    age: FormField;
  }>({
    // firstName: {
    //   value: '',
    //   validation: (value: string) => value.length > 0,
    // },
    // lastName: {
    //   value: '',
    //   validation: (value: string) => value.length > 0,
    // },
    age: {
      value: '0',
      validation: (value: string) => Number(value) > 0,
    },
  });

  useEffect(() => {
    console.log('Form State Changed: ', formState);
  }, [formState]);

  //   const [firstName, setFirstName] = useState<string>('');
  //   const [lastName, setLastName] = useState<string>('');
  //   const [age, setAge] = useState<number>(0);
  const sampleContext = useSampleContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('Submit!');

        scrollTo.current?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <input
        type='text'
        value={sampleContext.state.firstName}
        onChange={(e) =>
          sampleContext.mutate((oldState) => ({
            ...oldState,
            firstName: e.target.value,
          }))
        }
      />
      {/* {!formState.firstName.validation(formState.firstName.value) && <p>First Name is required.</p>} */}
      <input
        type='text'
        value={sampleContext.state.lastName}
        onChange={(e) =>
          sampleContext.mutate((oldState) => ({
            ...oldState,
            lastName: e.target.value,
          }))
        }
      />
      {/* {!formState.lastName.validation(formState.lastName.value) && <p>Last Name is required.</p>} */}
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
      <button type='submit'>Submit</button>
    </form>
  );
}
