import { useEffect, useState } from 'react';

export default {
  title: 'Theme/Diagnostic',
  parameters: {
    componentSubtitle: 'Debugging tool for theme variables',
  },
};

export const ThemeDiagnostic = () => {
  const [themeVars, setThemeVars] = useState({});

  useEffect(() => {
    // Get computed styles to check theme variables
    const getThemeVars = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const themeVariables = {
        // CSS Variables - get both the variable name and computed value
        '--background': computedStyle.getPropertyValue('--background'),
        '--foreground': computedStyle.getPropertyValue('--foreground'),
        '--primary': computedStyle.getPropertyValue('--primary'),
        '--card': computedStyle.getPropertyValue('--card'),

        // Check actual applied Tailwind classes
        'bg-background': window.getComputedStyle(document.querySelector('.bg-test-background')).backgroundColor,
        'text-foreground': window.getComputedStyle(document.querySelector('.text-test-foreground')).color,
        'bg-primary': window.getComputedStyle(document.querySelector('.bg-test-primary')).backgroundColor,
      };

      setThemeVars(themeVariables);
    };

    // Run after a short delay to ensure DOM is ready
    setTimeout(getThemeVars, 100);

    // Add a mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          getThemeVars();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const getColorBlock = (colorValue) => {
    const style = {
      width: '24px',
      height: '24px',
      display: 'inline-block',
      marginRight: '8px',
      border: '1px solid gray',
    };

    if (colorValue && colorValue.trim() !== '') {
      style.backgroundColor = colorValue;
    }

    return <div style={style}></div>;
  };

  return (
    <div className='p-6 space-y-8'>
      <div>
        <h1 className='text-2xl font-bold mb-4 text-foreground'>Theme Diagnostic</h1>
        <p className='text-foreground mb-2'>This component helps debug theme variables and application.</p>
        <p className='text-foreground mb-4'>Try switching themes in the Storybook toolbar to see if variables change.</p>
      </div>

      {/* Hidden test elements for computed style checking */}
      <div className='bg-background bg-test-background hidden'></div>
      <div className='text-foreground text-test-foreground hidden'></div>
      <div className='bg-primary bg-test-primary hidden'></div>

      {/* Theme showcase */}
      <div className='grid grid-cols-1 gap-4'>
        <div className='p-4 bg-background border rounded-md'>
          <h2 className='text-foreground font-semibold mb-2'>Background with Foreground Text</h2>
          <p className='text-foreground'>This demonstrates the default background and text colors</p>
        </div>

        <div className='p-4 bg-card text-card-foreground border rounded-md'>
          <h2 className='font-semibold mb-2'>Card Component</h2>
          <p>This demonstrates the card background and text colors</p>
        </div>

        <div className='p-4 space-y-2 border rounded-md'>
          <h2 className='text-foreground font-semibold'>UI Elements</h2>
          <div className='flex flex-wrap gap-2'>
            <button className='px-4 py-2 bg-primary text-primary-foreground rounded-md'>Primary Button</button>
            <button className='px-4 py-2 bg-destructive text-destructive-foreground rounded-md'>Destructive Button</button>
            <button className='px-4 py-2 bg-muted text-muted-foreground rounded-md'>Muted Button</button>
          </div>
        </div>
      </div>

      {/* CSS Variable Inspector */}
      <div className='p-4 border rounded-md'>
        <h2 className='text-foreground font-semibold mb-4'>CSS Variable Inspector</h2>
        <div className='space-y-2'>
          {Object.entries(themeVars).map(([name, value]) => (
            <div key={name} className='flex items-center'>
              <div className='w-1/3 font-mono text-sm'>{name}:</div>
              <div className='flex items-center'>
                {getColorBlock(value)}
                <div className='font-mono text-sm'>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HTML Classes Display */}
      <div className='p-4 border rounded-md'>
        <h2 className='text-foreground font-semibold mb-2'>Root HTML Element Classes</h2>
        <div className='font-mono text-sm break-all'>{document.documentElement.className}</div>
      </div>
    </div>
  );
};
