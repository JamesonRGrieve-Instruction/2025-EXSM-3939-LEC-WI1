import { Meta, StoryObj } from '@storybook/react';
import CartListComponent, { GreeterProps } from './Greeter';

// Extended args interface that includes contextState for stories

const meta: Meta<GreeterProps> = {
  title: 'Greeter/Greeter',
  component: CartListComponent,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  argTypes: {
    profession: {
      control: 'select',
      options: ['Teacher', 'Doctor', 'Lawyer'],
    },
  },
};

export default meta;
type Story = StoryObj<GreeterProps>;

// Default story
export const Default: Story = {
  args: {
    name: 'John Doe',
    profession: 'Teacher',
    age: '50',
  },
  // Use render to dynamically set the handleButton based on the selected option
  render: (args) => {
    return <CartListComponent {...args} />;
  },
};
