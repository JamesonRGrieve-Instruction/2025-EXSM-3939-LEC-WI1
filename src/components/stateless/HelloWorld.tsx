export type HelloWorldProps = {
  firstName?: string;
  lastName: string;
};

export default function HelloWorld({ firstName, lastName }: HelloWorldProps) {
  return (
    <>
      <h1>Hello World</h1>
      <p>
        Welcome to the application, {firstName || 'Mr. or Mrs.'} {lastName}!
      </p>
      {!firstName && <p>Please pass your first name in to the component to be greeted thereby.</p>}
    </>
  );
}
