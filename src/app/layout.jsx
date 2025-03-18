import { SampleContextProvider } from '../components/context/SampleContext';
import './globals.css';
export const metadata = {
  title: 'UAlberta FullStack',
  description: 'An application created by a student of the University of Alberta Fullstack Web Application Development program.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <SampleContextProvider>
          <div className='container'>{children}</div>
        </SampleContextProvider>
      </body>
    </html>
  );
}
