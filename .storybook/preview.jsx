import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import React, { useEffect } from 'react';
import '../src/app/globals.css';

// Add global theme controls to Storybook
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light' },
        { value: 'dark', icon: 'moon', title: 'Dark' },
        { value: 'colorblind', icon: 'eye', title: 'Colorblind (Light)' },
        { value: 'colorblind dark', icon: 'eye', title: 'Colorblind (Dark)' },
      ],
      showName: true,
    },
  },
};

// Enhanced decorator that properly applies theme to document root
export const decorators = [
  (Story, context) => {
    // Get the theme from Storybook context
    const { theme } = context.globals;

    useEffect(() => {
      // First, remove any existing theme classes
      document.documentElement.classList.remove('dark', 'colorblind');

      // Apply appropriate classes to document root (html element)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'colorblind') {
        document.documentElement.classList.add('colorblind');
      } else if (theme === 'colorblind dark') {
        document.documentElement.classList.add('colorblind');
        document.documentElement.classList.add('dark');
      }

      // Log for debugging
      console.log('THEME: Applied', theme, 'to document root');
      console.log('THEME: Document root classes =', document.documentElement.className);
    }, [theme]);

    return (
      <div style={{ padding: '1rem', minHeight: '100vh' }}>
        <div style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p>
            <strong>Current theme:</strong> {theme}
          </p>
        </div>
        <Story />
      </div>
    );
  },
];

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
