// import { Select, SelectContent, SelectItem, SelectTrigger } from '@radix-ui/react-select';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Select';
export default {
  title: 'ShadCN/Radix/Select',
  component: Select,
  argTypes: {
    value: { control: 'number' },
  },
};

type ArgsType = {
  value: number;
  // Remove theme from args type
};

export const Sample = (args: ArgsType) => (
  <main>
    {/* Remove the 'light' class so it doesn't override the theme */}
    <div className='w-full h-12 bg-background'>
      <Select>
        <SelectTrigger className='w-48'>Select an Option</SelectTrigger>
        <SelectContent>
          <SelectItem value={'Test'}>Test Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </main>
);

// Default values for props - remove theme
Sample.args = {
  value: 40,
} as ArgsType;
