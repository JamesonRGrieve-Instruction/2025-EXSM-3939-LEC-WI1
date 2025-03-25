import { SampleContext, SampleContextProvider } from '../context/SampleContext';
import { default as CartListComponent, CartListProps } from './CartList';

// Default export with title
export default {
  title: 'Context/CartList',
  component: CartListComponent,
};

// Named export for each story
export const CartList = (args: { contextState: SampleContext; props: CartListProps; containerStyles?: string }) => (
  <SampleContextProvider defaultValue={args.contextState}>
    <div className={args.containerStyles}>
      <CartListComponent />
    </div>
  </SampleContextProvider>
);

// Default values for props
CartList.args = {
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
  containerStyles: 'container',
  props: {},
};
