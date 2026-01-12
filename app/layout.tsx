import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { BackgroundScene } from '@/components/visual/BackgroundScene';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <BackgroundScene />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
