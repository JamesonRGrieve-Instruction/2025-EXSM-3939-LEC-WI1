import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { MouseEventHandler } from 'react';
import Button, { ButtonProps } from './Button';

// Extended args interface for stories
interface ButtonStoryArgs {
  handleButtonOption?: 'action' | 'console';
  containerStyles?: string;
}

const meta: Meta<ButtonProps & ButtonStoryArgs> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: {
      control: 'select',
      options: ['Click Me!', 'Submit', 'Cancel', 'Continue', 'Save'],
      table: {
        category: 'Text Options',
      },
    },
    handleButtonOption: {
      control: 'radio',
      options: ['action', 'console'],
      description: 'Select the type of button handler',
      table: {
        category: 'Button Behavior',
      },
    },
    onClick: {
      table: { disable: true },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    containerStyles: {
      control: 'text',
      table: {
        category: 'Styling',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps & ButtonStoryArgs>;

// Default story
export const Default: Story = {
  args: {
    label: 'Click Me!',
    handleButtonOption: 'action',
    disabled: false,
    containerStyles: '',
  },
  render: (args) => {
    let onClick;

    if (args.handleButtonOption === 'console') {
      onClick = (() => {
        console.log('Button clicked via console!');
      }) as MouseEventHandler;
    } else {
      onClick = action('Button clicked via action!') as MouseEventHandler;
    }

    const { handleButtonOption, containerStyles, ...componentProps } = args;

    return (
      <div className={containerStyles || ''}>
        <Button {...componentProps} onClick={onClick} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    expect(button).toHaveTextContent('Click Me!');
    await userEvent.click(button);
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    expect(button).toBeDisabled();
  },
};

export const DifferentLabels: Story = {
  args: {
    ...Default.args,
    label: 'Submit',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    expect(button).toHaveTextContent('Submit');
  },
};

export const ConsoleLogger: Story = {
  args: {
    ...Default.args,
    handleButtonOption: 'console',
  },
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    label: 'Styled Button',
    containerStyles: 'p-4 bg-gray-100 rounded',
  },
};
