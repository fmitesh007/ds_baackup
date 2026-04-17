import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import CustomCursor from '@/components/CustomCursor';
import FlowBgWithTheme from '@/components/FlowBgWithTheme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Datascon | Cutting-Edge Digital Solutions & Tech Lab',
  description: 'Datascon empowers innovative ideas with cutting-edge digital solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FlowBgWithTheme />
          {/* <div className="fixed inset-0 mesh-grid pointer-events-none z-0" /> */}
          <CustomCursor />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}