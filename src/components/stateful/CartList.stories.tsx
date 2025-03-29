import Home from '@/src/app/page';
import { action } from '@storybook/addon-actions';
import { Meta, StoryContext, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { MouseEventHandler } from 'react';
import { SampleContext, SampleContextProvider } from '../context/SampleContext';
import CartListComponent, { CartListProps } from './CartList';

// Extended args interface that includes contextState for stories
interface CartListStoryArgs {
  contextState?: SampleContext;
  containerStyles: string;
}

const meta: Meta<CartListProps> = {
  title: 'Context/CartList',
  component: CartListComponent,
  decorators: [
    (Story, context: StoryContext) => {
      // Extract the context state from args
      const contextState = context.args.contextState || [];

      return (
        <SampleContextProvider defaultValue={contextState as SampleContext}>
          <Story />
        </SampleContextProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<CartListStoryArgs & CartListProps>;

// Default story
export const Default: Story = {
  args: {
    buttonText: 'Click Me!',
    handleButton: action('Button Click!') as MouseEventHandler,
    containerStyles: 'container',
    contextState: [
      {
        itemID: 'PEN101',
        quantity: 5,
      },
      {
        itemID: 'PENCIL101',
        quantity: 3,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const items = canvas.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('PEN101: 5');
    expect(items[1]).toHaveTextContent('PENCIL101: 3');
  },
};

export const AddItemInteraction: Story = {
  render: () => (
    <div>
      <Home />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state should be empty
    const initialItems = canvas.queryAllByRole('listitem');
    expect(initialItems.length).toBe(0);

    // Find and click the "Add Pen" button
    const addPenButton = canvas.getByText('Add Pen to Cart');
    await userEvent.click(addPenButton);

    // Check if one item is added
    let items = canvas.getAllByRole('listitem');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('PEN101: 1');

    // Click the same button again to increment quantity
    await userEvent.click(addPenButton);

    // Check if quantity is incremented
    items = canvas.getAllByRole('listitem');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('PEN101: 2');

    // Add a different item
    const addPencilButton = canvas.getByText('Add Pencil to Cart');
    await userEvent.click(addPencilButton);

    // Check if new item is added
    items = canvas.getAllByRole('listitem');
    expect(items.length).toBe(2);
    // We need to find the items specifically since the order might not be guaranteed
    const penItem = items.find((item) => item.textContent?.includes('PEN101'));
    const pencilItem = items.find((item) => item.textContent?.includes('PENCIL101'));

    expect(penItem?.textContent).toContain('PEN101: 2');
    expect(pencilItem?.textContent).toContain('PENCIL101: 1');
  },
};
