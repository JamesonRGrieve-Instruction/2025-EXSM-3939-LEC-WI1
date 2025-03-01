'use client';

import { useEffect, useState } from 'react';

export type HelloWorldProps = {
  firstName?: string;
  lastName: string;
};

export default function HelloWorld(props: HelloWorldProps | any) {
  const [updatedFirstName, setUpdatedFirstName] = useState<string>(props.firstName);
  useEffect(() => {
    setUpdatedFirstName(props.firstName);
  }, [props.firstName]);
  return (
    <>
      <h1>Hello World</h1>
      <input id='firstName' type='text' value={updatedFirstName} onChange={(e) => setUpdatedFirstName(e.target.value)} />
      <p>
        Welcome to the application, {updatedFirstName || 'Mr. or Mrs.'} {props.lastName}!
      </p>
      <ul>
        {Object.keys(props)
          .filter((key) => !['firstName', 'lastName'].includes(key))
          .map((key) => (
            <li key={key}>
              {key}: {props[key]}
            </li>
          ))}
      </ul>
      {!props.firstName && <p>Please pass your first name in to the component to be greeted thereby.</p>}
    </>
  );
}
