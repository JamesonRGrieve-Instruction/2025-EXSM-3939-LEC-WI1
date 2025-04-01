// Default export with title
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

// Named export for each story
export const Sample = (args: ArgsType) => (
  <div className='w-full h-12 bg-slate-300'>
    <Progress value={args.value} />
  </div>
);

// Default values for props
Sample.args = {
  value: 40,
} as ArgsType;
