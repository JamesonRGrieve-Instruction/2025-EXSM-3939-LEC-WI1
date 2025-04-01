export default {
  title: 'Theme/BasicTest',
  parameters: {
    componentSubtitle: 'Simple test to verify theme switching',
  },
};

// The simplest possible theme test component
export const BasicThemeTest = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Test direct CSS variable access */}
      <div
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-foreground)',
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <h3>Direct CSS Variables Test</h3>
        <p>This uses direct CSS variables. Background should be theme background, text should be theme text.</p>
      </div>

      {/* Test Tailwind classes */}
      <div className='bg-background text-foreground p-4 border border-solid border-gray-300 rounded'>
        <h3>Tailwind Classes Test</h3>
        <p>This uses Tailwind classes. Background should be theme background, text should be theme text.</p>
      </div>

      {/* Color blocks to visualize theme colors */}
      <div className='p-4 border border-solid border-gray-300 rounded'>
        <h3 className='text-foreground'>Theme Color Samples</h3>
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-background border border-solid border-gray-300 mr-2'></div>
            <span>bg-background</span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-primary border border-solid border-gray-300 mr-2'></div>
            <span>bg-primary</span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-card border border-solid border-gray-300 mr-2'></div>
            <span>bg-card</span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-muted border border-solid border-gray-300 mr-2'></div>
            <span>bg-muted</span>
          </div>
        </div>
      </div>

      {/* Raw CSS inspection */}
      <div className='p-4 border border-solid border-gray-300 rounded'>
        <h3 className='text-foreground'>CSS Debug Info</h3>
        <pre className='mt-2 p-2 bg-gray-100 text-xs overflow-auto'>
          {`Theme variables should change when you switch themes in the toolbar.
          
Check the console for detailed logs on what's happening.`}
        </pre>
      </div>
    </div>
  );
};
