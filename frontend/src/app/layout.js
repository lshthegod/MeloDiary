import './globals.css';

export const metadata = {
  title: 'MeloDiary',
  description: 'MeloDiary',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
