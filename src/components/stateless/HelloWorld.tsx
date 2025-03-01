export type HelloWorldProps = {
  firstName?: string;
  lastName: string;
};

export default function HelloWorld(props: HelloWorldProps | any) {
  Object.keys(props);
  return (
    <>
      <h1>Hello World</h1>
      <p>
        Welcome to the application, {props.firstName || 'Mr. or Mrs.'} {props.lastName}!
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
