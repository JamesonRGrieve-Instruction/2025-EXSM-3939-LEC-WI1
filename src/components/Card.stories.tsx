import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Card, { CardProps } from './Card';

// Extended args interface for stories
interface CardStoryArgs {
  containerStyles?: string;
}

const meta: Meta<CardProps & CardStoryArgs> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title text',
      table: {
        category: 'Content',
      },
    },
    description: {
      control: 'text',
      description: 'Card description text',
      table: {
        category: 'Content',
      },
    },
    imageSrc: {
      control: 'text',
      description: 'Image source URL',
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
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<CardProps & CardStoryArgs>;

export const Default: Story = {
  args: {
    title: 'Example Card',
    description: 'This is an example card with a sample image.',
    imageSrc: 'https://placehold.co/300x200',
    containerStyles: '',
  },
  render: (args) => {
    const { containerStyles, ...componentProps } = args;

    return (
      <div className={containerStyles || ''}>
        <Card {...componentProps} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('heading')).toHaveTextContent('Example Card');
    expect(canvas.getByText('This is an example card with a sample image.')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toHaveAttribute('alt', 'Example Card');
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'This is a Card with a Very Long Title That Might Wrap to Multiple Lines Depending on Container Width',
  },
};

export const LongDescription: Story = {
  args: {
    ...Default.args,
    title: 'Card with Long Description',
    description:
      'This is a card with a much longer description. It contains multiple sentences to demonstrate how the card handles longer text content. The description might wrap to multiple lines depending on the container width. Cards should be able to handle variable content lengths gracefully.',
  },
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    containerStyles: 'p-4 border border-gray-300 rounded shadow-md max-w-md',
  },
};
