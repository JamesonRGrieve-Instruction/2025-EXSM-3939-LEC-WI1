export default function HelloWorld({ firstName, lastName }: { firstName: string; lastName: string }) {
  return (
    <>
      <h1>Hello World</h1>
      <p>
        Welcome to the application, {firstName} {lastName}!
      </p>
    </>
  );
}
