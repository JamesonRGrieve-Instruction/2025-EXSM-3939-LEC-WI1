import { default as CartList, default as HelloWorldComponent, HelloWorldProps } from './CartList';

// Default export with title
export default {
  title: 'Stateful/HelloWorld',
  component: HelloWorldComponent,
};

// Named export for each story
export const HelloWorld = (args: { props: HelloWorldProps; containerStyles?: string }) => (
  <div className={args.containerStyles}>
    <CartList {...args.props} />
  </div>
);

// Default values for props
HelloWorld.args = {
  containerStyles: 'container',
  props: {
    firstName: 'Joe',
    lastName: 'Smith',
  },
};
