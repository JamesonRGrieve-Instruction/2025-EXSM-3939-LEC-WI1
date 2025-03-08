import './globals.css';

export const metadata = {
  title: "James' App",
  description: 'An application created by a student of the University of Alberta Fullstack Web Application Development program.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
