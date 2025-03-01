import HelloWorldComponent, { HelloWorldProps } from './HelloWorld';

// Default export with title
export default {
  title: 'Stateful/HelloWorld',
  component: HelloWorldComponent,
};

// Named export for each story
export const HelloWorld = (args: { props: HelloWorldProps; containerStyles?: string }) => (
  <div className={args.containerStyles}>
    <HelloWorldComponent {...args.props} />
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
