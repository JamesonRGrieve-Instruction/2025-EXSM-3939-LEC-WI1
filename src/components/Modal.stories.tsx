import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Button from './Button';
import Modal, { ModalProps } from './Modal';

// Extended args interface for stories
interface ModalStoryArgs {
  handleActionOption?: 'action' | 'console';
  containerStyles?: string;
  contentType?: 'text' | 'form' | 'image';
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
}

const meta: Meta<ModalProps & ModalStoryArgs> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    onConfirm: {
      table: { disable: true },
    },
    onCancel: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    handleActionOption: {
      control: 'radio',
      options: ['action', 'console'],
      description: 'Select the type of action handler',
      table: {
        category: 'Modal Behavior',
      },
    },
    contentType: {
      control: 'select',
      options: ['text', 'form', 'image'],
      description: 'Type of content to display in the modal',
      table: {
        category: 'Content',
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
type Story = StoryObj<ModalProps & ModalStoryArgs>;

// Helper to generate content based on contentType
const getContent = (contentType: string) => {
  switch (contentType) {
    case 'form':
      return (
        <div>
          <h3>Enter Your Information</h3>
          <form>
            <div className='mb-4'>
              <label htmlFor='name' className='block mb-2'>
                Name:
              </label>
              <input id='name' type='text' className='border p-2 w-full' />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block mb-2'>
                Email:
              </label>
              <input id='email' type='email' className='border p-2 w-full' />
            </div>
          </form>
        </div>
      );
    case 'image':
      return (
        <div>
          <h3 className='mb-4'>Preview Image</h3>
          <img src='/api/placeholder/400/300' alt='Placeholder' style={{ maxWidth: '100%' }} />
          <p className='mt-4'>Sample image caption</p>
        </div>
      );
    case 'text':
    default:
      return <p>This is the modal content.</p>;
  }
};

export const Default: Story = {
  args: {
    handleActionOption: 'action',
    contentType: 'text',
    containerStyles: '',
  },
  render: (args) => {
    let onConfirm, onCancel;

    if (args.handleActionOption === 'console') {
      onConfirm = () => console.log('Modal confirmed via console!');
      onCancel = () => console.log('Modal cancelled via console!');
    } else {
      onConfirm = action('Modal confirmed via action!');
      onCancel = action('Modal cancelled via action!');
    }

    const { handleActionOption, contentType, containerStyles, ...componentProps } = args;
    const content = getContent(contentType);

    return (
      <div className={containerStyles || ''}>
        <Modal {...componentProps} onConfirm={onConfirm} onCancel={onCancel}>
          {content}
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if modal content exists
    expect(canvas.getByText('This is the modal content.')).toBeInTheDocument();

    // Check for buttons
    const cancelButton = canvas.getByText('X');
    const confirmButton = canvas.getByText('Confirm');

    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    // Test button clicks
    await userEvent.click(cancelButton);
    await userEvent.click(confirmButton);
  },
};

export const WithForm: Story = {
  args: {
    ...Default.args,
    contentType: 'form',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for form elements
    expect(canvas.getByText('Enter Your Information')).toBeInTheDocument();
    expect(canvas.getByLabelText('Name:')).toBeInTheDocument();
    expect(canvas.getByLabelText('Email:')).toBeInTheDocument();

    // Test input interaction
    const nameInput = canvas.getByLabelText('Name:');
    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    contentType: 'image',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for image elements
    expect(canvas.getByText('Preview Image')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toHaveAttribute('alt', 'Placeholder');
    expect(canvas.getByText('Sample image caption')).toBeInTheDocument();
  },
};

export const ConsoleLogging: Story = {
  args: {
    ...Default.args,
    handleActionOption: 'console',
  },
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    containerStyles: 'p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto',
  },
};

export const EditableButtons: Story = {
  args: {
    handleActionOption: 'action',
    contentType: 'text',
    containerStyles: '',
    cancelButtonLabel: 'X',
    confirmButtonLabel: 'Confirm',
  },
  render: (args) => {
    let onConfirm, onCancel;

    if (args.handleActionOption === 'console') {
      onConfirm = () => console.log('Modal confirmed via console!');
      onCancel = () => console.log('Modal cancelled via console!');
    } else {
      onConfirm = action('Modal confirmed via action!');
      onCancel = action('Modal cancelled via action!');
    }

    const { handleActionOption, contentType, containerStyles, ...componentProps } = args;
    const content = getContent(contentType);

    return (
      <div className={containerStyles || ''}>
        <div className='relative'>
          <div className='absolute top-0 right-0'>
            <Button onClick={onCancel} label={args.cancelButtonLabel ?? 'X'} disabled={false} />
          </div>
          {content}
          <Button onClick={onConfirm} label={args.confirmButtonLabel ?? 'Confirm'} disabled={false} />
        </div>
      </div>
    );
  },
};
