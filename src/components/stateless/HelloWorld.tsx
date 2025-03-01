export default function HelloWorld(props: { firstName: string; lastName: string }) {
  return (
    <>
      <h1>Hello World</h1>
      <p>
        Welcome to the application, {props.firstName} {props.lastName}!
      </p>
    </>
  );
}
