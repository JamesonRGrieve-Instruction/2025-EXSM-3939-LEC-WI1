import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ChangeEventHandler, useState } from 'react';
import Input, { InputProps } from './Input';

// Extended interface for input stories
interface InputStoryArgs {
  initialValue?: string;
  validationRule?: 'none' | 'minLength' | 'email' | 'numeric';
  containerStyles?: string;
  minLength?: number;
}

const meta: Meta<InputProps & InputStoryArgs> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    validate: {
      table: { disable: true },
    },
    initialValue: {
      control: 'text',
      description: 'Initial value of the input',
      table: {
        category: 'Content',
      },
    },
    validationRule: {
      control: 'select',
      options: ['none', 'minLength', 'email', 'numeric'],
      description: 'Type of validation to apply',
      table: {
        category: 'Validation',
      },
    },
    minLength: {
      control: 'number',
      description: 'Minimum length for minLength validation',
      table: {
        category: 'Validation',
      },
    },
    containerStyles: {
      control: 'text',
      description: 'Custom container styling',
      table: {
        category: 'Styling',
      },
    },
  },
};

export default meta;

// InputWrapper component to handle state
const InputWrapper = ({ initialValue = '', validationRule = 'none', containerStyles = '', minLength = 5 }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const getValidator = (rule: string) => {
    switch (rule) {
      case 'minLength':
        return (value: string) => value.length >= minLength;
      case 'email':
        return (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'numeric':
        return (value: string) => /^\d+$/.test(value);
      case 'none':
      default:
        return () => true;
    }
  };

  return (
    <div className={containerStyles}>
      <Input value={value} onChange={handleChange} validate={getValidator(validationRule)} />
    </div>
  );
};

type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {
  args: {
    initialValue: '',
    validationRule: 'none',
    containerStyles: '',
  },
  render: (args) => <InputWrapper {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Test input');
    expect(input).toHaveValue('Test input');
  },
};

export const WithMinLengthValidation: Story = {
  args: {
    initialValue: '',
    validationRule: 'minLength',
    minLength: 5,
  },
  render: (args) => <InputWrapper {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // Should show error with short input
    await userEvent.type(input, 'test');
    expect(canvas.getByText('Invalid input provided!')).toBeInTheDocument();

    // Should not show error with longer input
    await userEvent.clear(input);
    await userEvent.type(input, 'valid input');
    expect(canvas.queryByText('Invalid input provided!')).not.toBeInTheDocument();
  },
};

export const WithEmailValidation: Story = {
  args: {
    initialValue: '',
    validationRule: 'email',
  },
  render: (args) => <InputWrapper {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // Should show error with invalid email
    await userEvent.type(input, 'invalid-email');
    expect(canvas.getByText('Invalid input provided!')).toBeInTheDocument();

    // Should not show error with valid email
    await userEvent.clear(input);
    await userEvent.type(input, 'valid@example.com');
    expect(canvas.queryByText('Invalid input provided!')).not.toBeInTheDocument();
  },
};

export const WithNumericValidation: Story = {
  args: {
    initialValue: '',
    validationRule: 'numeric',
  },
  render: (args) => <InputWrapper {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // Should show error with non-numeric input
    await userEvent.type(input, 'abc');
    expect(canvas.getByText('Invalid input provided!')).toBeInTheDocument();

    // Should not show error with numeric input
    await userEvent.clear(input);
    await userEvent.type(input, '12345');
    expect(canvas.queryByText('Invalid input provided!')).not.toBeInTheDocument();
  },
};

export const PrefilledInput: Story = {
  args: {
    initialValue: 'Prefilled value',
    validationRule: 'none',
  },
  render: (args) => <InputWrapper {...args} />,
};
