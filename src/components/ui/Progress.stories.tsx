// import { Progress } from '@radix-ui/react-progress';
import { Progress } from '@/components/ui/Progress';
export default {
  title: 'ShadCN/Radix/Progress',
  component: Progress,
  argTypes: {
    value: { control: 'number' },
  },
};

type ArgsType = {
  value: number;
};

// Replace hardcoded background color with theme-aware class
export const Sample = (args: ArgsType) => (
  <div className='w-full h-12 bg-background'>
    <Progress value={args.value} />
  </div>
);

// Default values for props
Sample.args = {
  value: 40,
} as ArgsType;
