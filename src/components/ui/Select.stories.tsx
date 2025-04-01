// Default export with title
// import { Select, SelectContent, SelectItem, SelectTrigger } from '@radix-ui/react-select';
// import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Select';
import { Box, Container, Select, Theme } from '@radix-ui/themes';
export default {
  title: 'ShadCN/Radix/Select',
  component: Select,
  argTypes: {
    value: { control: 'number' },
  },
};

type ArgsType = {
  value: number;
  theme: string;
};

// Named export for each story
export const Sample = (args: ArgsType) => (
  <Theme accentColor='blue' grayColor='slate' radius='large' scaling='90%'>
    <Container className={args.theme}>
      <Box className='light w-full h-12 bg-background'>
        <Select.Root defaultValue='Test1'>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value={'Test1'}>Test Item 1</Select.Item>
              <Select.Item value={'Test2'}>Test Item 2</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
    </Container>
  </Theme>
);

// Default values for props
Sample.args = {
  value: 40,
  theme: 'dark',
} as ArgsType;
